import React  from 'react';
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
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import loc from "../locale/I18n";



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        {loc('title')}
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


  
  function dispalyError (open,messageError){
    if (open) {
      return (
        <div>
          <Alert action={<IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenMessage(false);
                setOpenMessageError(false);
                setOpenMessageErrorServer(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>} 
          severity="error">{messageError}</Alert>
         
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
      console.log(event);
      setOpen(false)
      if (event.status===401){
        setOpenMessage(true)
      }
      if (event.status===404){
        setOpenMessageError(true)
      }
      if (event.status===505){
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
          {loc('user.signin')}
        </Typography>

        <form className={classes.form} onSubmit={submit}>
          {dispalyError(openMessage,"Votre email ou/et votre mot de passe dont incorrecte!")}
          {dispalyError(openMessageError,"Votre compte n'existe pas!")}
          {dispalyError(openMessageErrorServer,"Erreur veuillez contacter...")}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={loc('user.email')}
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
            label={loc('user.password')}
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={passwordChange}
          />
         
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={loc('user.remeber')}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={open}

          >
            {loc('user.tosignin')}
          </Button>
          <Backdrop open={open} >
        <CircularProgress color="inherit" />
        </Backdrop>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                {loc('user.pwdforgot')}
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
              {loc('user.nocount')}
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