import { FormControlLabel, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DirectionsCar, CalendarMonth, Person, BusinessCenter } from "@mui/icons-material";
import FormInput from "./FormInput/FormInput";

const CheckBox = styled("input")(({ theme }) => ({
  appearance: "none",
  width: "20px",
  height: "20px",
  border: "2px solid #30cfd0",
  borderRadius: "5px",
  backgroundColor: "transparent",
  display: "inline-block",
  position: "relative",
  marginRight: "5px",
  cursor: "pointer",
  "&::before": {
    content: '""',
    backgroundColor: "#30cfd0",
    display: "block",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) scale(0)",
    width: "10px",
    height: "10px",
    borderRadius: "3px",
    transition: "all 0.3s ease-in-out",
  },
  "&:checked::before": {
    transform: "translate(-50%, -50%) scale(1)",
  },
}));

export default function RenewForm({
  name,
  numberPlate,
  carInfo,
  handleChange,
  newExpirationDate,
  handleFeeCheck,
  handleCarCheck,
  submitHandle,
}) {
  return (
    <form onSubmit={submitHandle} style={{ width: "85%" }}>
      <FormInput
        label="Chủ sở hữu"
        type="text"
        required
        // onChange={handleChange}
        name="name"
        value={name}
        icon=<Person />
      />
      <FormInput
        label="Biển số xe"
        type="text"
        required
        // onChange={handleChange}
        name="numberPlate"
        value={numberPlate}
        icon=<DirectionsCar />
      />
      <FormInput
        label="Trung tâm đăng kiểm"
        type="text"
        required
        // onChange={handleChange}
        name="newExpirationDate"
        value={newExpirationDate}
        icon=<BusinessCenter />
      />
      <FormInput
        label="Ngày hết hạn mới"
        type="text"
        required
        // onChange={handleChange}
        name="newExpirationDate"
        value={newExpirationDate}
        icon=<CalendarMonth />
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <FormControlLabel
          control={
            <CheckBox
              type="checkbox"
              // checked={feeCheck}
              onChange={handleFeeCheck}
              name="feeCheck"
            />
          }
          sx={{
            color: "var(--font1-color)",
            fontSize: "1.5rem",
          }}
          label="Đóng đủ phí"
        />
        <FormControlLabel
          control={
            <CheckBox
              type="checkbox"
              // checked={carCheck}
              onChange={handleCarCheck}
              name="carCheck"
            />
          }
          sx={{
            color: "var(--font1-color)",
            fontSize: "1.5rem",
          }}
          label="Đã kiểm tra xe"
        />
      </Box>
    </form>
  );
}
