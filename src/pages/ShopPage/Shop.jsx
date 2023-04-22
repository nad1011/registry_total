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
import { Grid, IconButton, Box } from "@mui/material";

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
      <Stack direction="row" spacing={-2} alignItems="center">
        <SearchBox
          placeholder={`Search by ${filter}`}
          onChangeHandler={onTitleChange}
        />
        <SelectSearch tranfer={selectHandler} />
      </Stack>
      <Grid
        container
        sx={{ minHeight: 3 }}
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        <Grid item xs={12} lg={7.5} sx={{ minHeight: 3 }}>
          <Box sx={{ border: "1px dashed grey", overflowY: "auto"  }}>
            <Stack
              direction="row"
              spacing={0}
              alignItems="center"
              sx={{ height: 587 }}
            >
              <IconButton onClick={toPreviousChunk}>
                <FiArrowLeft className={styles["arrow"]} />
              </IconButton>
              <CartList filterList={finalList ? finalList[chunk] : []} />
              <IconButton onClick={toNextChunk}>
                <FiArrowRight className={styles["arrow"]} />
              </IconButton>
            </Stack>
          </Box>
        </Grid>
        <Grid item alignItems="center" height={0.9} xs={12} lg={4.3}>
          <RenewForm />
        </Grid>
      </Grid>
    </Page>
  );
}
