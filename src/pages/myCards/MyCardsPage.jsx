import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CardComponent from "../../components/CardComponent";
import axios from "axios";
import ROUTES from "../../routes/ROUTES";
import { useNavigate } from "react-router-dom";

const MyCardsPage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/cards/my-cards")
      .then(({ data }) => {
        setDataFromServer(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleEditCard = (_id) => {
    console.log("to edit", _id);
    navigate(`${ROUTES.CARDEDIT}/${_id}`);
  };

  const handleDeleteCard = async (_id) => {
    console.log("to del", _id);
    await axios
      .delete("/cards", _id)
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box>
      <Typography variant="h2" component="h2" color="primary" sx={{ mb: 2 }}>
        My Cards
      </Typography>
      <Grid container spacing={2}>
        {dataFromServer.length === 0 && (
          <Typography>you have not created any cards</Typography>
        )}
        {dataFromServer.map((card) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={card._id}>
            <CardComponent
              _id={card._id}
              title={card.title}
              subtitle={card.subtitle}
              address={`${card.address.city}, ${card.address.street} ${card.address.houseNumber}`}
              img={card.image.url}
              alt={card.image.alt}
              cardNum={card.cardNumber}
              onEditCard={handleEditCard}
              onDeleteCard={handleDeleteCard}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyCardsPage;
