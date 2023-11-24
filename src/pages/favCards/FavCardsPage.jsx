import { Divider, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import homePageNormalization from "../home/HomePageNormalize";
import CardComponent from "../../components/CardComponent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const FavCardsPage = () => {
  const [cards, setCards] = useState([]);
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        homePageNormalization(data, userData._id);
        setCards(data);
      })
      .catch((error) => {
        toast.error("Could not fetch cards!", { toastId: "cardPage" });
      });
  }, [userData._id]);

  const handleEditCard = (_id) => {
    navigate(`${ROUTES.CARDEDIT}/${_id}`);
  };

  const handleDeleteCard = async (_id) => {
    await axios
      .delete(`/cards/${_id}`)
      .then((response) => {})
      .catch((error) => {
        toast.error("Only Admin or the card creator can do this!", {
          toastId: "delete",
        });
      });
  };

  const handleFavCard = async (_id) => {
    await axios
      .patch(`/cards/${_id}`)
      .then((response) => {})
      .catch((error) => {
        toast.error("Could not fetch cards!", { toastId: "fav" });
      });
  };

  const handlePhoneClick = (_id) => {
    cards.map((card) =>
      card._id === _id ? window.open(`tel:${card.phone}`) : ""
    );
  };

  return (
    <Fragment>
      <Typography variant="h2" component="h2" color="primary">
        Favourite Cards
      </Typography>
      <Typography variant="h5" component="h5">
        Here will be displayed all the cards you liked.
      </Typography>
      <Divider sx={{ m: 2 }} />
      <Grid container spacing={2}>
        {cards.filter((card) => card.likes).length ? (
          cards
            .filter((card) => card.likes)
            .map((card) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={card._id}>
                <CardComponent
                  _id={card._id}
                  title={card.title}
                  subtitle={card.subtitle}
                  phone={card.phone}
                  address={`${card.address.city}, ${card.address.street} ${card.address.houseNumber}`}
                  img={card.image.url}
                  alt={card.image.alt}
                  like={card.likes}
                  cardNum={card.cardNumber}
                  onCallCard={handlePhoneClick}
                  onDeleteCard={handleDeleteCard}
                  onEditCard={handleEditCard}
                  onFavCard={handleFavCard}
                />
              </Grid>
            ))
        ) : (
          <Typography m={2} variant="h5">
            You have not liked any cards, To like a card press the{" "}
            <FavoriteIcon color="heart" /> icon.
          </Typography>
        )}
      </Grid>
    </Fragment>
  );
};

export default FavCardsPage;
