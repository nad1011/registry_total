import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import items from "./ItemInfor";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import UserInfo from "../UserInfo/UserInfo";
import { NavbarContext } from "../../contexts/NavbarContext";

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [userInfoOpen, setUserInfoOpen] = React.useState(false);
  const { open, changeOpen } = React.useContext(NavbarContext);
  const drawerWidth = 180;
  const nonDrawerWidth = 65;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const popUpUserInfo = () => {
    setUserInfoOpen(!userInfoOpen);
  };
  const handleDrawer = () => {
    changeOpen();
  };

  const drawer = (
    <>
      <Toolbar
        sx={{
          minHeight: { sm: "45px", md: "50px" },
          marginLeft: open ? 13 : -1.5,
          transition: "all 0.3s ease",
        }}
      >
        <IconButton
          onClick={handleDrawer}
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List
        sx={{
          height: 1,
        }}
      >
        {items.map((item, index) => (
          <ListItem key={index} disablePadding sx={{}}>
            <Link
              to={item.path}
              style={{ textDecoration: "none", width: "100%" }}
            >
              <ListItemButton
                sx={{
                  transition: "0.3s",
                  pl: open ? 2.5 : 1,
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} sx={{ color: "#757575" }} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List sx={{ p: 0 }}>
        <ListItem
          sx={{
            p: 0,
            hover: "none",
          }}
        >
          <ListItemButton
            onClick={popUpUserInfo}
            sx={{ transition: "0.3s", pl: open ? 4.5 : 1.5 }}
          >
            <ListItemIcon>
              <Avatar>H</Avatar>
              <UserInfo open={userInfoOpen} close={popUpUserInfo} />
            </ListItemIcon>
            <ListItemText primary={"Logout"} sx={{ color: "#757575" }} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: {
            md: `calc(100% - ${open ? drawerWidth : nonDrawerWidth}px)`,
          },
          ml: { md: `${open ? drawerWidth : nonDrawerWidth}px` },
          bgcolor: "var(--border-color)",
          boxShadow: "none",
          color: "black",
        }}
      >
        <Toolbar
          sx={{
            minHeight: { sm: "45px", md: "50px" },
            display: { md: "none" },
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Registry Total
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { md: open ? drawerWidth : nonDrawerWidth },
          flexShrink: { md: 0 },
          transition: "width 0.3s ease",
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: open ? drawerWidth : nonDrawerWidth,
              whiteSpace: "nowrap",
              overflowX: "hidden",
              transition: "width 0.3s ease",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
