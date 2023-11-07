import { Box } from "@mui/material";
import React from "react";
import NavLinkComponent from "../NavLink";
import nextKey from "generate-my-key";
import { alwaysLinks, loggedInLinks, notLoggedInLinks } from "../../myLinks";
import { useSelector } from "react-redux";

const Links = () => {
  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);
  return (
    <Box sx={{ display: { xs: "none", md: "flex" } }}>
      {alwaysLinks.map((links) => (
        <NavLinkComponent key={nextKey()} to={links.to}>
          {links.children}
        </NavLinkComponent>
      ))}

      {loggedIn &&
        loggedInLinks.map((links) => (
          <NavLinkComponent key={nextKey()} to={links.to}>
            {links.children}
          </NavLinkComponent>
        ))}

      {!loggedIn &&
        notLoggedInLinks.map((links) => (
          <NavLinkComponent key={nextKey()} to={links.to}>
            {links.children}
          </NavLinkComponent>
        ))}
    </Box>
  );
};

export default Links;
