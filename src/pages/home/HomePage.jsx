import { Divider, Grid, Pagination, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import CardComponent from "../../components/CardComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../routes/ROUTES";
import useQueryParams from "../../hooks/useQueryParams";
import { useSelector } from "react-redux";
import homePageNormalization from "./HomePageNormalize";
import { toast } from "react-toastify";

let initDataFromServer = [];

const HomePage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [like, setLike] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const query = useQueryParams();
  const itemsPerPage = 3;

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        if (userData) data = homePageNormalization(data, userData._id);
        initDataFromServer = data;
        setDataFromServer(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      })
      .catch((error) => {
        toast.error("Could not fetch cards!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          theme: localStorage.getItem("darkMode") ? "dark" : "light",
          toastId: "cards",
        });
      });
  }, [userData]);

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
    await axios
      .delete(`/cards/${_id}`)
      .then((response) => {})
      .catch((error) => {
        toast.error("Only Admin or the card creator can do this!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          theme: localStorage.getItem("darkMode") ? "dark" : "light",
          toastId: "delete",
        });
      });
  };

  const handleEditCard = (_id) => {
    navigate(`${ROUTES.CARDEDIT}/${_id}`);
  };

  const handleFavCard = async (_id) => {
    await axios
      .patch(`/cards/${_id}`)
      .then(({ data }) => {
        setLike(!like);
      })
      .catch((error) => {
        toast.error("Log in to like a card!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          theme: localStorage.getItem("darkMode") ? "dark" : "light",
          toastId: "fav",
        });
      });
  };

  const handlePhoneClick = (_id) => {
    dataFromServer.map(
      (card) => card._id === _id && window.open(`tel:${card.phone}`)
    );
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
        spacing={5}
        sx={{
          mb: 10,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {subset.map((card) => (
          <Grid item xs={12} md={4} key={card._id}>
            <CardComponent
              _id={card._id}
              title={card.title}
              subTitle={card.subtitle}
              phone={card.phone}
              address={`${card.address.city}, ${card.address.street} ${card.address.houseNumber}`}
              img={card.image.url}
              alt={card.image.alt}
              like={card.likes}
              email={card.email}
              onCallCard={handlePhoneClick}
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
