import { createContext, useState } from "react";

export const FormContext = createContext({
  autoName: "",
  autoNumberPlate: "",
});

export const FormProvider = ({ children }) => {
  const [autoName, setAutoName] = useState("");
  const [autoNumberPlate, setAutoNumberPlate] = useState("");

  const autoCompleteNameAndNumberPlate = (autoName, autoNumberPlate) => {
    setAutoName(autoName);
    setAutoNumberPlate(autoNumberPlate);
  };

  const value = {
    autoName,
    autoNumberPlate,
    autoCompleteNameAndNumberPlate,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
