import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { NavLink } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { Typography } from "@mui/material";

const FooterComponent = () => {
  const [value, setValue] = useState(0);

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: "0",
        border: "1px solid black",
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <NavLink to={ROUTES.ABOUT} style={{ textDecoration: "none" }}>
          {({ isActive }) => (
            <Typography
              color={isActive ? "secondary" : "primary"}
              sx={{ p: 2 }}
            >
              About
            </Typography>
          )}
        </NavLink>
      </BottomNavigation>
    </Box>
  );
};
export default FooterComponent;
