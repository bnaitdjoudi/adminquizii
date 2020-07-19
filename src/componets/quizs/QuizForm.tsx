import React from "react";
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import RemoteCombobox from "./../commun/RemoteCombobox";
import { URL_COMPAGN_COMBO, URL_TEST } from "./../../config/Urls";
import CommunService from "./../../services/CommunService";

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
    const service: CommunService = new CommunService(URL_TEST);
 
    React.useEffect(() => {
        if (props.quiz) {
            setTitle(props.quiz.title);
            setReference(props.quiz.reference);
            setSelectedCompagn(props.quiz.compagn);
        }
    }, []);
    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (!props.quiz) {
            service.processPostOne({ title: title, reference: reference, compagn: { id: selectedCompagn.id } })
                .then(resp => {
                    if (resp.status == 200) {
                        props.onsucces();
                    }
                }).catch(err => {
                    console.log(err);
                    props.onfail();
                }
                );
        } else {
            service.processPutOne(props.quiz.id, { title: title, reference: reference, compagn: { id: selectedCompagn.id } })
                .then(resp => {
                    if (resp.status == 200) {
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
                />


            </div>
            <RemoteCombobox required url={URL_COMPAGN_COMBO} onSelectedChange={onSelectedCompagn} value={selectedCompagn} />
        </form>);
}