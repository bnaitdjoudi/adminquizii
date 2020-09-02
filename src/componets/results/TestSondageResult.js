import React from "react";
import { Paper, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import QuestionSondageResult from "./QuestionSondageResult";
import ExportButton from '../commun/ExportButton';
import QuizService from '../../services/QuizService';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: "100%",
        padding: "0px 4px 0px 3px"
    },
    paperRoot: {
        width: "100%",
    }

}));

export default function () {
    const classes = useStyles();
    const ref = React.createRef();

    const [data, setData] = React.useState({questions:[]});

    React.useEffect(()=>{
        const service = new QuizService();
        service.getTestSondageResultByTestId(-23).then(resp =>{
            const letre = ['A','B', 'C', 'D' , 'E', 'F', 'G'];
            let ind = 0;
            const dataServer = resp.data;
            dataServer.questions.forEach(element => {
                element.options.forEach(el=>{
                    el.option='Option '+letre[ind];
                    ind++;
                })
                ind=0;
            });;

            console.log(dataServer);
            setData(dataServer);
        })
    },[]);



    return (
        <div className={classes.root}>
            <Paper className={classes.paperRoot} >
                <Grid container xs={12} spacing={1} >

                    <Grid item xs={12} >
                        <Paper >
                            <ExportButton target={ref} />
                        </Paper>
                    </Grid>

                    <Grid container item xs={8} spacing={1} >


                        <Grid item container xs={12} ref={ref} spacing={1} >

                            {data.questions.map((el,ind)=>{
                                return (<Grid item xs={12}>
                                    <QuestionSondageResult data={el}/>
                                </Grid>)
                            })}
                            
                        </Grid>

                    </Grid>
                    <Grid item xs={4}>
                        <Paper>
                            Chart
                        </Paper>

                    </Grid>
                </Grid>
            </Paper>
        </div>


    )
}