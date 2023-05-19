import React, { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft } from "@mui/icons-material";
import Page from "../../components/Page/Page";
import CartList from "../../components/CardList/CardList";
import SearchBox from "../../components/Box/SearchBox/SearchBox";
import RenewBox from "../../components/Box/RenewBox/RenewBox";
import SelectSearch from "../../components/SelectSearch/SelectSearch";
import { Grid, IconButton, Box, Stack } from "@mui/material";
import { dexieDB, user } from "../../database/cache";
import { useLiveQuery } from "dexie-react-hooks";
import { getDocID } from "../../database/function";

export default function Registration() {
  const expiredCerts = useLiveQuery(() =>
    dexieDB
      .table("certificate")
      .where("center")
      .equals(user.id)
      .filter((cert) => {
        const [date, month, year] = cert.expiredDate.split("/").map(Number);
        return new Date(year, month - 1, date) < new Date();
      })
      .toArray()
  );
  const [expiredList, setExpiredList] = useState([]);
  const [pageData, setPageData] = useState([]);

  const [query, setQuery] = useState("");
  const [param, setParam] = useState("regNum");
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!expiredCerts) return;
    const reloadList = async () => {
      setExpiredList(
        await Promise.all(
          expiredCerts.map(async (cert) => {
            const car = await dexieDB.table("car").get(getDocID(cert.car));
            const owner = await dexieDB.table("owner").get(getDocID(car.owner));
            return {
              id: cert.id,
              name: owner.name,
              licensePlate: car.regNum,
              expiredDate: cert.expiredDate,
            };
          })
        )
      );
    };
    reloadList();
  }, [expiredCerts]);

  useEffect(() => {
    setPage(0);
    const filteredList = expiredList.filter((cert) => cert[param].toUpperCase().includes(query));
    setPageData(
      Array.from({ length: Math.ceil(filteredList.length / 6) }, (_, i) =>
        filteredList.slice(i * 6, i * 6 + 6)
      )
    );
  }, [expiredList, query, param]);

  const onQueryChange = (e) => setQuery(e.target.value.toUpperCase());
  const selectParam = (newFilter) => setParam(newFilter);

  const toPrevChunk = () => setPage((page - 1 + pageData.length) % pageData.length);
  const toNextChunk = () => setPage((page + 1) % pageData.length);

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
              <SearchBox placeholder={`Search by ${param}`} onChangeHandler={onQueryChange} />
              <SelectSearch transfer={selectParam} />
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
                  onClick={toPrevChunk}
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
            <CartList filterList={pageData[page] ?? []} />
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