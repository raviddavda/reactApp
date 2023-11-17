import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const ProfilePage = () => {
  const [load, setLoad] = useState(false);
  const [dataFromServer, setDataFromServer] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`/users/${id}`)
      .then(({ data }) => {
        console.log("response", data);
        setDataFromServer(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoad(true);
      });
  }, []);
  return (
    <Box>
      {load ? (
        <Box>
          <Box>
            <img
              style={{ width: "200px" }}
              src={dataFromServer.image.url}
              alt={dataFromServer.image.alt}
            />
          </Box>
          <Typography>Name: {dataFromServer.name.first}</Typography>
          <Typography>Middle Name: {dataFromServer.name.middle}</Typography>
          <Typography>Last Name: {dataFromServer.name.last}</Typography>
          <Typography>Email: {dataFromServer.email}</Typography>
          <Typography>Date Created: {dataFromServer.createdAt}</Typography>
          <Typography>Phone: {dataFromServer.phone}</Typography>
          <Typography>
            Address: {dataFromServer.address.state},{" "}
            {dataFromServer.address.country}, {dataFromServer.address.street},{" "}
            {dataFromServer.address.houseNumber}, {dataFromServer.address.zip}{" "}
          </Typography>
          <Typography component="span">
            {dataFromServer.isAdmin ? <Typography>Admin</Typography> : ""}
          </Typography>
          <Typography component="span">
            {dataFromServer.isBusiness ? (
              <Typography>Account Level: Business Account</Typography>
            ) : (
              "Guest Account"
            )}
          </Typography>
          <Typography>Account ID: {dataFromServer._id}</Typography>
          <Button
            component={Link}
            to={`${ROUTES.PROFILEEDIT}/${id}`}
            variant="contained"
          >
            Edit user
          </Button>
        </Box>
      ) : (
        "loading"
      )}
    </Box>
  );
};

export default ProfilePage;
