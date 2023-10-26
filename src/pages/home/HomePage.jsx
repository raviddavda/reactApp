import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import nextKey from "generate-my-key";
import CardComponent from "../../components/CardComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../routes/ROUTES";

const HomePage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        console.log("data", data);
        setDataFromServer(data);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  }, []);

  const handleDeleteCard = (_id) => {
    console.log("to del", _id);
    setDataFromServer((currentState) =>
      currentState.filter((card) => card._id !== _id)
    );
  };
  const handleEditCard = (_id) => {
    console.log("to edit", _id);
    navigate(`${ROUTES.CARDEDIT}/${_id}`);
  };
  const handleFavCard = (_id) => {
    console.log("to fav", _id);
  };

  const handleCreateCard = () => {
    navigate(ROUTES.CARDCREATE);
  };

  return (
    <Grid container spacing={2}>
      {dataFromServer.map((card) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={nextKey()}>
          <CardComponent
            _id={card._id}
            title={card.title}
            subtitle={card.subtitle}
            phone={card.phone}
            address={`${card.address.city}, ${card.address.street} ${card.address.houseNumber}`}
            img={card.image.url}
            alt={card.image.alt}
            cardNum={card.cardNumber}
            onDeleteCard={handleDeleteCard}
            onEditCard={handleEditCard}
            onFavCard={handleFavCard}
          />
        </Grid>
      ))}
      <Button onClick={handleCreateCard}>Add New Card</Button>
    </Grid>
  );
};

export default HomePage;
