import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  MenuList,
  Menu,
  Switch,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SearchComp from "./ui/SearchComp";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import TabsRouter from "./ui/TabsComp";

const HeaderComponent = ({ isDarkTheme, onThemeChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
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
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    dispatch(authActions.logout());
    navigate(ROUTES.LOGIN);
    window.location.reload();
  };

  const handleProfileBtn = () => {
    handleMenuClose();
    navigate(`${ROUTES.PROFILE}/${userData._id}`);
  };

  const handleThemeChange = (event) => {
    onThemeChange(event.target.checked);
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
      {userData ? (
        <MenuList>
          <MenuItem onClick={handleProfileBtn}>Profile</MenuItem>
          <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
        </MenuList>
      ) : (
        <MenuItem
          onClick={() => {
            handleMenuClose();
            navigate(ROUTES.LOGIN);
          }}
        >
          Login
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, mb: 15 }}>
      <AppBar position="fixed">
        <Toolbar sx={{ alignItems: "center" }}>
          <Typography
            component={Link}
            variant="h6"
            to={ROUTES.HOME}
            color="inherit"
            sx={{ textDecoration: "none", pr: 1 }}
          >
            BCard
          </Typography>
          <SearchComp />
          <Box sx={{ flexGrow: 1 }} />
          <LightModeIcon color="inherit" />
          <Switch checked={!!isDarkTheme} onChange={handleThemeChange} />
          <DarkModeIcon color="inherit" />
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
              <AccountCircle color="inherit" />
            </IconButton>
          </Box>
        </Toolbar>
        <TabsRouter />
      </AppBar>
      {renderMenu}
    </Box>
  );
};

export default HeaderComponent;
