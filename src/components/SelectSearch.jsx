import { useState, useEffect } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, MenuItem, Menu, IconButton } from "@mui/material";

export default function SelectSearch({ transfer }) {
  const [item, setItem] = useState("licensePlate");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    transfer(item);
  }, [item]);

  const handleInput = (event) => {
    setItem(event.target.getAttribute("value"));
    handleClose();
  };

  return (
    <Box sx={{ minWidth: "30%" }}>
      <IconButton
        size="medium"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="default"
      >
        <SettingsIcon sx={{
          color: "var(--border-color)",
        }}/>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          color: "var(--secondary-color)",
          "& .MuiPaper-root": {
            backgroundColor: "var(--background-color)",
            boxShadow: "none",
            color: "var(--secondary-color)",
          }
        }}
      >
        <MenuItem value={"name"} onClick={handleInput} >
          Name
        </MenuItem>
        <MenuItem value={"licensePlate"} onClick={handleInput}>
          License Plate
        </MenuItem>
      </Menu>
    </Box>
  );
}
