import React, { useEffect } from "react";
import { useState } from "react";
import Page from "../Page/Page";
import CartList from "../../components/CardList/CardList";
import SearchBox from "../../components/SearchBox/SearchBox";
import RenewForm from "../../components/RenewForm/RenewForm";
import SelectSearch from "../../components/SelectSearch/SelectSearch";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import LICENSE_DATA from "../../data";
import styles from "./Shop.module.css";
import Stack from "@mui/material/Stack";

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

  const chunkSize = 6;
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
    <Page>
      <Stack
        direction="row"
        spacing={20}
        justifyContent="space-between"
        width="60%"
      >
        <Stack direction="row" spacing={-2} alignItems="center">
          <SearchBox
            placeholder={`Search by ${filter}`}
            onChangeHandler={onTitleChange}
          />
          <SelectSearch tranfer={selectHandler} />
        </Stack>
        <Stack direction="row" spacing={0} alignItems="flex-end">
          <FiArrowLeft className={styles["arrow"]} onClick={toPreviousChunk} />
          <FiArrowRight className={styles["arrow"]} onClick={toNextChunk} />
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center" height={0.9}>
        <CartList filterList={finalList ? finalList[chunk] : []} />
        <RenewForm />
      </Stack>
    </Page>
  );
}
