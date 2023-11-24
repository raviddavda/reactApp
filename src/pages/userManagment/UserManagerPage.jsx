import { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Divider } from "@mui/material";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const DataTable = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/users")
      .then(({ data }) => {
        setDataFromServer(data);
      })
      .catch((error) => {
        console.log(error);
      });
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
      field: "isBusiness",
      headerName: "Business Account",
      width: 160,
      renderCell: (params) =>
        params.value ? (
          <CheckCircleIcon color="tick" />
        ) : (
          <CancelIcon color="heart" />
        ),
    },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 150,
      renderCell: (params) =>
        params.value ? (
          <CheckCircleIcon color="tick" />
        ) : (
          <CancelIcon color="heart" />
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
    isBusiness: user.isBusiness,
    isAdmin: user.isAdmin,
  }));

  const handleRowClick = ({ id }) => {
    navigate(`${ROUTES.PROFILE}/${id}`);
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
        onRowClick={handleRowClick}
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
