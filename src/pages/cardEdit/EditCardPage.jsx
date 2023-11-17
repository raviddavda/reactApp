import { useState } from "react";
import { TextField, Grid, Typography, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ContainerComp from "../../components/ContainerComp";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";
import normalizeCardData from "./normalizeCardData";

const EditCardPage = () => {
  const [inputsValue, setInputValue] = useState({
    title: "",
    subtitle: "",
    phone: "",
    add: "",
    mail: "",
    description: "",
    web: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleUpdateChangesClick = async () => {
    try {
      const cardData = normalizeCardData(inputsValue);
      const { data } = await axios.put("/cards/" + id, { cardData });
      toast.success("Card updated successesfuly!", {
        position: "top-center",
        autoClose: 5000,
        closeOnClick: true,
      });
      navigate(ROUTES.MYCARDS);
    } catch (err) {
      toast.error("Could not update card!", { toastId: "editCard" });
    }
  };
  return (
    <ContainerComp>
      <Typography component="h2" variant="h2" color="primary">
        Edit Card
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="title"
            label="Title"
            variant="outlined"
            onChange={handleInputChange}
            value={inputsValue.title}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="subtitle"
            label="SubTitle"
            variant="outlined"
            onChange={handleInputChange}
            value={inputsValue.subtitle}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            id="phone"
            label="Phone Number"
            variant="outlined"
            onChange={handleInputChange}
            value={inputsValue.phone}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            id="description"
            label="Description"
            variant="outlined"
            onChange={handleInputChange}
            value={inputsValue.description}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            id="web"
            label="Web"
            variant="outlined"
            onChange={handleInputChange}
            value={inputsValue.web}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            id="mail"
            label="Email"
            variant="outlined"
            onChange={handleInputChange}
            value={inputsValue.mail}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            id="url"
            label="Url"
            variant="outlined"
            onChange={handleInputChange}
            value={inputsValue.url}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            id="alt"
            label="Alt"
            variant="outlined"
            onChange={handleInputChange}
            value={inputsValue.alt}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            id="state"
            label="State"
            variant="outlined"
            onChange={handleInputChange}
            value={inputsValue.state}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            id="country"
            label="Country"
            variant="outlined"
            onChange={handleInputChange}
            value={inputsValue.country}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            id="city"
            label="City"
            variant="outlined"
            onChange={handleInputChange}
            value={inputsValue.city}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            id="street"
            label="Street"
            variant="outlined"
            onChange={handleInputChange}
            value={inputsValue.street}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            id="houseNumber"
            label="House Number"
            variant="outlined"
            onChange={handleInputChange}
            value={inputsValue.houseNumber}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            id="zip"
            label="Zip"
            variant="outlined"
            onChange={handleInputChange}
            value={inputsValue.zip}
          />
        </Grid>
        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 2, bgcolor: "primary" }}
          onClick={handleUpdateChangesClick}
        >
          Update Changes
        </Button>
      </Grid>
    </ContainerComp>
  );
};
export default EditCardPage;
