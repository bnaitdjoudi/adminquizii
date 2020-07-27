import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import CommunService from "./../../services/CommunService";
import StepQF1 from './StepQF1';
import StepQF2 from './StepQF2';
import { Paper } from '@material-ui/core';
import { connect } from "react-redux";
import { URL_QUESTION_ADD_B } from "./../../config/Urls";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from "react-router-dom";
import loc from "./../../locale/I18n";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            minHeight: "60px"
        },
        button: {
            marginRight: theme.spacing(1),
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
        backdrop:{
            zIndex:1550
        }
    }),
);



function QuestionsForm(props: any) {
    
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());
    

    
    const [multip, setMultip] = React.useState<boolean>(false);

    
    const [waitOpen,setWaitOpen] = React.useState<boolean>(false);
    let history = useHistory();


    const steps = [loc("main.questdescription"), loc("main.respdescription")];


    const onMultipRChange = (value: boolean) => {
        setMultip(value);
        console.log("log:" + value);
    }


    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <StepQF1
                    
                />;
            case 1:
                return <StepQF2
                    onMultipRChange={onMultipRChange}
                    
                    multi={multip}
                />;
            case 2:
                return 'This is the bit I really care about!';
            default:
                return 'Unknown step';
        }
    }

   

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = (event: any) => {
        event.preventDefault();
        let newSkipped = skipped;

        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        if (activeStep !== 1) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
        }
        else {
            processFinalSubmit();
        }
        console.log(activeStep);

    };

    const processFinalSubmit = () => {

        setWaitOpen(true);
        const service: CommunService = new CommunService(URL_QUESTION_ADD_B);
        let question = {
            id:props.match.params.qid,
            test: props.match.params.id,
            resps: props.resps,
            reponsesText: props.reponsesText,
            multi: props.multi,
            title: props.title,
            description: props.description,
            time: props.time,
            score: props.score,
            level: props.level,
            lang: props.lang,
            tags: props.tags
        }
        


        service.processPostOne(question).then((resp: any) => {

            history.push("/tests/"+props.match.params.id);
            
        }).catch((error:any) =>{
        console.error(error);
        }).finally(()=>{
            setWaitOpen(false);
        });



    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };



    return (

        <form className={classes.root} id="formquestion" onSubmit={handleNext}>

            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: { optional?: React.ReactNode } = {};

                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                {(

                    <div>
                        <Paper style={{ padding: "8px 5px", }}>
                            <div >
                                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                    {loc("main.back")}
              </Button>


                                {activeStep === steps.length - 1 ? <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    form="formquestion"
                                    className={classes.button}
                                > {loc("validate")}</Button> : <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    form="formquestion"
                                    className={classes.button}
                                >{loc("main.next")}</Button>}

                            </div>

                        </Paper>

                        <div style={{ padding: "5px 0px", }}>{getStepContent(activeStep)}</div>
                    </div>

                )}
            </div>
            <Backdrop open={waitOpen} className={classes.backdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </form>
    );
}

const mapStateToProps = (state: any) => ({
    mode:state.root.mode,
    resps: state.root.resps,
    reponsesText: state.root.reponsesText,
    multi: state.root.multi,
    title: state.root.titleQuestion,
    description: state.root.descriptionQuestion,
    time: state.root.time,
    score: state.root.score,
    level: state.root.level,
    lang: state.root.lang,
    tags: state.root.tags
});



export default connect(mapStateToProps, null)(QuestionsForm)
