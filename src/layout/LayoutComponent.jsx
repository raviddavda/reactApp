import HeaderComponent from "./header/HeaderComponent";
import FooterComponent from "./footer/FooterComponent";
import Main from "./main/Main";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import tmc from "twin-moon-color";
import { darkThemeActions } from "../store/theme";
import TabsComp from "./header/TabsComp";
import { useDispatch, useSelector } from "react-redux";

const LayoutComponent = ({ children }) => {
  const isDarkTheme = useSelector((bigPie) => bigPie.themeSlice.darkTheme);
  const dispatch = useDispatch();

  const themes = tmc();

  const darkTheme = createTheme(themes.dark);
  const lightTheme = createTheme(themes.light);

  const handleThemeChange = (checked) => {
    dispatch(darkThemeActions.changeTheme());
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <HeaderComponent
        isDarkTheme={isDarkTheme}
        onThemeChange={handleThemeChange}
      />
      {/* <TabsComp /> */}
      <Main>{children}</Main>
      <FooterComponent />
    </ThemeProvider>
  );
};

export default LayoutComponent;
