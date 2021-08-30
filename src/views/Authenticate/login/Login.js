import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import { login } from "../../../actions";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    marginTop: theme.spacing(1),
    backgroundColor: '#4caf50',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  textField: {
    textAlign: 'right',
    align: 'right',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



const Login = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const userLogin = () => {
    if (email !== "" && password !== "") {
      dispatch(login({ email, password }));
    }
  };

  // Password
  const handleChange = (prop) => (event) => {
    setPassword(event.target.value);
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
    // setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  if (auth.authenticate) {
    return <Redirect to="/" />
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VerifiedUserIcon />
        </Avatar>
        <div className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            id="email"
            label="ایمیل"
            name="email"
            autoComplete="email"
            autoFocus
          />

          <FormControl variant="outlined" margin="normal" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">پسورد</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>


          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="به خاطر سپردن"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={userLogin}
          >
            ورود به حساب کاربری
          </Button>

          <Grid container>
            <Grid item xs>
              <Link to="/" variant="body2">
                پسورد را فراموش کردم
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                {"حساب کاربری ندارید؟ ثبت نام کنید"}
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
    </Container>
  );
}

export default Login
