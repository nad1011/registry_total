import { Card } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { useState } from "react";

import RenewForm from "../RenewForm/RenewForm";

import styles from "./MyCard.module.css";

const MyCard = ({ car }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const onClickHandler = () => {
    setIsFormOpen(!isFormOpen);
  };

  const onHiddenFormHandler = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <>
      <Card key={car.id} className={styles["card"]}>
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
            <div className={styles["list-item"]}>{car.name}</div>
          </div>
          <div className={styles["card-line-2"]}>
            <div className={styles["list-item"]}>{car.expirationDate}</div>
            <button className={styles["card-button"]} onClick={onClickHandler}>
              Renew Form
            </button>
          </div>
        </Card.Body>
      </Card>
      {isFormOpen && <RenewForm car={car} />}
      {isFormOpen && (
        <button
          onClick={onHiddenFormHandler}
          className={`${styles["hidden-btn"]} ${styles["card-button"]}`}
        >
          X (thay bang icon ho :))))
        </button>
      )}
    </>
  );
};

export default MyCard;
