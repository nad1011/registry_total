import { useState, useEffect } from "react";
import { AiFillSetting } from "react-icons/ai";
import { Box, MenuItem, Menu, IconButton } from "@mui/material";

const SELECTION = {
  name: "name",
  licensePlate: "regNum",
};

export default function SelectSearch({ transfer }) {
  const [item, setItem] = useState("regNum");
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
    <Box sx={{ minWidth: 120 }}>
      <IconButton
        size="medium"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="default"
      >
        <AiFillSetting />
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
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem value={SELECTION.name} onClick={handleInput}>
          Name
        </MenuItem>
        <MenuItem value={SELECTION.licensePlate} onClick={handleInput}>
          License Plate
        </MenuItem>
      </Menu>

      {/* </Select> */}
    </Box>
  );
}
