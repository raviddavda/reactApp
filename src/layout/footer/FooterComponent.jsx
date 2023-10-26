import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import { useState } from "react";
import Links from "../Links";
import nextKey from "generate-my-key";
import NavLinkComponent from "../header/NavLink";

const FooterComponent = () => {
  const [value, setValue] = useState(0);

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: "1px solid #999",
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {Links.map((links) => (
          <NavLinkComponent
            key={nextKey()}
            to={links.to}
            style={{ padding: "1%" }}
          >
            {links.children}
          </NavLinkComponent>
        ))}
      </BottomNavigation>
    </Box>
  );
};
export default FooterComponent;
