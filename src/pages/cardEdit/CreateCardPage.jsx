import { useState } from "react";
import { TextField, Grid, Typography, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import ContainerComp from "../../components/ContainerComp";

const CreateCardPage = () => {
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

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleUpdateChangesClick = async () => {
    try {
      const { data } = await axios.post("/cards/", {
        title: inputsValue.title,
        subtitle: inputsValue.subtitle,
        description: inputsValue.description,
        phone: inputsValue.phone,
        email: inputsValue.mail,
        web: inputsValue.web,
        image: {
          url: inputsValue.url,
          alt: inputsValue.alt,
        },
        address: {
          state: inputsValue.state,
          country: inputsValue.country,
          city: inputsValue.city,
          street: inputsValue.street,
          houseNumber: inputsValue.houseNumber,
          zip: +inputsValue.zip,
        },
      });
      navigate(ROUTES.HOME);
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <ContainerComp>
      <Typography variant="h2" component="h2" color="primary">
        Create New Card
      </Typography>
      <Typography variant="h5" component="h5">
        Here you can create new cards, and they will be added to the Home page.
      </Typography>
      <Divider sx={{ m: 2 }} />
      <Grid container flexDirection={"column"}>
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          onChange={handleInputChange}
          value={inputsValue.title}
          required
        />
        <TextField
          id="subtitle"
          label="SubTitle"
          variant="outlined"
          onChange={handleInputChange}
          value={inputsValue.subtitle}
          required
        />
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          onChange={handleInputChange}
          value={inputsValue.description}
          required
        />
        <TextField
          id="phone"
          label="Phone Number"
          variant="outlined"
          onChange={handleInputChange}
          value={inputsValue.phone}
          required
        />
        <TextField
          id="mail"
          label="Email"
          variant="outlined"
          onChange={handleInputChange}
          value={inputsValue.mail}
          required
        />
        <TextField
          id="web"
          label="Web"
          variant="outlined"
          onChange={handleInputChange}
          value={inputsValue.web}
        />
        <TextField
          id="url"
          label="Url"
          variant="outlined"
          onChange={handleInputChange}
          value={inputsValue.url}
        />
        <TextField
          id="alt"
          label="Alt"
          variant="outlined"
          onChange={handleInputChange}
          value={inputsValue.alt}
        />

        <TextField
          id="state"
          label="State"
          variant="outlined"
          onChange={handleInputChange}
          value={inputsValue.state}
        />
        <TextField
          id="country"
          label="Country"
          variant="outlined"
          onChange={handleInputChange}
          value={inputsValue.country}
          required
        />
        <TextField
          id="city"
          label="City"
          variant="outlined"
          onChange={handleInputChange}
          value={inputsValue.city}
          required
        />
        <TextField
          id="street"
          label="Street"
          variant="outlined"
          onChange={handleInputChange}
          value={inputsValue.street}
          required
        />
        <TextField
          id="houseNumber"
          label="House Number"
          variant="outlined"
          onChange={handleInputChange}
          value={inputsValue.houseNumber}
          required
        />
        <TextField
          id="zip"
          label="Zip"
          variant="outlined"
          onChange={handleInputChange}
          value={inputsValue.zip}
        />
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={8} md={8} sm={8} xs>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={handleUpdateChangesClick}
          >
            Create New Card
          </Button>
        </Grid>
      </Grid>
    </ContainerComp>
  );
};
export default CreateCardPage;
