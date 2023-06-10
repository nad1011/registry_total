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

export default function RegistrationForm({
  owner,
  licensePlate,
  center,
  expiredDate,
  handleFeeChecked,
  handleCarChecked,
}) {
  return (
    <form style={{ width: "85%" }}>
      <FormInput
        readOnly
        label="Chủ sở hữu"
        type="text"
        required
        name="name"
        value={owner}
        icon=<Person />
      />
      <FormInput
        readOnly
        label="Biển số xe"
        type="text"
        required
        name="licensePlate"
        value={licensePlate}
        icon=<DirectionsCar />
      />
      <FormInput
        readOnly
        label="Trung tâm đăng kiểm"
        type="text"
        required
        name="center"
        value={center}
        icon=<BusinessCenter />
      />
      <FormInput
        readOnly
        label="Ngày hết hạn mới"
        type="text"
        required
        name="expiredDate"
        value={expiredDate}
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
          control={<CheckBox type="checkbox" onChange={handleFeeChecked} name="FeeChecked" />}
          sx={{
            color: "var(--font1-color)",
            fontSize: "1.5rem",
          }}
          label="Đóng đủ phí"
        />
        <FormControlLabel
          control={<CheckBox type="checkbox" onChange={handleCarChecked} name="CarChecked" />}
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
