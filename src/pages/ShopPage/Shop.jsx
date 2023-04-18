import React, { useEffect } from "react";
import { useState } from "react";
import Page from '../Page/Page'

import CartList from "../../components/CardList/CardList";
import SearchBox from "../../components/SearchBox/SearchBox";
import RenewForm from "../../components/RenewForm/RenewForm";
import SelectSearch from "../../components/SelectSearch/SelectSearch";

import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import LICENSE_DATA from "../../data";
import styles from "./Shop.module.css";

const chunkFilterList = (array, chunkSize) => {
  const chunkedArray = [];
  if (array.length === 0) return [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunkedArray.push(array.slice(i, i + chunkSize));
  }

  return chunkedArray;
};

export default function Shop() {
  const [searchField, setSearchField] = useState("");
  const [filterList, setFilterList] = useState(LICENSE_DATA);
  const [chunk, setChunk] = useState(0);
  const [filter, setFilter] = useState("numberPlate");

  useEffect(() => {
    const newList = LICENSE_DATA.filter((car) => {
      return car[filter].toUpperCase().includes(searchField);
    });
    setFilterList(newList);
  }, [searchField, filter]);

  const onTitleChange = (event) => {
    const searchInput = event.target.value.toUpperCase();
    setSearchField(searchInput);
    setChunk(0);
  };

  const chunkSize = 4;
  const finalList = chunkFilterList(filterList, chunkSize);
  const toPreviousChunk = () => {
    if (chunk <= 0) return;
    setChunk(() => chunk - 1);
  };
  const toNextChunk = () => {
    if (finalList.length - 1 <= chunk) {
      alert("List has reached end");
      return;
    }
    setChunk(() => chunk + 1);
  };

  const selectHandler = (newFilter) => {
    // console.log(data);
    setFilter(newFilter);
  };

  return (
    <div className={styles["page"]}>
      <SearchBox placeholder="search lisence" onChangeHandler={onTitleChange} />
      <SelectSearch tranfer={selectHandler} />
      <br />
      <FiArrowLeft className={styles["arrow"]} onClick={toPreviousChunk} />
      <FiArrowRight className={styles["arrow"]} onClick={toNextChunk} />
      <CartList filterList={finalList ? finalList[chunk] : []} />

      <RenewForm />
    </div>
  );
}
