import React, { useState } from "react";
import HeaderComponent from "./header/HeaderComponent";
import FooterComponent from "./footer/FooterComponent";
import Main from "./main/Main";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const LayoutComponent = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

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
