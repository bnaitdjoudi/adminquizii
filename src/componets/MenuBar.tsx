import * as React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Paper from '@material-ui/core/Paper';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import  Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: 3,
      minHeight: 45,
      padding: "0px 0px 0px 15px"
    },

    title: {
      flexGrow: 1,
    },

    button: {
      margin: theme.spacing(1),
      float:"left"
    },
 

  }),
);

interface MenuBarPorps{
  content: React.ReactNode;
}

export default function MenuBar(props: MenuBarPorps) {
  const classes = useStyles();
  let history = useHistory();
  
  return (

    <Paper className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        disabled={history.length <= 2}
        startIcon={<ArrowBackIcon />}
        onClick={event =>{
          history.goBack();
        }}
      />
    
       {props.content}
    </Paper>

  )
}