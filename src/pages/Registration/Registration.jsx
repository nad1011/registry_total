import React, { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft } from "@mui/icons-material";
import Page from "../../components/Page/Page";
import CartList from "../../components/CardList/CardList";
import SearchBox from "../../components/SearchBox/SearchBox";
import RenewBox from "../../components/Box/RenewBox/RenewBox";
import SelectSearch from "../../components/SelectSearch/SelectSearch";
import { Grid, IconButton, Box, Stack } from "@mui/material";
import LICENSE_DATA from "../../data";
//
import { dexieDB, user } from "../../database/dexie";
import { useLiveQuery } from "dexie-react-hooks";

const chunkFilterList = (array, chunkSize) => {
  const chunkedArray = [];
  if (array.length === 0) return [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunkedArray.push(array.slice(i, i + chunkSize));
  }

  return chunkedArray;
};

export default function Registration() {
  const [searchField, setSearchField] = useState("");
  const [filter, setFilter] = useState("numberPlate");
  //
  //
  const expiredCerts = useLiveQuery(() =>
    dexieDB
      .table("certificate")
      .where("centerID")
      .equals(user.id)
      .filter((cert) => {
        const [date, month, year] = cert.expiredDate.split("/").map(Number);
        return new Date(year, month - 1, date) < new Date();
      })
      .toArray()
  );
  const [filterList, setFilterList] = useState(LICENSE_DATA);
  const [chunk, setChunk] = useState(0);

  useEffect(() => {
    const newList = LICENSE_DATA.filter((car) => {
      return car[filter].toUpperCase().includes(searchField);
    });
    setFilterList(newList);
  }, [searchField, filter]);

  useEffect(() => {}, [expiredCerts]);

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

  const selectHandler = (newFilter) => setFilter(newFilter);

  return (
    <Page>
      <Grid
        container
        sx={{ height: "100%" }}
        justifyContent={{
          lg: "flex-start",
          md: "center",
          xs: "center"
        }}
        alignItems={"center"}
      >
        <Grid
          item
          xs={12}
          lg={7.5}
          height={{
            xs: "70%",
            sm: "75%",
            md: "70%",
            lg: "100%",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            height={{
              xs: "13%",
              sm: "11%",
              md: "12%",
              lg: "10%",
            }}
            sx={{ mx: "2%", pt: 1.5 }}
          >
            <Stack
              direction="row"
              spacing={0}
              alignItems="center"
              sx={{ height: 1, width: "70%", pb: 0.8 }}
            >
              <SearchBox
                placeholder={`Search by ${filter}`}
                onChangeHandler={onTitleChange}
              />
              <SelectSearch transfer={selectHandler} />
            </Stack>
            <Stack direction="row" spacing={1} alignItems="flex-end">
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  width: "100%",
                  height: "70%",
                  backgroundColor: "var(--secondary-color)",
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                }}
              >
                <IconButton
                  onClick={toPreviousChunk}
                  sx={{
                    backgroundColor: "var(--secondary-color)",
                    ":hover": { backgroundColor: "var(--border-color)" },
                  }}
                  size="small"
                >
                  <ArrowLeft fontSize="large" />
                </IconButton>
                <IconButton
                  onClick={toNextChunk}
                  sx={{
                    backgroundColor: "var(--secondary-color)",
                    ":hover": { backgroundColor: "var(--border-color)" },
                  }}
                  size="small"
                >
                  <ArrowRight fontSize="large" />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
          <Box
            height={{
              xs: "86%",
              sm: "89%",
              md: "86%",
              lg: "87.8%",
            }}
            sx={{
              border: "2px solid var(--secondary-color)",
              m: "2%",
              mt: 0,
              mb: 0,
              backgroundColor: "var(--secondary-color)",
              borderRadius: 3,
              borderTopRightRadius: 0,
            }}
          >
            <CartList filterList={finalList ? finalList[chunk] : []} />
          </Box>
        </Grid>
        <Grid
          item
          alignItems="center"
          height={{
            xs: "75%",
            sm: "80%",
            md: "90%",
            lg: "100%",
          }}
          xs={11}
          lg={4.5}
          p={{
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
          }}
          pt={{
            xs: 1,
            sm: 1,
            md: 0,
            lg: 2,
          }}
          pb={{ xs: 1, sm: 1, md: 2, lg: 1.65 }}
          pl={{
            xs: 1,
            sm: 1,
            md: 2,
            lg: 0,
          }}
        >
          <RenewBox />
        </Grid>
      </Grid>
    </Page>
  );
}
