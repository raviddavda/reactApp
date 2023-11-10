import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CardPage = () => {
  const [load, setLoad] = useState(false);
  const [dataFromServer, setDataFromServer] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/cards/${id}`)
      .then(({ data }) => {
        setDataFromServer(data);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoad(true);
      });
  }, [id]);

  return (
    <Container
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {load ? (
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            p: 2,
          }}
        >
          <Box>
            <img
              style={{ width: "500px" }}
              src={dataFromServer.image.url}
              alt={dataFromServer.image.alt}
            />
          </Box>
          <Box>
            <Typography variant="h2" color="primary">
              {dataFromServer.title}
            </Typography>
            <Typography variant="h4" color="primary">
              {dataFromServer.subtitle}
            </Typography>
            <Typography>{dataFromServer.description}</Typography>
            <Typography>Email: {dataFromServer.email}</Typography>
            <Typography>Phone: {dataFromServer.phone}</Typography>
            <Typography>Created at: {dataFromServer.createdAt}</Typography>
            <Typography>
              Adress: {dataFromServer.address.country},{" "}
              {dataFromServer.address.city}, {dataFromServer.address.street},{" "}
              {dataFromServer.address.houseNumber}
            </Typography>
            <Typography>{dataFromServer.likes.length} Likes</Typography>
            <Typography>Card ID: {dataFromServer._id}</Typography>
          </Box>
        </Paper>
      ) : (
        <CircularProgress />
      )}
    </Container>
  );
};

export default CardPage;
