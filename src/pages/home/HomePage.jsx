import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import nextKey from "generate-my-key";
import CardComponent from "../../components/CardComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../routes/ROUTES";
import useQueryParams from "../../hooks/useQueryParams";
import { useSelector } from "react-redux";
import homePageNormalization from "./HomePageNormalize";

let initDataFromServer = [];

const HomePage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const navigate = useNavigate();
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const query = useQueryParams();

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        if (userData) data = homePageNormalization(data, userData._id);
        console.log("data", data);
        console.log("userData", userData);
        initDataFromServer = data;
        setDataFromServer(data);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  }, [userData]);

  useEffect(() => {
    if (!initDataFromServer.length) return;
    const filter = query.filter ? query.filter : "";
    setDataFromServer(
      initDataFromServer.filter((card) => card.title.startsWith(filter))
    );
  }, [query]);

  const handleDeleteCard = async (_id) => {
    console.log("to del", _id);
    await axios
      .delete("/cards", _id)
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
      });

    // setDataFromServer((currentState) =>
    //   currentState.filter((card) => card._id !== _id)
    // );
  };

  const handleEditCard = (_id) => {
    console.log("to edit", _id);
    navigate(`${ROUTES.CARDEDIT}/${_id}`);
  };

  const handleCreateCard = () => {
    navigate(ROUTES.CARDCREATE);
  };

  const handleFavCard = async (_id) => {
    console.log(userData._id);
    await axios
      .patch("/cards", userData._id)
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
      });
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
            like={card.likes}
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
