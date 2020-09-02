import React from "react";
import "./styles.css";

import Demo from "./Demo";
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';



const useStyles = makeStyles((theme) => ({
    root: {

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
    option:{
        padding:"5px",

        "& span":{
            padding:"0 0 0 10px"
        }
    }

}));


export default function (props) {

   

    const classes = useStyles();
    /*const options = {
        orientation: 'landscape',
        unit: 'in',
        format: [4, 2]
    };*/
    
    React.useEffect(()=>{
        console.log(props);
    },[props]);

    return (
        <Grid container xs={12} spacing={1} >
           
            <Grid item xs={12}>
                <Card className={classes.root} >
                    <CardHeader
                        title={props.data.title}
                        subheader={props.data.statement}
                    />
                    <CardContent>
                        <Grid container xs={12} spacing={1}>
                            <Grid item xs={12}>
                                <Paper elevation={0}>
                                    {props.data.options.map((el,ind)=>{
                                     return   <div className={classes.option}><strong>{el.option}:</strong><span>{el.content}</span></div>
                                    })}
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Demo data={props.data.options} title="Question 1"></Demo>
                            </Grid>

                        </Grid>

                    </CardContent>
                </Card>
            </Grid>

        </Grid>


    )
}