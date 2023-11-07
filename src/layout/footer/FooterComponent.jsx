import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import { useState } from "react";
import nextKey from "generate-my-key";
import NavLinkComponent from "../header/NavLink";
import myLinks from "../myLinks";
import { useNavigate } from "react-router-dom";

const FooterComponent = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

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
        {myLinks.map((links) => (
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
