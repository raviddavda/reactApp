import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";
import { validateLogin } from "../../validations/loginValidation";
import useAutoLogin from "../../hooks/useAutoLogin";
import ContainerComp from "../../components/ContainerComp";

const LoginPage = () => {
  const [inputsValue, setInputsValue] = useState({
    email: "",
    password: "",
  });

  const [errorsState, setErrorsState] = useState(null);

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const autoLogin = useAutoLogin();

  const handleInputsChange = (e) => {
    setInputsValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleBtnClick = async (event) => {
    try {
      event.preventDefault();
      const joiResponse = validateLogin({
        email: inputsValue.email,
        password: inputsValue.password,
      });

      console.log("joiResponse", joiResponse);
      setErrorsState(joiResponse);
      if (joiResponse) return;

      const { data } = await axios.post("/users/login", {
        email: inputsValue.email,
        password: inputsValue.password,
      });
      localStorage.setItem("token", data);
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
      console.log("data from server", data);
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
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        value={inputsValue.email}
        onChange={handleInputsChange}
      />
      {errorsState && errorsState.email && (
        <Alert severity="warning">{errorsState.email}</Alert>
      )}
      <TextField
        id="password"
        label="Password"
        variant="outlined"
        type="password"
        value={inputsValue.password}
        onChange={handleInputsChange}
      />
      {errorsState && errorsState.password && (
        <Alert severity="warning">{errorsState.password}</Alert>
      )}
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button variant="contained" onClick={handleBtnClick}>
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
