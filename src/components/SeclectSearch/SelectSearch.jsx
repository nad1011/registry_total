import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={item}
          label="item"
          onChange={handleInput}
          // onChange={handleChange}
        >
          <MenuItem value={"name"}>Name</MenuItem>
          <MenuItem value={"numberPlate"}>Number Plate</MenuItem>
          {/* <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );
}
