import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Drawer,
  Typography,
} from "@mui/material";
import { alwaysLinks, loggedInLinks, notLoggedInLinks } from "../../myLinks";
import { useSelector } from "react-redux";

const LeftDrawerComponent = ({ isOpen, onCloseDrawer }) => {
  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);
  const list = () => (
    <Box
      sx={{ width: { auto: 250 } }}
      role="presentation"
      onClick={onCloseDrawer}
      onKeyDown={onCloseDrawer}
    >
      <Box p={1}>
        <Typography variant="h6">BCard</Typography>
      </Box>
      <Divider />
      <List>
        {alwaysLinks.map((links, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton to={links.to}>
              <ListItemText primary={links.children} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {loggedIn &&
          loggedInLinks.map((links, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton to={links.to}>
                <ListItemText primary={links.children} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <Divider />
      <List>
        {!loggedIn &&
          notLoggedInLinks.map((links, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton to={links.to}>
                <ListItemText primary={links.children} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );
  return (
    <Drawer anchor="left" open={isOpen} onClose={onCloseDrawer}>
      {list()}
    </Drawer>
  );
};

export default LeftDrawerComponent;
