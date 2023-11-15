import { useState } from "react";
import { Grid, Typography, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import ContainerComp from "../../components/ContainerComp";
import { normalizeCardData } from "./normalizeCardData";
import FieldTextComp from "../../components/FieldTextComp";

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
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setInputValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleUpdateChangesClick = async () => {
    try {
      const inputData = normalizeCardData(inputsValue);
      const { data } = await axios.post("/cards/", { inputData });
      navigate(ROUTES.HOME);
    } catch (err) {
      setError(err);
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
      <Grid container spacing={2}>
        <FieldTextComp inputsValue={inputsValue} onChange={handleInputChange} />
      </Grid>
      <Button
        fullWidth
        color="primary"
        variant="outlined"
        sx={{ mt: 2 }}
        onClick={handleUpdateChangesClick}
      >
        Create New Card
      </Button>
    </ContainerComp>
  );
};
export default CreateCardPage;
