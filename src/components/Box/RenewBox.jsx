import { useState, useContext, useEffect } from "react";

import { Typography, Box, Stack, Button } from "@mui/material";

import { FormContext } from "../../contexts/FormContext";
import RenewForm from "../RenewForm";
import ButtonNina from "../ButtonNina/ButtonNina";

const RenewBox = ({ car }) => {
  const { autoName, autoNumberPlate } = useContext(FormContext);

  const defaultForm = {
    name: "",
    numberPlate: "",
    feeCheck: false,
    carCheck: false,
    newExpirationDate: "",
  };
  const [form, setForm] = useState(defaultForm);
  const { name, numberPlate, feeCheck, carCheck, newExpirationDate } = form;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submitHandle = (event) => {
    event.preventDefault();
    // task here
  };

  const handleFeeCheck = () => {
    setForm((prevFormFields) => ({
      ...prevFormFields,
      feeCheck: !prevFormFields.feeCheck,
    }));
  };

  const handleCarCheck = () => {
    setForm((prevFormFields) => ({
      ...prevFormFields,
      carCheck: !prevFormFields.carCheck,
    }));
  };

  useEffect(() => {
    setForm({
      name: autoName,
      numberPlate: autoNumberPlate,
      feeCheck: false,
      carCheck: false,
      newExpirationDate: "",
    });
  }, [autoName]);

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
    >
      <Stack direction="column" justifyContent="space-between" alignItems="center" height={1}>
        <Box
          width={0.9}
          sx={{ mt: 2 }}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            sx={{
              fontSize: 30,
              fontWeight: "bold",
              fontFamily: "var(--font-raleway)",
              color: "var(--title-color)",
            }}
          >
            ĐƠN ĐĂNG KIỂM
          </Typography>
        </Box>
        <RenewForm
          name={name}
          numberPlate={numberPlate}
          handleChange={handleChange}
          feeCheck={feeCheck}
          carCheck={carCheck}
          newExpirationDate={newExpirationDate}
        />
        <ButtonNina content="Đăng kiểm"/>
      </Stack>
    </Box>
  );
};

export default RenewBox;
