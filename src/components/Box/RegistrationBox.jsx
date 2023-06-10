import { useState, useContext } from "react";

import { Typography, Box, Stack } from "@mui/material";

import { FormContext } from "../../contexts/FormContext";
import RegistrationForm from "../RegistrationForm";
import ButtonNina from "../ButtonNina/ButtonNina";

import { fireDB } from "../../database/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { changeFormat } from "../../contexts/FormContext";

const RegistrationBox = () => {
  const { id, owner, licensePlate, expiredDate, autoComplete } = useContext(FormContext);
  const [checked, setChecked] = useState({ fee: false, car: false });

  const handleCheckBox = (box) => setChecked({ ...checked, [box]: !checked[box] });

  const handleSubmit = () => {
    if (!checked.fee) {
      alert("Vui lòng đóng phí");
      return;
    }

    if (!checked.car) {
      alert("Vui lòng kiểm tra xe");
      return;
    }

    updateDoc(doc(fireDB, "certificate", id), {
      center: localStorage.getItem("id"),
      registeredDate: changeFormat(new Date()),
      expiredDate: expiredDate,
    });

    autoComplete("", "", "");
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
        <RegistrationForm
          owner={owner}
          licensePlate={licensePlate}
          center={localStorage.getItem("id")}
          expiredDate={expiredDate}
          handleFeeChecked={() => handleCheckBox("fee")}
          handleCarChecked={() => handleCheckBox("car")}
        />
        <ButtonNina content="Đăng kiểm" onClick={handleSubmit} />
      </Stack>
    </Box>
  );
};

export default RegistrationBox;
