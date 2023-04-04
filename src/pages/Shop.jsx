import React, { useEffect } from "react";
import { useState, useContext } from "react";

import RenewForm from "../components/RenewForm/RenewForm";
import CartList from "../components/CardList/CardList";
import SearchBox from "../components/SearchBox/SearchBox";

import LISENCE_DATA from "../data";

export default function Shop() {
    const [searchField, setSearchField] = useState("");
    const [filterList, setFilterList] = useState(LISENCE_DATA);

    useEffect(() => {
        const newList = LISENCE_DATA.filter((car) => {
            return car.numberPlate.toUpperCase().includes(searchField);
        });
        setFilterList(newList);
    }, [searchField]);

    const onTitleChange = (event) => {
        const searchInput = event.target.value.toUpperCase();
        setSearchField(searchInput);
    };

    return (
        <div>
            {/* <RenewForm/> */}
            <SearchBox
                placeholder="search lisence"
                onChangeHandler={onTitleChange}
            />
            <CartList filterList={filterList} />
        </div>
    );
}
