import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const UsersComponent = ({ id, userName, onDelete }) => {
  const handleDeleteUser = () => {
    onDelete(id);
  };
  return (
    <Box>
      <Box>
        <Typography>{userName}</Typography>
      </Box>
      <IconButton onClick={handleDeleteUser}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default UsersComponent;
