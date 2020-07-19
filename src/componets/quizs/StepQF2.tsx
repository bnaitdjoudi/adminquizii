import React from "react";
import { Paper, Grid, Switch, FormControlLabel } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Response from "./Response";
import { connect } from "react-redux";
import { updateMulti } from "./../../actions"
import loc from "./../../locale/I18n";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Editor } from '@tinymce/tinymce-react';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialog: {
            height: "100%"
        },
        root: {
            height: "100%",
            display: "block ruby",
            backgroundColor: "#fbfbfb"


        },
        form: {
            height: "100%"
        },
        grid: {
            height: "100%",


        },

        griditem: {
            height: "100%",
            backgroundColor: "#ccc"

        },
        paper: {
            height: "100%",
            padding: "5px",
        },
        check: {
            padding: "20px 30px",
        },

        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },


    }),
);

const mapStateToProps = (state: any) => ({
    multi: state.root.multi,
    descriptionQuestion: state.root.descriptionQuestion

});

const mapDispatchToProps = (dispatch: any) => {
    return { dispatch: (updateMulti: any) => { dispatch(updateMulti) } }
};



function StepQF2(props: any) {


    const classes = useStyles();


    return (
        <Paper className={classes.root}>

            <Grid container spacing={4} className={classes.grid}>
                <Grid item xs={12}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>{loc("main.questdescription")}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container className={classes.grid}>
                                <Grid item xs={12}>
                                    <Editor
                                        apiKey="fxtxhvf1cdbturnhc05upkvhcqeg6lq96nossno86lpwyl0u"
                                        initialValue={props.descriptionQuestion}
                                        disabled={true}
                                        init={{
                                            
                                            menubar: false,
                                            plugins: [
                                                'advlist autolink lists link image charmap print preview anchor',
                                                'searchreplace visualblocks code codesample fullscreen',
                                                'insertdatetime media table paste code help wordcount'
                                            ],


                                        }}
                                        toolbar='false'
                                    />

                                </Grid>

                            </Grid>

                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Grid>
                <Grid item xs={12}><div className={classes.check}>
                    <FormControlLabel
                        control={
                            <Switch color="primary" checked={props.multi} inputProps={{ 'aria-label': 'primary checkbox' }} onChange={(event: any, checked: boolean) => {
                                props.onMultipRChange(checked);
                                props.dispatch(updateMulti());
                            }} />}
                        label={loc("main.multichoise")}
                    /></div></Grid>
                <Grid item xs={6}><Response index={1} resp="A" onResponseEditChange={(value: string) => {
                    props.onResponseChange(value, "A");
                }}

                    title={loc("main.response") + " A"} /></Grid>
                <Grid item xs={6}><Response index={2} resp="B" onResponseEditChange={(value: string) => {
                    props.onResponseChange(value, "B");
                }}

                    title={loc("main.response") + " B"} /></Grid>
                <Grid item xs={6}><Response index={3} resp="C" onResponseEditChange={(value: string) => {
                    props.onResponseChange(value, "C");
                }}

                    title={loc("main.response") + " C"} /></Grid>
                <Grid item xs={6}><Response index={4} resp="D" onResponseEditChange={(value: string) => {
                    props.onResponseChange(value, "D");
                }}

                    title={loc("main.response") + " D"} /></Grid>
                <Grid item xs={6}><Response index={5} resp="E" onResponseEditChange={(value: string) => {
                    props.onResponseChange(value, "E");
                }}

                    title={loc("main.response") + " E"} /></Grid>
                <Grid item xs={6}><Response index={6}

                    resp="F"
                    onResponseEditChange={(value: string) => {
                        props.onResponseChange(value, "F");
                    }
                    }
                    title={loc("main.response") + " F"} /></Grid>
            </Grid>
        </Paper>
    );

}
export default connect(mapStateToProps, mapDispatchToProps)(StepQF2)