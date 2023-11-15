// import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import ROUTES from "../../routes/ROUTES";
import { validateLogin } from "../../validations/loginValidation";
import { Alert } from "@mui/material";
import useAutoLogin from "../../hooks/useAutoLogin";
import { storeToken } from "../../service/storageService";

const LoginPage = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [errorsState, setErrorsState] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const autoLogin = useAutoLogin();
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const joiResponse = validateLogin({
        email: emailValue,
        password: passwordValue,
      });
      console.log("joiResponse", joiResponse);
      setErrorsState(joiResponse);
      if (joiResponse) return;
      let { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });
      storeToken(data, rememberMe);
      console.log("data from login", data);
      toast("You logged in successfully 👌", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      autoLogin(true); //skip token test
      navigate(ROUTES.HOME);
    } catch (err) {
      console.log("err from login", err);
    }
  };
  const handleEmailInputChange = (e) => {
    setEmailValue(e.target.value);
  };
  const handlePasswordInputChange = (e) => {
    setPasswordValue(e.target.value);
  };
  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={emailValue}
              onChange={handleEmailInputChange}
            />
            {errorsState && errorsState.email && (
              <Alert severity="warning">{errorsState.email}</Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={passwordValue}
              onChange={handlePasswordInputChange}
            />
            {errorsState && errorsState.password && (
              <Alert severity="warning">{errorsState.password}</Alert>
            )}
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
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
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
