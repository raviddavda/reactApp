import { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Divider, Button } from "@mui/material";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

const DataTable = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const navigate = useNavigate();

  const userFetch = () => {
    axios
      .get("/users")
      .then(({ data }) => {
        setDataFromServer(data);
      })
      .catch((error) => {
        toast.error("Could not fetch users!", { toasId: "fetch" });
      });
  };

  useEffect(() => {
    userFetch();
  }, []);

  const columns = [
    {
      field: "image",
      headerName: "",
      renderCell: (params) => (
        <Avatar
          src={params.value}
          style={{ width: 40, height: 40, borderRadius: "50%" }}
        />
      ),
    },
    { field: "email", headerName: "Email", width: 220 },
    { field: "first", headerName: "First name", width: 220 },
    { field: "last", headerName: "Last name", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
    {
      field: "useredit",
      headerName: "Edit User",
      width: 150,
      renderCell: (params) => (
        <Button
          onClick={() => {
            handleEditClick(params);
          }}
          startIcon={<EditIcon />}
        />
      ),
    },
    {
      field: "deleteuser",
      headerName: "Delete User",
      width: 150,
      renderCell: (params) => (
        <Button
          onClick={() => {
            handleDeleteUser(params);
          }}
          startIcon={<DeleteIcon color="heart" />}
        />
      ),
    },
  ];

  const rows = dataFromServer.map((user) => ({
    id: user._id,
    image: user.image.url,
    email: user.email,
    first: user.name.first,
    last: user.name.last,
    phone: user.phone,
  }));

  const handleEditClick = ({ id }) => {
    navigate(`${ROUTES.PROFILEEDIT}/${id}`);
  };

  const handleDeleteUser = async ({ id }) => {
    try {
      await axios.delete(`/users/${id}`);
      toast.success("User Deleted!", { toastId: "delete" });
      userFetch();
    } catch (error) {
      console.log(id);
      toast.error("Could not fetch user!", { toastId: "user" });
    }
  };

  return (
    <Fragment>
      <Typography color="primary" variant="h2" component="h2">
        Sandbox
      </Typography>
      <Typography variant="h5" component="h5">
        In this panel you can manage other users.
      </Typography>
      <Divider sx={{ m: 2 }} />
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
      />
    </Fragment>
  );
};

export default DataTable;
