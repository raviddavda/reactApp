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
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import ContainerComp from "../../components/ContainerComp";
import { authActions } from "../../store/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const ProfilePage = () => {
  const [load, setLoad] = useState(false);
  const [dataFromServer, setDataFromServer] = useState([]);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/users/${id}`)
      .then(({ data }) => {
        setDataFromServer(data);
      })
      .catch((error) => {
        toast.error("Could not fetch account!", { toastId: "profile" });
      })
      .finally(() => {
        setLoad(true);
      });
  }, []);

  const handleDeleteUser = async () => {
    try {
      const { data } = await axios.delete(`/users/${id}`);
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      dispatch(authActions.logout());
      navigate(ROUTES.HOME);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ContainerComp>
      {load ? (
        <>
          <Box sx={{ display: "flex", gap: "1%" }}>
            <Typography color="primary" variant="h2" component="h2">
              {dataFromServer.name.first} {dataFromServer.name.middle}{" "}
              {dataFromServer.name.last}
            </Typography>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              m: 1,
            }}
          >
            <Box>
              <Typography variant="h6">
                Email: <Typography>{dataFromServer.email}</Typography>
              </Typography>
              <Typography variant="h6">
                Date Created:{" "}
                <Typography>{dataFromServer.createdAt}</Typography>
              </Typography>
              <Typography variant="h6">
                Phone: <Typography>{dataFromServer.phone}</Typography>
              </Typography>
              <Typography variant="h6">
                Address:{" "}
                <Typography>
                  {dataFromServer.address.state},{" "}
                  {dataFromServer.address.country},{" "}
                  {dataFromServer.address.street},{" "}
                  {dataFromServer.address.houseNumber},{" "}
                  {dataFromServer.address.zip}{" "}
                </Typography>
              </Typography>
              <Typography component="span">
                {dataFromServer.isAdmin ? <Typography>Admin</Typography> : ""}
              </Typography>
              <Typography component="span">
                {dataFromServer.isBusiness ? (
                  <Typography variant="h6">
                    Account Level: <Typography>Business Account</Typography>
                  </Typography>
                ) : (
                  "Guest Account"
                )}
              </Typography>
              <Typography variant="h6">
                Account ID: <Typography>{dataFromServer._id}</Typography>
              </Typography>
            </Box>
            <Box>
              <img
                style={{ width: "250px" }}
                src={dataFromServer.image.url}
                alt={dataFromServer.image.alt}
              />
            </Box>
          </Box>
          <Button
            sx={{ m: 1 }}
            component={Link}
            to={`${ROUTES.PROFILEEDIT}/${id}`}
            variant="contained"
          >
            Edit user
          </Button>
          <Button
            sx={{ m: 1 }}
            color="error"
            variant="contained"
            onClick={handleClickOpen}
          >
            Delete user
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Delete User?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This cannot be undone, are you sure you want to delete this
                user?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                CANCEL
              </Button>
              <Button color="error" onClick={handleDeleteUser}>
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

export default ProfilePage;
