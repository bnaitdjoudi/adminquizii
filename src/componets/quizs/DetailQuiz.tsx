import React from "react";
import MenuBar from "../MenuBar";
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ConfirmationDialog from "./../commun/ConfirmationDialog";
import LabelPropertie from "../commun/LabelPropertie";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { red } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import CommunService from "../../services/CommunService";
import QuizService from "../../services/QuizService";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { URL_TEST } from "./../../config/Urls";
import { useHistory } from "react-router-dom";
import AfterActionSnackBar from "./../commun/AfterActionSnackBar";
import Questions from "./Questions";
import Title from "./../Title";
import QuizForm from "./QuizForm";
import loc from "./../../locale/I18n";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import LinkIcon from '@material-ui/icons/Link';
import Typography from '@material-ui/core/Typography';
import copy from "copy-to-clipboard";
import SondageQuestionList from "./SondageQuestionList";
import AssessmentIcon from '@material-ui/icons/Assessment';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: "100%",
            minHeight: 290
        },
        root2: {
            maxWidth: "100%",
            padding: "5px",
        },
        header: {
            fontSize: ".25em"
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
        paper: {
            padding: theme.spacing(2),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
        },
        elSpacing:{
            marginLeft:2
        }
    }),
);


function SimpleBreadcrumbs(props: any) {

    let history = useHistory();

    return (

        <div style={{ padding: "12px 0px 0px 0px" }}>
            <Breadcrumbs aria-label="breadcrumb">

                <Link color="primary" onClick={() => {
                    history.push("/");

                }} >
                    <HomeIcon />
                </Link>

                <Link color="primary" onClick={() => {
                    history.push("/tests");

                }} >
                    {loc("main.questionaire")}
                </Link>

                <Typography color="textPrimary">{props.title ? props.title : ""}</Typography>
            </Breadcrumbs>
        </div>
    );
}


export default function DetailQuiz(props: any) {

    const classes = useStyles();
    let history = useHistory();

    const [open, setOpen] = React.useState(true);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openAction, setOpenAtion] = React.useState(false);

    const [pathTitle, setPathTitle] = React.useState<string>("");
    //const [compagn, setCompagn] = React.useState<any>();
    const [test, setTest] = React.useState<any>({});
    const [openConfirmation, setOpenConfirmation] = React.useState(false);

    const [returnTo, setReturnTo] = React.useState(true);

    const valideLabel = loc("validate");
    const closeLabel = loc("close");
    const updateLabel = loc("main.updatetest");
    const minscoreLabel = loc("main.minscore");

    React.useEffect(() => {
        let service: CommunService = new CommunService(URL_TEST);
        service.processGetOne(props.match.params.id).then((resp) => {
            setTest(resp.data);
            setOpen(false);

            setPathTitle("[" + (resp.data && resp.data.reference ? resp.data.reference : "") + "] " + resp.data.title);

        })
    }, [props]);


    const onDeleteClicked = () => {
        setOpenConfirmation(true);

    }

    const onUpdateClicked = () => {
        setOpenDialog(true);
    }
    const deleteAction = () => {
        setOpen(true);
        let service: CommunService = new CommunService(URL_TEST);
        service.processDeleteOne(props.match.params.id).then((resp) => {
            setOpenConfirmation(false);
            setOpen(false);
            if (resp.status === 202) {
                setOpenAtion(true);
                setReturnTo(true);
            }

        });
    }

    //const getLabelOption = (item: any) => item ? item.moduleName ? item.moduleName : "no1" : "no";
    const handleDialogClose = () => {
        setOpenDialog(false);
    };



    const handleSubmit = () => {
        setOpenAtion(true);
        let service: CommunService = new CommunService(URL_TEST);
        service.processGetOne(props.match.params.id).then((resp) => {
            setTest(resp.data);
            setOpen(false);
            //setTitle(resp.data.title);
            //console.log(JSON.stringify(resp.data.categorieTest));
            //setCompagn(resp.data.compagn);
        })
        handleDialogClose();

    }

    const submitFail = () => {
        setOpenDialog(false)
        setOpenAtion(true);
    }

    const afterDeleteAction = () => {
        console.log("redirect:" + returnTo)
        if (returnTo)
            history.push("/tests");

        setOpenAtion(false);
    }

    const copyLinkTest = (event: any) => {
        let quizService: QuizService = new QuizService();
        setOpen(true);
        quizService.linkTest(props.match.params.id).then(resp => {
            copy(resp.data);
        }).finally(() => {
            setOpen(false);
        })
    }

    const goToResult = (event:any) =>{
        history.push("/results/"+test.type+"/"+props.match.params.id);
    }

    return (<div>
        <MenuBar content={<SimpleBreadcrumbs title={pathTitle} />} />
        <Paper  >
            <Grid container spacing={1} xs="auto">

                <Grid item xs={12}>
                    <Card className={classes.root}>

                        <CardHeader

                            action={<div>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    aria-label="settings"
                                    onClick={onDeleteClicked}
                                    title={loc("delete")} 
                                    className={classes.elSpacing}>
                                    <DeleteIcon />
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    aria-label="settings"
                                    onClick={onUpdateClicked}
                                    title={loc("main.updatetest")}
                                    className={classes.elSpacing}>
                                    <EditIcon />
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    aria-label="settings"
                                    onClick={copyLinkTest}
                                    title={loc("main.lientest")}
                                    className={classes.elSpacing}>
                                    <LinkIcon />
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    aria-label="settings"
                                    onClick={goToResult}
                                    className={classes.elSpacing}
                                    title={loc("main.lientest")}
                                    >
                                    <AssessmentIcon />
                                </Button>
                            </div>
                            }
                            title={<Title>{loc("main.general")}</Title>}

                        >

                        </CardHeader>
                        <Grid container >
                            <Grid xs={4} >
                                <CardContent>
                                    <LabelPropertie label={loc("main.title")} value={test ? test.title : ""} />
                                    <LabelPropertie label={loc("main.doc")} value={test ? "" + test.createDate : ""} />
                                    <LabelPropertie label={loc("main.compagn")} value={test && test.compagn ? test.compagn.title : ""} />
                                </CardContent>
                            </Grid>
                            <Grid xs={4} >
                                <CardContent>
                                    <LabelPropertie label={loc("main.reference")} value={test ? test.reference + "" : ""} />
                                    <LabelPropertie label={loc("main.refcompagn")} value={test && test.compagn ? test.compagn?.compagnRef : ""} />
                                </CardContent>
                            </Grid>

                            <Grid xs={4} >
                                <CardContent>
                                    <LabelPropertie label={loc("main.type")} value={test ? test.type === "s" ? "Sondage" : "Evaluation" : ""} />
                                    {test && test.type === "v" ? <LabelPropertie label={minscoreLabel} value={test ? "" + test.minScore : ""} /> : ""}
                                </CardContent>
                            </Grid>

                        </Grid>


                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        {test && test.type === "s" ?
                            <SondageQuestionList test={props.match.params.id} />
                            : <Questions test={props.match.params.id} />
                            }

                    </Paper>
                </Grid>

            </Grid>
        </Paper>
        <ConfirmationDialog
            message="message.delete"
            openConfirmation={openConfirmation}
            onconfirm={() => { deleteAction() }}
            oncancel={() => { setOpenConfirmation(false); }}
        />
        <Backdrop open={open} className={classes.backdrop} >
            <CircularProgress color="inherit" />
        </Backdrop>
        <AfterActionSnackBar
            open={openAction}
            handleClose={afterDeleteAction}
            severity="success"
        />
        <Dialog open={openDialog} onClose={handleDialogClose} aria-labelledby="form-dialog-title" fullWidth>
            <DialogTitle id="form-dialog-title">{updateLabel}</DialogTitle>
            <DialogContent>


                <QuizForm onsucces={handleSubmit} onfail={submitFail} quiz={test} />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose} color="secondary" variant="contained">
                    {closeLabel}
                </Button>
                <Button onClick={() => {
                    setOpen(true);
                    setReturnTo(false);
                }} type="submit" form="quizform" color="primary" variant="contained">
                    {valideLabel}
                </Button>
            </DialogActions>
        </Dialog>

    </div>);
}