import { createContext, useState } from "react";
import { faker } from "@faker-js/faker";

export const FormContext = createContext();

export const changeFormat = (date) => {
  const day = "0" + date.getDate();
  const month = "0" + (date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day.slice(-2)}/${month.slice(-2)}/${year}`;
};

export const FormProvider = ({ children }) => {
  const [id, setId] = useState("");
  const [owner, setOwner] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [expiredDate, setExpiredDate] = useState("");

  const autoComplete = (id, owner, licensePlate) => {
    setId(id);
    setOwner(owner);
    setLicensePlate(licensePlate);
    if (!id) setExpiredDate("");
    else {
      const curDate = new Date();
      curDate.setMonth(curDate.getMonth() + [6, 12, 18][faker.number.int({ max: 2 })]);
      setExpiredDate(changeFormat(curDate));
    }
  };

  const value = {
    id,
    owner,
    licensePlate,
    expiredDate,
    autoComplete,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
