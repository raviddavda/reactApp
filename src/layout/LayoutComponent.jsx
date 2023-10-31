import React, { useState } from "react";
import HeaderComponent from "./header/HeaderComponent";
import FooterComponent from "./footer/FooterComponent";
import Main from "./main/Main";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import tmc from "twin-moon-color";

const LayoutComponent = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const themes = tmc({
    "text.headerColor": "#9d00ff",
    "text.headerActive": "#9e165c",
  });
  // console.log("themes", themes);
  // const themes = tmc({ primary: "#00FF00", elisheva: "#FF0000" });

  const darkTheme = createTheme(themes.dark);
  const lightTheme = createTheme(themes.light);

  const handleThemeChange = (checked) => {
    setIsDarkTheme(checked);
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <HeaderComponent
        isDarkTheme={isDarkTheme}
        onThemeChange={handleThemeChange}
      />
      <Main>{children}</Main>
      <FooterComponent />
    </ThemeProvider>
  );
};

export default LayoutComponent;
