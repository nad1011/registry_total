import React from "react";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import styles from "./SearchBox.module.css";
const SearchBox = ({ placeholder, onChangeHandler }) => {
  const [search, setSearch] = useState(false);
  const onSearchClick = () => {
    setSearch(!search);
  };
  return (
    // <input
    //     type="search"
    //     placeholder={placeholder}
    //     onChange={onChangeHandler}
    // />
    <div
      className={
        search ? `${styles["search"]} ${styles["active"]}` : styles["search"]
      }
    >
      <BiSearch onClick={onSearchClick} className={styles["icon"]}></BiSearch>
      <div className={styles["input"]}>
        {search && <input
          type="search"
          placeholder={placeholder}
          onChange={onChangeHandler}
        />}
      </div>
    </div>
  );
};

export default SearchBox;
