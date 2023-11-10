import { Button, Grid } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import CardComponent from "../../components/CardComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../routes/ROUTES";
import useQueryParams from "../../hooks/useQueryParams";
import { useSelector } from "react-redux";
import homePageNormalization from "./HomePageNormalize";
import ReactPaginate from "react-paginate";

let initDataFromServer = [];

const HomePage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const query = useQueryParams();
  const itemsPerPage = 7;

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
  }, [userData]);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = dataFromServer.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
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
      .delete("/cards", _id)
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditCard = (_id) => {
    console.log("to edit", _id);
    navigate(`${ROUTES.CARDEDIT}/${_id}`);
  };

  const handleCreateCard = () => {
    navigate(ROUTES.CARDCREATE);
  };

  const handleFavCard = async (_id) => {
    console.log(userData);
    await axios
      .patch("/cards", userData)
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
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
        <Button onClick={handleCreateCard}>Add New Card</Button>
      </Grid>
      <ReactPaginate
        nextLabel=">>"
        breakLabel="..."
        onPageChange={handlePageChange}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </Fragment>
  );
};

export default HomePage;
