import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { FaFilter } from "react-icons/fa";

const ITEMS_SELECTION = {
  name: "name",
  numberPlate: "numberPlate",
};

export default function SelectSearch({ tranfer }) {
  const [item, setItem] = useState("numberPlate");

  useEffect(() => {
    tranfer(item);
  }, [item, tranfer]);

  const handleInput = (event) => {
    setItem(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">
          <FaFilter />
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={item}
          label="item"
          onChange={handleInput}
        >
          <MenuItem value={ITEMS_SELECTION.name}>Name</MenuItem>
          <MenuItem value={ITEMS_SELECTION.numberPlate}>Number Plate</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
