import { useState } from "react";

import { Typography,Stack,Box } from "@mui/material";

import CreateAccForm from "../CreateAccForm";

const CreateAccBox = () => {
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
  // const { centerId, name, gmail, tel, address, password, confirmPassword } =
  //   formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const submitHandle = (event) => {
    event.preventDefault();
    console.log(formFields);
  };

  return (
    <Box
      sx={{
        height: { sm: "40%", md: "60%"},
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

    // <Box
    //   sx={{
    //     width: 1,
    //     height: 1,
    //     p: 1.5,
    //     border: "2px solid var(--secondary-color)",
    //     bgcolor: "var(--secondary-color)",
    //     borderRadius: 3,
    //   }}
    //   className={styles["container"]}
    // >
    //   <Stack
    //     direction="column"
    //     justifyContent="space-between"
    //     alignItems="center"
    //     height={1}
    //   >
    //     <Box width={0.9} sx={{ mt: 2 }}>
    //       <h2 className={styles["form-header"]}>
    //         Tạo mới tài khoản trung tâm đăng kiểm
    //       </h2>
    //     </Box>
    //     <form onSubmit={submitHandle} style={{width: "85%"}}>
    //       <FormInput
    //         label="Mã trung tâm"
    //         type="text"
    //         required
    //         onChange={handleChange}
    //         name="centerId"
    //         value={centerId}
    //         icon=<Grid3x3Icon />
    //       />
    //       <FormInput
    //         label="Tên trung tâm"
    //         type="text"
    //         required
    //         onChange={handleChange}
    //         name="name"
    //         value={name}
    //         icon=<BusinessCenterIcon />
    //       />
    //       <FormInput
    //         label="Gmail"
    //         type="text"
    //         required
    //         onChange={handleChange}
    //         name="gmail"
    //         value={gmail}
    //         icon=<EmailIcon />
    //       />
    //       <FormInput
    //         label="Số điện thoại"
    //         type="text"
    //         required
    //         onChange={handleChange}
    //         name="tel"
    //         value={tel}
    //         icon=<PhoneIcon />
    //       />
    //       <FormInput
    //         label="Địa chỉ"
    //         type="text"
    //         required
    //         onChange={handleChange}
    //         name="address"
    //         value={address}
    //         icon=<BusinessIcon />
    //       />

    //       <FormInput
    //         label="Mật khẩu"
    //         type="password"
    //         required
    //         onChange={handleChange}
    //         name="password"
    //         value={password}
    //         icon=<LockIcon />
    //       />

    //       <FormInput
    //         label="Xác nhận lại mật khẩu"
    //         type="password"
    //         required
    //         onChange={handleChange}
    //         name="confirmPassword"
    //         value={confirmPassword}
    //         icon=<LockIcon />
    //       />
    //       <Button
    //         sx={{
    //           backgroundColor: "whitesmoke",
    //           color: "var(--avatar-color)",
    //           fontWeight: "bold",
    //         }}
    //         size="lg"
    //         variant="solid"
    //         type="submit"
    //       >
    //         Confirm
    //       </Button>
    //     </form>
    //   </Stack>
    // </Box>
  );
};

export default CreateAccBox;
