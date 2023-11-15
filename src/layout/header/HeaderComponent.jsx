import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Switch } from "@mui/material";
import Links from "./ui/Links";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SearchComp from "./ui/SearchComp";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import LeftDrawerComponent from "./ui/LeftDrawerComponent";

const HeaderComponent = ({ isDarkTheme, onThemeChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    handleMenuClose();
    localStorage.clear();
    sessionStorage.clear();
    dispatch(authActions.logout());
    navigate(ROUTES.LOGIN);
  };

  const handleProfileBtn = () => {
    handleMenuClose();
    navigate(ROUTES.PROFILE);
  };

  const handleThemeChange = (event) => {
    onThemeChange(event.target.checked);
  };

  const handleOpenDrawerClick = () => {
    setIsOpen(true);
  };
  const handleCloseDrawerClick = () => {
    setIsOpen(false);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileBtn}>Profile</MenuItem>
      <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, mb: 10 }}>
      <AppBar position="fixed">
        <Toolbar sx={{ alignItems: "center" }}>
          <IconButton
            sx={{ display: { xs: "block", md: "none" } }}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleOpenDrawerClick}
          >
            <MenuIcon />
          </IconButton>
          <LeftDrawerComponent
            isOpen={isOpen}
            onCloseDrawer={handleCloseDrawerClick}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            to={ROUTES.HOME}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            BCard
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Links />
          </Box>
          <SearchComp />
          <Box sx={{ flexGrow: 1 }} />
          <LightModeIcon color="secondary" />
          <Switch checked={isDarkTheme} onChange={handleThemeChange} />
          <DarkModeIcon color="secondary" />
          <Box sx={{ display: "flex" }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
};

export default HeaderComponent;
