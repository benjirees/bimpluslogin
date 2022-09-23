import React, { useState } from 'react';
import './login.css';
import { bimplusAPI } from '../../services/bimplusAPI.js';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://www.allplan.com/fileadmin/user_upload/shared-files/header/videos-home/City-Precast.jpg)',
    backgroundSize: 'cover',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const api = new bimplusAPI();
async function loginUser(email, password, appid) {
  return api.authorise(email, password, appid);
}

export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [appid, setAppId] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser(
      email,
      password,
      appid
    );
    console.log(response);
    if (response.status === 200) {
      swal("Success", "Logged In", "success", {
        buttons: false,
        timer: 2000,
      })
      .then((value) => {
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('api', JSON.stringify(api));
        // localStorage.setItem('user', JSON.stringify(response['user']));
        window.location.href = "/projectselect";
      });
    } else {
      swal("Failed", "Login Failed", "error");
    }
  }

  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} md={7} className={classes.image}/>
      <Grid item xs={12} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar> */}
          
          <img src='https://i2.wp.com/filecr.com/wp-content/uploads/2022/02/ALLPLAN.png' alt="AllPlan Logo" className="logo"/>
          
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Typography component="h3" variant="h6">
            AllPlan: BIM Dashboard
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              onChange={e => setPassword(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="appid"
              name="appid"
              label="App ID"
              type="string"
              onChange={e => setAppId(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}