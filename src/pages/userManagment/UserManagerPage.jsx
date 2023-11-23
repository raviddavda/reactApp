import { useEffect } from "react";
import axios from "axios";
import { Container } from "@mui/material";

const UserManagerPage = () => {
  useEffect(() => {
    axios
      .get("/users")
      .then(({ data }) => console.log(data))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return <Container>huiohiuh</Container>;
};

export default UserManagerPage;
