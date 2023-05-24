import { Box } from "@mui/material";
import styles from "./FormInputHQ.module.css";

const FormInput = ({ label, icon, ...otherProps }) => {
  return (
    <Box height={0.19} className={styles["input-group"]}>
      <input className={styles["form-input"]} {...otherProps} />
      {icon}
      {label && (
        <label
          className={`${otherProps.value.length ? styles["shrink"] : ""} ${
            styles["form-input-label"]
          }`}
        >
          {label}
        </label>
      )}
    </Box>
  );
};

export default FormInput;
