import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './../Title';


const useStyles = makeStyles({
    root:{
        minHeight:280
    },
    depositContext: {
        flex: 1,
    },
    green: {
        color: "green"
    },
    red: {
        color: "red"
    },
    orange:{
        color:"orange"
    }
});

export default function Deposits() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <div className={classes.root}>
            <Title>Scores</Title>
            <Typography color="textSecondary" className={classes.depositContext}>
                Best score
      </Typography>
            <Typography component="p" variant="h3" className={classes.green}>
                73%
      </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                Worst score
      </Typography>
            <Typography component="p" variant="h3" className={classes.red}>
                33%
      </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                average score
      </Typography>
            <Typography component="p" variant="h3" className={classes.orange}>
                56%
      </Typography>
      </div>
        </React.Fragment>
    );
}
