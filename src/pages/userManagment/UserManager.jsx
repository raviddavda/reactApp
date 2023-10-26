import { Box } from "@mui/material";
import React, { useState } from "react";
import UsersComponent from "./UsersComponent";
import nextKey from "generate-my-key";

const users = [
  {
    id: "1",
    userName: "Ravid Davda",
  },
  {
    id: "2",
    userName: "Moti",
  },
  {
    id: "3",
    userName: "Donald Trump",
  },
];

const UserManager = () => {
  const [userState, setUserState] = useState(users);
  const handleDelete = (id) => {
    setUserState((currentState) =>
      currentState.filter((user) => user.id !== id)
    );
  };

  return (
    <Box>
      {userState.map((user) => (
        <Box
          key={nextKey()}
          sx={{
            width: "30%",
            display: "flex",
            border: "1px solid black",
            textAlign: "start",
            justifyContent: "space-between",
            p: 1,
          }}
        >
          <UsersComponent
            id={user.id}
            userName={user.userName}
            onDelete={handleDelete}
          />
        </Box>
      ))}
    </Box>
  );
};

export default UserManager;
