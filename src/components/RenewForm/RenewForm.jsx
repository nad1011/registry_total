import { useState } from "react";
import * as FiIcon from "react-icons/fi";
import * as BsIcon from "react-icons/bs";
import FormInput from "../FormInput/FormInput";

import styles from "./RenewForm.module.css";



const RenewForm = ({car}) => {
    const defaultFormFields = {
        name: "",
        numberPlate: "",
        feeCheck: true,
        carCheck: true,
        expirationDate: "",
    };
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { name, numberPlate, feeCheck, carCheck, expirationDate } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    const submitHandle = (event) => {
        event.preventDefault();
        console.log(formFields);
    };

    return (
        <div className={styles["renew-form-container"]}>
            <h2 className={styles["form-header"]}>Renew Car Registration</h2>
            <form onSubmit={submitHandle}>
                <FormInput
                    label="Name"
                    type="text"
                    required
                    onChange={handleChange}
                    name="name"
                    value={name} 
                    icon = <FiIcon.FiUser/>
                />
                <FormInput
                    label="Number Plate"
                    type="text"
                    required
                    onChange={handleChange}
                    name="numberPlate"
                    value={numberPlate}
                    icon = <BsIcon.BsCarFront/>
                />
                <FormInput
                    label="New expiration date"
                    type="text"
                    required
                    onChange={handleChange}
                    name="expirationDate"
                    value={expirationDate}
                    icon = <BsIcon.BsCalendarHeart/>
                />
                <div className={styles["checkbox-container"]}>
                    <input
                        type="checkbox"
                        name="fee-check"
                        value={feeCheck}
                        required
                    />
                    <label htmlFor="fee-check">Đóng đủ phí</label>
                    <input
                        type="checkbox"
                        name="car-check"
                        value={carCheck}
                        required
                    />
                    <label htmlFor="car-check">Đã kiểm tra xe</label>
                </div>
                <button type="submit" className={styles["buttons"]}>Confirm</button>
            </form>
        </div>
    );
};

export default RenewForm;
