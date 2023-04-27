import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import items from "./ItemInfor";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { AiOutlineMenu } from "react-icons/ai";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { NavbarContext } from "../../contexts/NavbarContext";
const drawerWidth = 170;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: "0.3s",
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: "0.3s",
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DrawerFooter = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "flex-start",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function Navbar() {
  // const [open, setOpen] = React.useState(false);
  const { open, changeOpen } = React.useContext(NavbarContext);

  const handleDrawer = () => {
    // setOpen(!open);
    changeOpen();
  };

  return (
    <Box sx={{ display: "flex", height: 1 }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ bgcolor: "var(--secondary-color)" }}>
          <IconButton
            sx={{
              justifyContent: "center",
            }}
            onClick={handleDrawer}
          >
            <AiOutlineMenu />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ height: 1, bgcolor: "var(--secondary-color)" }}>
          {items.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <Link to={item.path} style={{ textDecoration: "none" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "" : "center",
                    px: open ? 2.5 : 0.7,
                    transition: "0.3s",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{ opacity: open ? 1 : 0, color: "#757575" }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
        <DrawerFooter sx={{ bgcolor: "var(--secondary-color)" }}>
          <ListItem
            sx={{
              height: 1,
              width: 1,
              // justifyContent: open ? "" : "center",
              px: open ? 2 : 0,
              transition: "0.3s",
              hover: "none",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 2 : "auto",
                // justifyContent: "center",
              }}
            >
              <Avatar>H</Avatar>
            </ListItemIcon>
            <ListItemText
              primary={"Logout"}
              sx={{ opacity: open ? 1 : 0, color: "#757575" }}
            />
          </ListItem>
        </DrawerFooter>
      </Drawer>
    </Box>
  );
}

export default Navbar;
