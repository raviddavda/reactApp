import { useState } from "react";
import { Grid, Typography, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import ContainerComp from "../../components/ContainerComp";
import FieldTextComp from "../../components/FieldTextComp";
import inputData from "./inputData";
import normalizeCardData from "./normalizeCardData";
import { validateCard } from "../../validations/cardValidation";
import { toast } from "react-toastify";

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
  const [errorsState, setErrorsState] = useState({});
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
      const joiResponse = validateCard(inputData);
      setErrorsState(joiResponse);
      if (joiResponse) return;

      const request = normalizeCardData(inputsValue);

      const { data } = await axios.post("/cards", request);
      navigate(ROUTES.HOME);
    } catch (err) {
      toast.error("A card already exists with that Email", {
        toastId: "createCard",
      });
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
        {inputData.map((input, index) => (
          <FieldTextComp
            isError={Boolean(errorsState[input.value])}
            helperText={errorsState[input.value]}
            key={index}
            id={input.id}
            label={input.label}
            required={input.required}
            value={inputsValue[input.value]}
            onChange={handleInputChange}
          />
        ))}
      </Grid>
      <Button
        fullWidth
        color="primary"
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleUpdateChangesClick}
      >
        Create New Card
      </Button>
    </ContainerComp>
  );
};
export default CreateCardPage;
