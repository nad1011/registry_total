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
    }

    return (
        <>
            <Card key={car.id} className={styles["card-item"]}>
                <Card.Img
                    variant="top"
                    src="https://imageio.forbes.com/specials-images/imageserve/5d3703e2f1176b00089761a6/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x836,y799,safe&width=960"
                />
                <Card.Body>
                    <Card.Title>{car.numberPlate}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>{car.name}</ListGroup.Item>
                    <ListGroup.Item>{car.expirationDate}</ListGroup.Item>
                </ListGroup>
                <button onClick={onClickHandler}>Renew Form</button>
            </Card>
            {isFormOpen && <RenewForm car={car}/>}
            {isFormOpen && <button onClick={onHiddenFormHandler} className={styles["hidden-btn"]}>X (thay bang icon ho :))))</button>}
        </>
    );
};

export default MyCard;
