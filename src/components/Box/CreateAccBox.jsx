import { useState } from "react";

import { Typography, Stack, Box } from "@mui/material";

import CreateAccForm from "../CreateAccForm";

const CreateAccBox = () => {
  const defaultFormFields = {
    centerId: "",
    name: "",
    email: "",
    tel: "",
    address: "",
    password: "",
    confirmPassword: "",
  };
  const [formFields, setFormFields] = useState(defaultFormFields);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const submitHandle = (event) => {
    event.preventDefault();
    //
    //
    // task here
    //
    //
  };

  return (
    <Box
      sx={{
        height: { sm: "40%", md: "60%" },
        pb: "var(--padding-item)",
      }}
    >
      <Stack
        sx={{
          p: "var(--padding-item)",
          height: "100%",
          bgcolor: "#fff",
          borderRadius: "20px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Typography
          align="center"
          sx={{
            width: "100%",
            color: "#4267b2",
            fontSize: "25px",
            fontWeight: "bold",
          }}
          mb={"var(--padding-item)"}
        >
          Tạo mới tài khoản trung tâm đăng kiểm
        </Typography>
        <CreateAccForm formFields={formFields} handleChange={handleChange} />
      </Stack>
    </Box>
  );
};

export default CreateAccBox;
