import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";
import { validateLogin } from "../../validations/loginValidation";
import useAutoLogin from "../../hooks/useAutoLogin";
import ContainerComp from "../../components/ContainerComp";
import { storeToken } from "../../service/storageService";

const LoginPage = () => {
  const [inputsValue, setInputsValue] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(true);
  const [errorsState, setErrorsState] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false);

  const navigate = useNavigate();
  const autoLogin = useAutoLogin();

  useEffect(() => {
    if (inputsValue.email !== "" && inputsValue.password !== "") {
      setEnableSubmit(true);
    } else {
      setEnableSubmit(false);
    }
  }, [inputsValue]);

  const handleInputsChange = (e) => {
    setInputsValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleBtnClick = async (event) => {
    try {
      const joiResponse = validateLogin({
        email: inputsValue.email,
        password: inputsValue.password,
      });

      setErrorsState(joiResponse);
      if (joiResponse) return;

      const { data } = await axios.post("/users/login", {
        email: inputsValue.email,
        password: inputsValue.password,
      });
      storeToken(data, rememberMe);
      toast.success("Logged in", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      autoLogin(true);
      navigate(ROUTES.HOME);
    } catch (error) {
      toast.error(error.response.data, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <ContainerComp>
      <Typography component="h2" variant="h2" color="primary">
        Sign In
      </Typography>
      <Divider sx={{ m: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            error={errorsState && errorsState.email ? true : false}
            helperText={errorsState.email}
            id="email"
            label="Email"
            variant="outlined"
            autoFocus
            fullWidth
            required
            value={inputsValue.email}
            onChange={handleInputsChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={errorsState && errorsState.password ? true : false}
            helperText={errorsState.password}
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            required
            value={inputsValue.password}
            onChange={handleInputsChange}
          />
        </Grid>
      </Grid>
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
        variant="contained"
        onClick={handleBtnClick}
        disabled={!enableSubmit}
      >
        Sign In
      </Button>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link component={NavLink} to={ROUTES.REGISTER}>
          Don't have an account? Sign Up
        </Link>
      </Box>
    </ContainerComp>
  );
};

export default LoginPage;
