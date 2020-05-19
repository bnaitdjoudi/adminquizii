import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import loginService from './../services/LoginService';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ErrorIcon from '@material-ui/icons/Error';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [openMessage, setOpenMessage] = React.useState(false);
  const [openMessageError, setOpenMessageError] = React.useState(false);
  const [openMessageErrorServer, setOpenMessageErrorServer] = React.useState(false);

  const emailChange = (event) => {
    setEmail(event.target.value);
  }

  const passwordChange = (event) => {
    setPassword(event.target.value);
  }


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenMessage(false);
    setOpenMessageError(false);
    setOpenMessageErrorServer(false);
  };
  function dispalyError (open){
    if (open) {
      return (
        <div>
          <ErrorIcon color='error' align='center' display='inline-block'/>
        <span style={
          {
            color: 'white',
            backgroundColor:'#f44336',
            padding:"15px 20px", 
            textAlign:"center",
            fontFamily:"Arial",
            float:"left",
            borderRadius:"5px"}}>
          Votre Adresse email et/ou mot de passe sont incorrecte!
        </span>
        </div>
        
      );
    }
    else{
      return;
  
    }
  };
  
  const submit = (event) => {
    event.preventDefault();
    setOpen(true);
    loginService.signin(email, password).then((resp) => {

      if (resp.status === 200) {
       console.log(resp.data)
       localStorage.setItem("user", JSON.stringify(resp.data));
      
       window.location.reload(false);
      } else {
       console.log("error");
      }
    }).catch((event)=>{
      console.log(event.response.status);
      setOpen(false)
      if (event.response.status===401){
        setOpenMessage(true)
      }
      if (event.response.status===404){
        setOpenMessageError(true)
      }
      if (event.response.status===505){
        setOpenMessageErrorServer(true)
      }
      
      

      })

  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Signin
        </Typography>
        
        <Snackbar open={openMessage} autoHideDuration={6000}>
          <Alert onClose={handleClose} severity="error">Votre email et/ou mot de passe sont incorrect!
          
        </Alert>
        
              
          
          </Snackbar>
          
          <Snackbar open={openMessageError} autoHideDuration={6000}>
          <Alert severity="error">Votre compte n'existe pas!
          
        </Alert>
              
          
          </Snackbar>
          <Snackbar open={openMessageErrorServer} autoHideDuration={6000}>
          <Alert severity="error">Error
          
          
        </Alert>
              
          
          </Snackbar>
        
        <form className={classes.form} onSubmit={submit}>
          {dispalyError(openMessage)}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={emailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={passwordChange}
          />
         
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={open}

          >
            Sign In
          </Button>
          <Backdrop open={open} >
        <CircularProgress color="inherit" />
        </Backdrop>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}