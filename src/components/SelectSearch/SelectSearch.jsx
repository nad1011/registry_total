import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { AiFillSetting } from "react-icons/ai";
import IconButton from "@mui/material/IconButton";

const ITEMS_SELECTION = {
  name: "name",
  numberPlate: "numberPlate",
};

export default function SelectSearch({ transfer }) {
  const [item, setItem] = useState("numberPlate");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    transfer(item);
  }, [item, transfer]);

  const handleInput = (event) => {
    setItem(event.target.getAttribute("value"));
    console.log(event.target.getAttribute("value"));
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
        <MenuItem value={ITEMS_SELECTION.name} onClick={handleInput}>
          Name
        </MenuItem>
        <MenuItem value={ITEMS_SELECTION.numberPlate} onClick={handleInput}>
          Number Plate
        </MenuItem>
      </Menu>

      {/* </Select> */}
    </Box>
  );
}
