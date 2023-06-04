import React, { useState } from "react";
import { Box, Typography, Menu, MenuItem } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const Dropdown = ({ options, onSelect }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Tất cả");

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);

  const handleCloseMenu = () => setAnchorEl(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    handleCloseMenu();
    onSelect(option);
  };

  return (
    <Box
      position="relative"
      sx={{
        height: "100%",
        width: "100%",
        pb: "var(--padding-item)",
      }}
    >
      <Box
        onClick={handleOpenMenu}
        sx={{
          height: "100%",
          width: "100%",
          background: "var(--background-color)",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "2px var(--background-color) solid",
          borderRadius: "0.5em",
          padding: "1em",
          cursor: "pointer",
          transition: "background 0.2s",
          "&:hover": {
            background: "#569DAA",
            border: "2px #569DAA solid",
          },
        }}
      >
        <Typography variant="body1">{selectedOption}</Typography>
        <ExpandMore />
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          sx: {
            position: "absolute",
            width: { xs: "50%", sm: "50%", md: "50%", lg: "30%" },
            height: { xs: "50%", sm: "50%", md: "40%", lg: "37%" },
            backgroundColor: "#fff",
            boxShadow: "0 0.5em 1em rgba(0, 0, 0, 0.2)",
            borderRadius: "0.5em",
            border: "2px var(--title-color) solid",
            color: "var(--title-color)",
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            onClick={() => handleOptionSelect(option)}
            sx={{
              transition: "all 0.2s",
              "&:hover": {
                background: "#569DAA",
                color: "#fff",
              },
              ...(selectedOption === option && {
                background: "#B9EDDD",
                color: "var(--title-color)",
              }),
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Dropdown;
