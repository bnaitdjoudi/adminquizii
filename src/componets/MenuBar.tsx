import * as React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: 3,
      minHeight: 45
    },

    title: {
      flexGrow: 1,
    },

  }),
);

export default function MenuBar() {
  const classes = useStyles();
  return (<div >

    <Paper className={classes.root}>
    
    </Paper>

  </div>)
}