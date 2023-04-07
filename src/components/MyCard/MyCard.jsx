import { Card } from "react-bootstrap";
import { useState, useContext } from "react";

import { FormContext } from "../../contexts/FormContext";

import styles from "./MyCard.module.css";

const MyCard = ({ car }) => {
  const { id, name, expirationDate, numberPlate } = car;

  const { autoCompleteNameAndNumberPlate } = useContext(FormContext);

  const onClickHandler = () => {
    autoCompleteNameAndNumberPlate(name, numberPlate);
  };

  return (
    <>
      <Card key={id} className={styles["card"]}>
        <Card.Img
          className={styles["card-img"]}
          variant="top"
          src="https://imageio.forbes.com/specials-images/imageserve/5d3703e2f1176b00089761a6/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x836,y799,safe&width=960"
        />
        <Card.Body className={styles["card-body"]}>
          <div className={styles["card-line-1"]}>
            <Card.Title className={styles["card-title"]}>
              {car.numberPlate}
            </Card.Title>
            <div className={styles["list-item"]}>{name}</div>
          </div>
          <div className={styles["card-line-2"]}>
            <div className={styles["list-item"]}>{expirationDate}</div>
            <button className={styles["card-button"]} onClick={onClickHandler}>
              Renew Form
            </button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default MyCard;
