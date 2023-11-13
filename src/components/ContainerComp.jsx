import { Box, Container } from "@mui/material";
import React from "react";

const ContainerComp = ({ children }) => {
  return (
    <Container
      sx={{
        height: "50rem",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "70%",
          display: "flex",
          flexDirection: "column",
          padding: "3%",
          borderRadius: "10px",
          boxShadow: "0 0 15px 5px rgba(211, 211, 211, .7)",
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default ContainerComp;
