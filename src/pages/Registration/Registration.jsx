import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Page from "../../components/Page/Page";
import CartList from "../../components/CardList/CardList";
import SearchBox from "../../components/SearchBox/SearchBox";
import RenewForm from "../../components/RenewForm/RenewForm";
import SelectSearch from "../../components/SelectSearch/SelectSearch";
import styles from "./Registration.module.css";
import { Grid, IconButton, Box, Stack } from "@mui/material";
import { dexieDB, user } from "../../database/dexie";
import { useLiveQuery } from "dexie-react-hooks";
import { getDocID } from "../../database/function";

export default function Registration() {
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
      <Grid container sx={{ height: "100%" }} justifyContent={"flex-start"} alignItems={"center"}>
        <Grid item xs={12} lg={7.5} sx={{ height: "100vh" }}>
          <Stack direction="row" justifyContent="space-between" sx={{ height: "6vh", mt: "1vh" }}>
            <Stack direction="row" spacing={-1} alignItems="center" sx={{ height: 1 }}>
              <SearchBox placeholder={`Search by ${param}`} onChangeHandler={onQueryChange} />
              <SelectSearch transfer={selectParam} />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <IconButton
                onClick={toPrevChunk}
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
              p: 1,
              py: 1,
              pb: 0,
              backgroundColor: "var(--secondary-color)",
              borderRadius: 3,
              height: "91vh",
            }}
          >
            <Stack direction="row" spacing={0} alignItems="center" sx={{ height: 1 }}>
              <CartList filterList={pageData[page] ?? []} />
            </Stack>
          </Box>
        </Grid>
        <Grid item alignItems="center" height={0.9} xs={12} lg={4.5} p={1} sx={{ height: "100%" }}>
          <RenewForm />
        </Grid>
      </Grid>
    </Page>
  );
}
