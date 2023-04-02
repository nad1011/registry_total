import styles from "./FormInput.module.css";

const FormInput = ({ label, ...otherProps }) => {
    return (
        <div className={styles["input-group"]}>
            <input className={styles["form-input"]} {...otherProps} />
            {label && (
                <label
                    className={`${
                        otherProps.value.length ? styles["shrink"] : ""
                    } ${styles["form-input-label"]}`}
                >
                    {label}
                </label>
            )}
        </div>
    );
};

export default FormInput;
