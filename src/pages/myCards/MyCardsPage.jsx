import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import CardComponent from "../../components/CardComponent";
import axios from "axios";
import ROUTES from "../../routes/ROUTES";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyCardsPage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/cards/my-cards")
      .then(({ data }) => {
        setDataFromServer(data);
      })
      .catch((error) =>
        toast.error("Could not fetch cards!", { toastId: "fetch" })
      )
      .finally(() => {
        setLoad(true);
      });
  }, []);

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
    dataFromServer.map((card) =>
      card._id === _id ? window.open(`tel:${card.phone}`) : ""
    );
  };

  return (
    <Box>
      <Typography variant="h2" component="h2" color="primary" sx={{ mb: 2 }}>
        My Cards
      </Typography>
      <Typography variant="h5" component="h5">
        Here are all the cards you created.
      </Typography>
      <Divider sx={{ m: 2 }} />
      {load ? (
        <Grid container spacing={2}>
          {dataFromServer.length === 0 && (
            <Typography m={2} variant="h5">
              You have not created any cards.
            </Typography>
          )}
          {dataFromServer.map((card) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={card._id}>
              <CardComponent
                _id={card._id}
                title={card.title}
                phone={card.phone}
                subtitle={card.subtitle}
                address={`${card.address.city}, ${card.address.street} ${card.address.houseNumber}`}
                img={card.image.url}
                alt={card.image.alt}
                cardNum={card.cardNumber}
                onCallCard={handlePhoneClick}
                onDeleteCard={handleDeleteCard}
                onEditCard={handleEditCard}
                onFavCard={handleFavCard}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <CircularProgress />
      )}
      <Typography variant="h5">
        Click{" "}
        <Typography
          variant="h5"
          color="primary"
          component={NavLink}
          to={ROUTES.CARDCREATE}
        >
          here
        </Typography>{" "}
        to create a card.
      </Typography>
    </Box>
  );
};

export default MyCardsPage;
