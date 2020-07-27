import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './../Title';
import QuizService from "../../services/QuizService";


const useStyles = makeStyles({
    root:{
        minHeight:280
    }
    ,
    depositContext: {
        flex: 1,
    },
    green: {
        color: "green"
    },
    red: {
        color: "red"
    },
    orange: {
        color: "orange"
    }
});

export default function CondidatQuiz(props:any) {
    const classes = useStyles();

    const [nbrCondidat,setNbrCondidat] = React.useState(0);
    const [tauxsucces,setTauxSucces] = React.useState("0%");
    
    

   /* React.useEffect(() => {
        let service = new QuizService();
        service.getCondidatsTestInfo(props.testId).then(resp =>{
            setNbrCondidat(resp.data.totalCondidat);
            setTauxSucces(resp.data.succes);
       }).catch(error=>{
           console.log("dddd:"+error);
       })
    }, [props]);*/

    

    return (
        <React.Fragment>
            <div className={classes.root}>
            <Title>Condidtats</Title>
            <Typography color="textSecondary" className={classes.depositContext}>
             Nombre de condidats
            </Typography>
            <Typography component="p" variant="h3" className={classes.orange}>
                {nbrCondidat}
      </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                Taut de réussite ()
      </Typography>
            <Typography component="p" variant="h3" className={classes.green}>
                {tauxsucces}
      </Typography>

      </div>
           
        </React.Fragment>
    );
}
