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

function getSteps() {
    return ['Déscription de la question', 'Definition des réponses'];
}


function QuestionsForm(props: any) {
    
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());
    const [title, setTitle] = React.useState<string>();

    const [description, setDescription] = React.useState<string>();
    const [level, setLevel] = React.useState<string>();
    const [lang, setLang] = React.useState<string>();
    const [categories, setCategories] = React.useState<any[]>();
    const [score, setScore] = React.useState<number>();
    const [time, setTime] = React.useState<number>();
    const [multip, setMultip] = React.useState<boolean>(false);

    const [reponseA, setResponseA] = React.useState<String>();
    const [reponseB, setResponseB] = React.useState<String>();
    const [reponseC, setResponseC] = React.useState<String>();
    const [reponseD, setResponseD] = React.useState<String>();
    const [reponseE, setResponseE] = React.useState<String>();
    const [reponseF, setResponseF] = React.useState<String>();
    const [waitOpen,setWaitOpen] = React.useState<boolean>(false);
    let history = useHistory();


    const steps = [loc("main.questdescription"), loc("main.respdescription")];

    const onTitleChange = (value: string) => {
        setTitle(value);
        //console.log("coucou:"+value);
    }

    const onDescriptionChange = (value: string) => {
        setDescription(value);
        //console.log("coucou:"+value);
    }

    const onLevelChange = (value: string) => {
        setLevel(value);
        //console.log("coucou"+value);
    }

    const onLongChange = (value: string) => {
        setLang(value);

    }

    const onCategoriesChange = (value: any[]) => {
        setCategories(value);

    }

    const onScoreChange = (value: number) => {
        setScore(value);

    }

    const onTimeChange = (value: number) => {
        setTime(value);


    }


    const onMultipRChange = (value: boolean) => {
        setMultip(value);
        console.log("log:" + value);
    }

    const onResponseChange = (value: string, response: "A" | "B" | "C" | "D" | "E" | "F") => {
        switch (response) {
            case "A": {
                setResponseA(value);
                console.log("A:" + value);
                break;
            }
            case "B": {
                setResponseB(value);
                console.log("B:" + value);
                break;
            }
            case "C": {
                setResponseC(value);
                console.log("C:" + value);
                break;
            }
            case "D": {
                setResponseD(value);
                console.log("D:" + value);
                break;
            }
            case "E": {
                setResponseE(value);
                console.log("E:" + value);
                break;
            }
            case "F": {
                setResponseF(value);
                console.log("F:" + value);
                break;
            }

        }

    }

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <StepQF1
                    onTitleChange={onTitleChange}
                    onDescriptionChange={onDescriptionChange}
                    onLevelChange={onLevelChange}
                    onLongChange={onLongChange}
                    onCategoriesChange={onCategoriesChange}
                    onScoreChange={onScoreChange}
                    onTimeChange={onTimeChange}
                />;
            case 1:
                return <StepQF2
                    onMultipRChange={onMultipRChange}
                    onResponseChange={onResponseChange}
                    multi={multip}
                />;
            case 2:
                return 'This is the bit I really care about!';
            default:
                return 'Unknown step';
        }
    }

    const isStepOptional = (step: number) => {
        return step === 1;
    };

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



    const handleReset = () => {
        setActiveStep(0);
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

const mapDispatchToProps = (dispatch: any) => {
    return { dispatch: (action: any) => { dispatch(action) } }
};

export default connect(mapStateToProps, null)(QuestionsForm)
