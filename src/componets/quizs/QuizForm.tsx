import React from "react";
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import RemoteCombobox from "./../commun/RemoteCombobox";
import { URL_COMPAGN_COMBO, URL_TEST } from "./../../config/Urls";
import CommunService from "./../../services/CommunService";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ScoreTextField from '../commun/ScoreTextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

interface QuizFormProps {
    onsucces: any;
    onfail: any
    quiz?: any
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }),
);

export default function QuizForm(props: QuizFormProps) {

    const classes = useStyles();
    const [title, setTitle] = React.useState<string>("");
    const [reference, setReference] = React.useState<string>("");
    const [selectedCompagn, setSelectedCompagn] = React.useState<any>({});
    const [but, setBut] = React.useState("s");
    const [score, setScore] = React.useState(80);

    const service: CommunService = new CommunService(URL_TEST);

    React.useEffect(() => {
        if (props.quiz) {
            setTitle(props.quiz.title);
            setReference(props.quiz.reference);
            setSelectedCompagn(props.quiz.compagn);
            setBut(props.quiz.type);
            setScore(props.quiz.minScore);
        }
    }, [props.quiz]);


    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (!props.quiz) {
            service.processPostOne({ title: title, reference: reference, compagn: { id: selectedCompagn.id } , type:but, minScore:score })
                .then(resp => {
                    if (resp.status === 200) {
                        props.onsucces();
                    }
                }).catch(err => {
                    console.log(err);
                    props.onfail();
                }
                );
        } else {
            service.processPutOne(props.quiz.id, { title: title, reference: reference, compagn: { id: selectedCompagn.id } , type:but, minScore:score})
                .then(resp => {
                    if (resp.status === 200) {
                        props.onsucces();
                    }
                }).catch(err => {
                    console.log(err);
                    props.onfail();
                }
                );
        }

    }

    const onSelectedCompagn = (selectedCompagnd: any) => {
        setSelectedCompagn(selectedCompagnd);
        if (selectedCompagnd) {
            console.log(selectedCompagnd.compagnRef)
        } else {
            console.log("coucou");
        }
    }


    return (
        <form id="quizform" autoComplete="off" onSubmit={handleSubmit} >
            <div className={classes.root}>
                <TextField
                    onChange={(event: any) => {
                        setTitle(event.target.value);
                    }}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Title"
                    type="text"
                    fullWidth
                    required
                    value={title}

                />
                <TextField
                    onChange={(event: any) => {
                        setReference(event.target.value);
                    }}
                    value={reference}
                    margin="dense"
                    id="name"
                    label="Reference"
                    type="text"
                    fullWidth
                    required
                />


            </div>
            <RemoteCombobox label="Comapagn" required url={URL_COMPAGN_COMBO} onSelectedChange={onSelectedCompagn} value={selectedCompagn} />
           
            <div className={classes.root}>

            <FormControl component="fieldset">
                <FormLabel component="legend">But</FormLabel>
                <RadioGroup aria-label="gender" name="gender1"
                 value={but} 
                 onChange={(event:any,val:any)=>{
                     setBut(val);
                 }}>
                    <FormControlLabel value="s" control={<Radio />} label="Sondage" />
                    <FormControlLabel value="v" control={<Radio />} label="Evaluation" />
                   
                </RadioGroup>
            </FormControl>

        </div>
            {but!=="s"?
            
            <div className={classes.root}>
                <ScoreTextField
                    label="Score minimum"
                    variant="standard"
                    value={score}
                    currencySymbol="%"
                    //minimumValue="0"
                    outputFormat="number"
                    disabled={but==="s"}
                    required={but!=="s"}
                    onChange={(event: any, value: any) => setScore(value)}
                    textAlign="left"
                />
            </div>
        
            :<div></div>}
            
        </form>);
}