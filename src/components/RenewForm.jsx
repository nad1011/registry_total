import React from "react";
import { Checkbox, FormControlLabel, Box } from "@mui/material";
import { DirectionsCar, CalendarMonth, Person } from "@mui/icons-material";
import FormInput from "./FormInput/FormInput";

export default function RenewForm({
  name,
  numberPlate,
  feeCheck,
  carCheck,
  newExpirationDate,
  handleChange,
  handleFeeCheck,
  handleCarCheck,
  submitHandle,
}) {
  return (
    <form onSubmit={submitHandle} style={{ width: "85%" }}>
      <FormInput
        label="Name"
        type="text"
        required
        onChange={handleChange}
        name="name"
        value={name}
        icon=<Person />
      />
      <FormInput
        label="Number Plate"
        type="text"
        required
        onChange={handleChange}
        name="numberPlate"
        value={numberPlate}
        icon=<DirectionsCar />
      />
      <FormInput
        label="New expiration date"
        type="text"
        required
        onChange={handleChange}
        name="newExpirationDate"
        value={newExpirationDate}
        icon=<CalendarMonth />
      />
      <Box>
        <FormControlLabel
          control={<Checkbox checked={feeCheck} onChange={handleFeeCheck} name="feeCheck" />}
          label="Đóng đủ phí"
        />
        <FormControlLabel
          control={<Checkbox checked={carCheck} onChange={handleCarCheck} name="carCheck" />}
          label="Đã kiểm tra xe"
        />
      </Box>
    </form>
  );
}
