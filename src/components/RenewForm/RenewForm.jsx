import { useState, useContext, useEffect } from "react";
import * as FiIcon from "react-icons/fi";
import * as BsIcon from "react-icons/bs";
import FormInput from "../FormInput/FormInput";
import Box from '@mui/material/Box';
import { FormContext } from "../../contexts/FormContext";
import Button from '@mui/material/Button';
import styles from "./RenewForm.module.css";

const RenewForm = ({ car }) => {
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
    <Box sx={{width:0.55 , p: 2, border: '2px solid black', borderRadius: 10 }} className={styles['container']}>
      <h2 className={styles["form-header"]}>Renew Car Registration</h2>
      <form onSubmit={submitHandle}>
        <FormInput
          label="Name"
          type="text"
          required
          onChange={handleChange}
          name="name"
          value={name}
          icon=<FiIcon.FiUser />
        />
        <FormInput
          label="Number Plate"
          type="text"
          required
          onChange={handleChange}
          name="numberPlate"
          value={numberPlate}
          icon=<BsIcon.BsCarFront />
        />
        <FormInput
          label="New expiration date"
          type="text"
          required
          onChange={handleChange}
          name="newExpirationDate"
          value={newExpirationDate}
          icon=<BsIcon.BsCalendarHeart />
        />
        <div className={styles["checkbox-container"]}>
          <input
            type="checkbox"
            name="fee-check"
            checked={feeCheck}
            value={feeCheck}
            required
            onChange={handleFeeCheck}
          />
          <label htmlFor="fee-check">Đóng đủ phí</label>
          <input
            type="checkbox"
            name="car-check"
            checked={carCheck}
            value={carCheck}
            required
            onChange={handleCarCheck}
          />
          <label htmlFor="car-check">Đã kiểm tra xe</label>
        </div>
        <Button variant="contained">Confirm</Button>
      </form>
    </Box>
  );
};

export default RenewForm;
