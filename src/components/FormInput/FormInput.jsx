import { Box } from "@mui/material";
import styles from "./FormInput.module.css";

const FormInput = ({ label, icon, ...otherProps }) => {
  return (
    <Box className={styles["input-group"]}>
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
