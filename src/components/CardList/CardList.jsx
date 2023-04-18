import MyCard from "../MyCard/MyCard";

import styles from "./CardList.module.css";

const CartList = ({ filterList }) => {
  if (!filterList) {
    return null;
  }

  return (
    <div className={styles["card-list-container"]}>
      {filterList.map((car) => {
        return <MyCard car={car} key={car.id} />;
      })}
    </div>
  );
};

export default CartList;
