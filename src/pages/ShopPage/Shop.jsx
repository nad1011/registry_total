import React, { useEffect } from "react";
import { useState } from "react";

// import RenewForm from "../../components/RenewForm/RenewForm";
import CartList from "../../components/CardList/CardList";
import SearchBox from "../../components/SearchBox/SearchBox";
import RenewForm from "../../components/RenewForm/RenewForm";
import LICENSE_DATA from "../../data";
import styles from "./Shop.module.css"

export default function Shop() {
    const [searchField, setSearchField] = useState("");
    const [filterList, setFilterList] = useState(LICENSE_DATA);

    useEffect(() => {
        const newList = LICENSE_DATA.filter((car) => {
            return car.numberPlate.toUpperCase().includes(searchField);
        });
        setFilterList(newList);
    }, [searchField]);

    const onTitleChange = (event) => {
        const searchInput = event.target.value.toUpperCase();
        setSearchField(searchInput);
    };

    return (
        <div className={styles["page"]}>
            <SearchBox
                placeholder="search lisence"
                onChangeHandler={onTitleChange}
            />
            <CartList filterList={filterList} />
            <RenewForm />
        </div>
    );
}
