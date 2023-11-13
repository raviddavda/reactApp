import { Divider, Grid, Pagination, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const query = useQueryParams();
  const itemsPerPage = 3;

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        if (userData) data = homePageNormalization(data, userData._id);
        console.log("data", data);
        initDataFromServer = data;
        setDataFromServer(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      })
      .catch((error) => {
        console.log("error:", error);
      });
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = dataFromServer.slice(startIndex, endIndex);

  const handlePageChange = (event, selectedPage) => {
    setCurrentPage(selectedPage);
  };

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
      .delete(`/cards/${_id}`)
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditCard = (_id) => {
    console.log("to edit", _id);
    navigate(`${ROUTES.CARDEDIT}/${_id}`);
  };

  const handleFavCard = async (_id) => {
    await axios
      .patch(`/cards/${_id}`)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      <Typography color="primary" variant="h2" component="h2">
        Welcome to BCard!
      </Typography>
      <Typography variant="h5" component="h5">
        Brows, like, and create cards to advertise you business and much more!
      </Typography>
      <Divider sx={{ m: 2 }} />
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 10,
        }}
      >
        {subset.map((card) => (
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
              onDeleteCard={handleDeleteCard}
              onEditCard={handleEditCard}
              onFavCard={handleFavCard}
            />
          </Grid>
        ))}
      </Grid>
      <Pagination
        sx={{
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 10,
        }}
        size="large"
        color="primary"
        shape="rounded"
        variant="outlined"
        siblingCount={1}
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
    </Fragment>
  );
};

export default HomePage;
