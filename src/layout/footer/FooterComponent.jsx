import { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ROUTES from "../../routes/ROUTES";
import { NavLink } from "react-router-dom";

export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          component={NavLink}
          to={ROUTES.HOME}
          label="Home"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          component={NavLink}
          to={ROUTES.FAVCARDS}
          label="Favorites"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          component={NavLink}
          to={ROUTES.ABOUT}
          label="About"
          icon={<InfoIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
