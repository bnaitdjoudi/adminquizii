import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import HighlightOff from '@material-ui/icons/HighlightOff';
import loc from "./../../locale/I18n";
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { TextField, IconButton } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        marginBottom: 2,
        '& svg': {
            margin: theme.spacing(1.5),
        },
        '& hr': {
            margin: theme.spacing(0, 0.5),
        },

        padding:1

    },
    input: {
        width: "95%!important"
    },
    label:{
        fontSize:"9pt",
        color:"black",
        
    }
}));

export default function SondageOption(props) {

    const classes = useStyles();

    const [value, setValue] = React.useState();
    const onDelectClick = (event) => {
        if (props.onDelecte) {
            props.onDelecte(props.optionId);
        }
    }




    React.useEffect(() => {
        setValue(props.value);
    }, [props.value])
    const onChangeOption = (event, value) => {

        if (props.onChangeOption) {
            props.onChangeOption(props.optionId, value);
        }
    }

    const titleTooltip = loc("delete");
    return (<Grid container xs={12} alignItems="center" className={classes.root}>

        <label className={classes.label} >
            {"Option:"+(props.ind+1)} 
        </label>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={10}>
            <TextField
                className={classes.input}
                onChange={(event, value) => {

                    onChangeOption(event, event.target.value)
                }}
                value={value}
                required
                InputProps={{
                    readOnly: props.readOnly,
                  }}
            ></TextField>
        </Grid>




        <Divider orientation="vertical" flexItem />

        <IconButton aria-label="upload picture" component="span" color="secondary" style={{ padding: 0 }}
            disabled={!props.canDelete||props.readOnly} onClick={onDelectClick} title={titleTooltip} >
            <HighlightOff fontSize="small" />
        </IconButton>





    </Grid>)
}