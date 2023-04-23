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
      <Grid
        container
        sx={{ minHeight: 3 }}
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        <Grid item xs={12} lg={7.5} sx={{ minHeight: 1 }}>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" spacing={-1} alignItems="center">
              <SearchBox
                placeholder={`Search by ${filter}`}
                onChangeHandler={onTitleChange}
              />
              <SelectSearch tranfer={selectHandler} />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <IconButton
                onClick={toPreviousChunk}
                sx={{
                  backgroundColor: "var(--secondary-color)",
                  ":hover": { backgroundColor: "var(--border-color)" },
                }}
              >
                <FiArrowLeft className={styles["arrow"]} />
              </IconButton>
              <IconButton
                onClick={toNextChunk}
                sx={{
                  backgroundColor: "var(--secondary-color)",
                  ":hover": { backgroundColor: "var(--border-color)" },
                }}
              >
                <FiArrowRight className={styles["arrow"]} />
              </IconButton>
            </Stack>
          </Stack>
          <Box
            sx={{
              border: "2px solid var(--secondary-color)",
              overflowY: "auto",
              m: 1,
              mt: 0,
              mr: 0,
              p: 2,
              py: 1,
              backgroundColor: "var(--secondary-color)",
              borderRadius: 3,
            }}
          >
            <Stack
              direction="row"
              spacing={0}
              alignItems="center"
              sx={{ height: 560 }}
            >
              <CartList filterList={finalList ? finalList[chunk] : []} />
            </Stack>
          </Box>
        </Grid>
        <Grid item alignItems="center" height={0.9} xs={12} lg={4.5} p={1}>
          <RenewForm />
        </Grid>
      </Grid>
    </Page>
  );
}
