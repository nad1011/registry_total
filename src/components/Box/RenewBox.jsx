import { useState, useContext, useEffect } from "react";

import { Typography, Box, Stack, Button } from "@mui/material";

import { FormContext } from "../../contexts/FormContext";
import RenewForm from "../RenewForm";

const RenewBox = ({ car }) => {
  const { autoName, autoNumberPlate } = useContext(FormContext);

  const defaultFormFields = {
    name: "",
    numberPlate: "",
    feeCheck: false,
    carCheck: false,
    newExpirationDate: "",
  };
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, numberPlate, feeCheck, carCheck, newExpirationDate } =
    formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const submitHandle = (event) => {
    event.preventDefault();
    console.log(formFields);
  };

  const handleFeeCheck = () => {
    setFormFields((prevFormFields) => ({
      ...prevFormFields,
      feeCheck: !prevFormFields.feeCheck,
    }));
  };

  const handleCarCheck = () => {
    setFormFields((prevFormFields) => ({
      ...prevFormFields,
      carCheck: !prevFormFields.carCheck,
    }));
  };

  useEffect(() => {
    setFormFields({
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
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        height={1}
      >
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
              color: "var(--avatar-color)",
            }}
          >
            Renew Car Registration
          </Typography>
        </Box>
        <RenewForm
          name={name}
          numberPlate={numberPlate}
          feeCheck={feeCheck}
          carCheck={carCheck}
          newExpirationDate={newExpirationDate}
        />
        <Button
          sx={{
            backgroundColor: "whitesmoke",
            color: "var(--avatar-color)",
            fontWeight: "bold",
          }}
          size="lg"
          variant="solid"
        >
          Confirm
        </Button>
      </Stack>
    </Box>
  );
};

export default RenewBox;
