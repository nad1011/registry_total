import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Page from "../../components/Page/Page";
import CartList from "../../components/CardList/CardList";
import SearchBox from "../../components/SearchBox/SearchBox";
import RenewForm from "../../components/RenewForm/RenewForm";
import SelectSearch from "../../components/SelectSearch/SelectSearch";
import styles from "./Registration.module.css";
import { Grid, IconButton, Box, Stack } from "@mui/material";
import LICENSE_DATA from "../../data";
//

//
import {} from "firebase/firestore";
import { useLiveQuery } from "dexie-react-hooks";
import { fireDB, dexieDB } from "../../firebase/firebase";
import { setupListener } from "../../firebase/listener";

const chunkFilterList = (array, chunkSize) => {
  const chunkedArray = [];
  if (array.length === 0) return [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunkedArray.push(array.slice(i, i + chunkSize));
  }

  return chunkedArray;
};

export default function Registration() {
  //
  //
  //
  //
  //
  //
  //
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
    setFilter(newFilter);
  };

  return (
    <Page>
      <Grid
        container
        sx={{ height: "100%" }}
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        <Grid item xs={12} lg={7.5} sx={{ height: "100vh" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ height: "6vh", mt: "1vh" }}
          >
            <Stack
              direction="row"
              spacing={-1}
              alignItems="center"
              sx={{ height: 1 }}
            >
              <SearchBox
                placeholder={`Search by ${filter}`}
                onChangeHandler={onTitleChange}
              />
              <SelectSearch transfer={selectHandler} />
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
              m: "2vh",
              mt: "1vh",
              mr: "1vh",
              // mt: 0,
              // mr: 0,
              p: 1,
              py: 1,
              pb: 0,
              backgroundColor: "var(--secondary-color)",
              borderRadius: 3,
              height: "91vh",
            }}
          >
            <Stack
              direction="row"
              spacing={0}
              alignItems="center"
              sx={{ height: 1 }}
            >
              <CartList filterList={finalList ? finalList[chunk] : []} />
            </Stack>
          </Box>
        </Grid>
        <Grid
          item
          alignItems="center"
          height={0.9}
          xs={12}
          lg={4.5}
          p={1}
          sx={{ height: "100%" }}
        >
          <RenewForm />
        </Grid>
      </Grid>
    </Page>
  );
}
