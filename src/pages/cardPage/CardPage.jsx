import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";
import ContainerComp from "../../components/ContainerComp";

const CardPage = () => {
  const [dataFromServer, setDataFromServer] = useState("");
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/cards/${id}`)
      .then(({ data }) => {
        setDataFromServer(data);
      })
      .catch((error) =>
        toast.error("Could not fetch card!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          theme: localStorage.getItem("darkMode") ? "dark" : "light",
          toastId: "card",
        })
      );
  }, [id]);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ContainerComp>
      {dataFromServer ? (
        <>
          <Box>
            <Typography color="primary" variant="h2" component="h2">
              {dataFromServer.title}
            </Typography>
            <Typography color="primary" variant="h5" component="h5">
              {dataFromServer.subtitle}
            </Typography>
          </Box>
          <Divider sx={{ m: 2 }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column-reverse" },
              justifyContent: "space-between",
              alignItems: "start",
              m: 1,
            }}
          >
            <Box>
              <Typography variant="h6">
                Description:{" "}
                <Typography>{dataFromServer.description}</Typography>
              </Typography>
              <Typography variant="h6">
                Email: <Typography>{dataFromServer.email}</Typography>
              </Typography>
              <Typography variant="h6">
                Phone: <Typography>{dataFromServer.phone}</Typography>
              </Typography>
              <Typography variant="h6">
                Date Created:{" "}
                <Typography>{dataFromServer.createdAt}</Typography>
              </Typography>
              <Typography variant="h6">
                Adress:{" "}
                <Typography>
                  {dataFromServer.address.country},{" "}
                  {dataFromServer.address.city}, {dataFromServer.address.street}
                  , {dataFromServer.address.houseNumber}
                </Typography>
              </Typography>
              <Typography variant="h6">
                Likes: <Typography>{dataFromServer.likes.length}</Typography>
              </Typography>
              <Typography variant="h6">
                Card ID: <Typography>{dataFromServer._id}</Typography>
              </Typography>
              <Typography variant="h6">
                Created By: <Typography>{dataFromServer.user_id}</Typography>
              </Typography>
            </Box>
            <Box
              sx={{
                width: { md: "30%", xs: "100%" },
                display: "flex",
                justifyContent: { xs: "center" },
              }}
            >
              <img
                style={{ maxWidth: "450px", minWidth: "200px" }}
                src={dataFromServer.image.url}
                alt={dataFromServer.image.alt}
              />
            </Box>
          </Box>
          <Button
            sx={{ m: 1 }}
            component={Link}
            to={`${ROUTES.CARDEDIT}/${id}`}
            variant="contained"
          >
            Edit card
          </Button>
          <Button
            sx={{ m: 1 }}
            color="error"
            variant="contained"
            onClick={handleClickOpen}
          >
            Delete card
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Delete Card?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This cannot be undone, are you sure you want to delete this
                card?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                CANCEL
              </Button>
              <Button color="error" onClick={handleDeleteCard}>
                DELETE
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <CircularProgress />
      )}
    </ContainerComp>
  );
};

export default CardPage;
