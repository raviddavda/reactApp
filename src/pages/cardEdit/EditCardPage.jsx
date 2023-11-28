import { useState } from "react";
import { Grid, Typography, Button, Divider, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ContainerComp from "../../components/ContainerComp";
import ROUTES from "../../routes/ROUTES";
import inputData from "./inputData";
import { toast } from "react-toastify";
import normalizeCardData from "./normalizeCardData";
import { validateCard } from "../../validations/cardValidation";
import FieldTextComp from "../../components/FieldTextComp";

const EditCardPage = () => {
  const [inputsValue, setInputValue] = useState({
    title: "",
    subtitle: "",
    phone: "",
    add: "",
    email: "",
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
      const inputData = normalizeCardData(inputsValue);
      const joiResponse = validateCard(inputData);
      setErrorsState(joiResponse);
      if (joiResponse) return;

      const request = normalizeCardData(inputsValue);

      await axios.put(`/cards/${id}`, request);
      toast.success("Card updated successesfuly!", {
        position: "top-center",
        autoClose: 5000,
        closeOnClick: true,
      });
      navigate(ROUTES.MYCARDS);
    } catch (err) {
      toast.error("Only Admin or the card creator can do this!", {
        toastId: "editCard",
      });
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <ContainerComp>
      <Typography component="h2" variant="h2" color="primary">
        Edit Card
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
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Button
          type="submit"
          color="error"
          variant="contained"
          onClick={handleCancel}
          sx={{ mt: 2 }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          onClick={handleUpdateChangesClick}
          sx={{ mt: 2 }}
        >
          Update Card Settings
        </Button>
      </Box>
    </ContainerComp>
  );
};
export default EditCardPage;
