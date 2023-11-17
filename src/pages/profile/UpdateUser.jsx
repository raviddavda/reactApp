import { useState } from "react";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import axios from "axios";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { validateRegister } from "../../validations/registerValidation";
import normalizeData from "../register/normalizeData";
import ContainerComp from "../../components/ContainerComp";

const RegisterPage = () => {
  const [inputsValue, setInputsValue] = useState({
    first: "",
    middle: "",
    last: "",
    email: "",
    password: "",
    phone: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const [errorsState, setErrorsState] = useState(false);
  const [checked, setChecked] = useState(true);
  const navigate = useNavigate();

  const handleInputsChange = (e) => {
    setInputsValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const inputData = normalizeData(inputsValue, checked);
      const joiResponse = validateRegister(inputData);
      console.log("joi", joiResponse);
      setErrorsState(joiResponse);
      if (joiResponse) return;

      const request = normalizeData(inputsValue, checked);

      const { data } = await axios.put("/users", request);
      console.log("data", data);
      toast.success("Welcome, Please log in", {
        position: "top-center",
        autoClose: 5000,
      });
      navigate(ROUTES.LOGIN);
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <ContainerComp>
      <Typography component="h2" variant="h2" color="primary">
        Edit user settings
      </Typography>
      <Divider sx={{ m: 2 }} />
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              error={errorsState && errorsState.first ? true : false}
              helperText={errorsState.first}
              id="first"
              name="first"
              label="First Name"
              autoComplete="given-name"
              required
              autoFocus
              value={inputsValue.first}
              onChange={handleInputsChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="middle"
              name="middle"
              label="Middle Name"
              autoComplete="given-name"
              value={inputsValue.middle}
              onChange={handleInputsChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              error={errorsState && errorsState.last ? true : false}
              helperText={errorsState.last}
              id="last"
              name="last"
              label="Last Name"
              autoComplete="family-name"
              required
              value={inputsValue.last}
              onChange={handleInputsChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              error={errorsState && errorsState.email ? true : false}
              helperText={errorsState.email}
              id="email"
              name="email"
              label="Email Address"
              autoComplete="email"
              required
              value={inputsValue.email}
              onChange={handleInputsChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              error={errorsState && errorsState.password ? true : false}
              helperText={errorsState.password}
              type="password"
              id="password"
              name="password"
              label="Password"
              autoComplete="new-password"
              required
              value={inputsValue.password}
              onChange={handleInputsChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              error={errorsState && errorsState.phone ? true : false}
              helperText={errorsState.phone}
              id="phone"
              name="phone"
              label="Phone"
              autoComplete="new-phone"
              required
              value={inputsValue.phone}
              onChange={handleInputsChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="url"
              name="url"
              label="Url"
              value={inputsValue.url}
              onChange={handleInputsChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="alt"
              name="alt"
              label="Alt"
              value={inputsValue.alt}
              onChange={handleInputsChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="state"
              name="state"
              label="State"
              value={inputsValue.state}
              onChange={handleInputsChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              error={errorsState && errorsState.country ? true : false}
              helperText={errorsState.country}
              id="country"
              name="country"
              label="Country"
              required
              value={inputsValue.country}
              onChange={handleInputsChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              error={errorsState && errorsState.city ? true : false}
              helperText={errorsState.city}
              id="city"
              name="city"
              label="City"
              required
              value={inputsValue.city}
              onChange={handleInputsChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              error={errorsState && errorsState.street ? true : false}
              helperText={errorsState.street}
              id="street"
              name="street"
              label="Street"
              required
              value={inputsValue.street}
              onChange={handleInputsChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              error={errorsState && errorsState.houseNumber ? true : false}
              helperText={errorsState.houseNumber}
              id="houseNumber"
              name="houseNumber"
              label="House Number"
              required
              value={inputsValue.houseNumber}
              onChange={handleInputsChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              error={errorsState && errorsState.zip ? true : false}
              helperText={errorsState.zip}
              id="zip"
              name="zip"
              label="Zip"
              value={inputsValue.zip}
              onChange={handleInputsChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  value="isBusiness"
                  color="primary"
                  checked={checked}
                  onChange={handleChange}
                />
              }
              label="Business Account"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update user setttings
        </Button>
      </Box>
    </ContainerComp>
  );
};

export default RegisterPage;
