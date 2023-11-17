import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { NavLink } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { BottomNavigationAction, Divider, Typography } from "@mui/material";
import { alwaysLinks } from "../myLinks";

const FooterComponent = () => {
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      {alwaysLinks.map((link, index) => (
        <NavLink key={index} to={link.to}>
          {link.children}
        </NavLink>
      ))}
    </BottomNavigation>
  );
};
export default FooterComponent;
