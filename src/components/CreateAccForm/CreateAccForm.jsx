import { useState } from "react";
import FormInput from "../FormInput/FormInput";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styles from "./CreateAccForm.module.css";
import Stack from "@mui/material/Stack";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import EmailIcon from "@mui/icons-material/Email";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";

const CreateAccForm = () => {
  const defaultFormFields = {
    centerId: "",
    name: "",
    gmail: "",
    tel: "",
    address: "",
    password: "",
    confirmPassword: "",
  };
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { centerId, name, gmail, tel, address, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //
    //
    // task here
    //
    //
    //
  };

  return (
    <Box
      sx={{
        width: 1,
        height: 1,
        p: 1.5,
        border: "2px solid var(--secondary-color)",
        bgcolor: "var(--secondary-color)",
        borderRadius: 3,
      }}
      className={styles["container"]}
    >
      <Stack direction="column" justifyContent="space-between" alignItems="center" height={1}>
        <Box width={0.9} sx={{ mt: 2 }}>
          <h2 className={styles["form-header"]}>Tạo mới tài khoản trung tâm đăng kiểm</h2>
        </Box>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Mã trung tâm"
            type="text"
            required
            onChange={handleChange}
            name="centerId"
            value={centerId}
            icon=<Grid3x3Icon />
          />
          <FormInput
            label="Tên trung tâm"
            type="text"
            required
            onChange={handleChange}
            name="name"
            value={name}
            icon=<BusinessCenterIcon />
          />
          <FormInput
            label="Gmail"
            type="text"
            required
            onChange={handleChange}
            name="gmail"
            value={gmail}
            icon=<EmailIcon />
          />
          <FormInput
            label="Số điện thoại"
            type="text"
            required
            onChange={handleChange}
            name="tel"
            value={tel}
            icon=<PhoneIcon />
          />
          <FormInput
            label="Địa chỉ"
            type="text"
            required
            onChange={handleChange}
            name="address"
            value={address}
            icon=<BusinessIcon />
          />

          <FormInput
            label="Mật khẩu"
            type="password"
            required
            onChange={handleChange}
            name="password"
            value={password}
            icon=<LockIcon />
          />

          <FormInput
            label="Xác nhận lại mật khẩu"
            type="password"
            required
            onChange={handleChange}
            name="confirmPassword"
            value={confirmPassword}
            icon=<LockIcon />
          />
          <Button
            sx={{
              backgroundColor: "whitesmoke",
              color: "var(--avatar-color)",
              fontWeight: "bold",
            }}
            size="lg"
            variant="solid"
            type="submit"
          >
            Confirm
          </Button>
        </form>
      </Stack>
    </Box>
  );
};

export default CreateAccForm;
