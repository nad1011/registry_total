import React, { useState, useRef } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  Box,
  ClickAwayListener,
  Button,
  ButtonGroup,
} from "@mui/material";

const options = ["All", "1202D", "3111S"];

export default function SplitButton({ options, onSelect }) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleMenuItemClick = (_, index) => {
    setSelectedIndex(index);
    onSelect(options[index]);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
        sx={{
          width: "100%",
          // p: "var(--padding-item)",
          mb: "var(--padding-item)",
        }}
      >
        <Box
          sx={{
            bgcolor: "#fff",
            color: "#000",
            fontSize: "15px",
            width: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderTopLeftRadius: "4px",
            borderBottomLeftRadius: "4px",
          }}
        >
          {options[selectedIndex]}
        </Box>
        <Button
          sx={{
            width: "20%",
            bgcolor: "#fff",
            color: "#000",
          }}
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="all"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 10,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
