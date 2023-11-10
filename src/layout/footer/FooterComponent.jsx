import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import { useState } from "react";
import nextKey from "generate-my-key";
import NavLinkComponent from "../header/NavLink";
import myLinks from "../myLinks";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import InfoIcon from "@mui/icons-material/Info";
import { NavLink } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const FooterComponent = () => {
  const [value, setValue] = useState(0);

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: "0",
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {/* {myLinks.map((links) => (
          <NavLinkComponent
            key={nextKey()}
            to={links.to}
            style={{ padding: "1%" }}
          >
            {links.children}
          </NavLinkComponent>
        ))} */}
        <BottomNavigationAction
          component={NavLink}
          to={ROUTES.ABOUT}
          label="About"
          icon={<InfoIcon />}
        />
      </BottomNavigation>
    </Box>
  );
};
export default FooterComponent;
