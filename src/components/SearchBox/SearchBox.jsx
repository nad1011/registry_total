import React from "react";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import styles from "./SearchBox.module.css";
import { IconButton } from "@mui/material";

const SearchBox = ({ placeholder, onChangeHandler }) => {
  const [search, setSearch] = useState(false);
  const onSearchClick = () => {
    setSearch(!search);
  };
  return (
    <div
      className={
        `${styles["search"]} ${styles["active"]}`
      }
    >
      <IconButton aria-label="delete" disabled onClick={onSearchClick} sx={{
        // '&:hover': {
        //   backgroundColor: 'transparent',
        //   boxShadow: 'none',
        //   borderColor: '#0062cc',
        // },
        // '&:active': {
        //   boxShadow: 'none',
        //   backgroundColor: 'transparent',
        //   borderColor: '#005cbf',
        // },
        // '&:focus': {
        //   boxShadow: '0 0 0 0.2rem transparent',
        // },
        // textTransform: 'none',
        height: '100%',
        
      }}>
        <BiSearch/>
      </IconButton>
      <div className={styles["input"]}>
          <input
            type="search"
            placeholder={placeholder}
            onChange={onChangeHandler}
          />
      </div>
    </div>
  );
};

export default SearchBox;
