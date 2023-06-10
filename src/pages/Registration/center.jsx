import React, { useEffect, useState } from "react";

import { dexieDB } from "../../database/cache";
import { useLiveQuery } from "dexie-react-hooks";

import { Grid, Box, Stack } from "@mui/material";
import { ArrowRight, ArrowLeft } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

import Page from "../../components/Page";
import CartList from "../../components/CardList";
import SearchBox from "../../components/Box/SearchBox";
import RegistrationBox from "../../components/Box/RegistrationBox";
import SelectSearch from "../../components/SelectSearch";

const StyledButton = styled("button")({
  position: "relative",
  overflow: "hidden",
  border: "1.5px solid var(--border-color)",
  borderRadius: "20px",
  width: "50%",
  height: "60%",
  color: "var(--border-color)",
  display: "inline-block",
  fontSize: "1em",
  textDecoration: "none",
  cursor: "pointer",
  background: "#fff",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  "& span:first-of-type": {
    position: "relative",
    transition: "color 300ms cubic-bezier(0.48, 0, 0.12, 1)",
    zIndex: 10,
  },
  "& span:last-child": {
    fontSize: "0.7em",
    color: "white",
    display: "block",
    position: "absolute",
    bottom: 0,
    transition: "all 300ms cubic-bezier(0.48, 0, 0.12, 1)",
    zIndex: 100,
    opacity: 0,
    top: "50%",
    left: "50%",
    transform: "translateY(225%) translateX(-50%)",
    height: "14px",
    lineHeight: "13px",
  },
  "&:after": {
    content: '""',
    position: "absolute",
    bottom: "-50%",
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "var(--background-color)",
    transformOrigin: "bottom center",
    transition: "transform 400ms cubic-bezier(0.48, 0, 0.12, 1)",
    transform: "skewY(9.3deg) scaleY(0)",
    zIndex: 50,
  },
  "&:hover:after": {
    transformOrigin: "bottom center",
    transform: "skewY(9.3deg) scaleY(2)",
  },
  "&:hover span:last-child": {
    transform: "translateX(-50%) translateY(-50%)",
    opacity: 1,
    transition: "all 500ms cubic-bezier(0.48, 0, 0.12, 1)",
  },
});

const paramName = {
  name: "chủ",
  licensePlate: "biển số",
};

const Registration = () => {
  const expiredCerts = useLiveQuery(() =>
    dexieDB
      .table("certificate")
      .where("center")
      .anyOf(localStorage.getItem("id"), "None")
      .filter((cert) => {
        if (!cert.expiredDate) return true;
        const [date, month, year] = cert.expiredDate.split("/").map(Number);
        return new Date(year, month - 1, date) < new Date();
      })
      .toArray()
  );
  const [expiredList, setExpiredList] = useState([]);

  const [pageData, setPageData] = useState([]);
  const [query, setQuery] = useState("");
  const [param, setParam] = useState("licensePlate");

  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!expiredCerts) return;
    const reloadList = async () => {
      setExpiredList(
        await Promise.all(
          expiredCerts.map(async (cert) => {
            const car = await dexieDB.table("car").get(cert.car);
            const owner = await dexieDB.table("owner").get(car.owner);
            return {
              id: cert.id,
              name: owner.name,
              licensePlate: car.regNum,
              expiredDate: cert.expiredDate || "New",
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
        <Grid
          item
          xs={12}
          lg={7.5}
          height={{
            xs: "70%",
            sm: "80%",
            md: "90%",
            lg: "100%",
          }}
          sx={{ p: "var(--padding-item)" }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            height={{
              xs: "10%",
              sm: "10%",
              md: "10%",
              lg: "9%",
              xl: "9%",
            }}
          >
            <Stack
              direction="row"
              spacing={{
                xs: 0,
                lg: 0,
              }}
              alignItems="center"
              sx={{
                height: 1,
                width: "70%",
                pb: "calc(var(--padding-item))",
              }}
            >
              <SearchBox
                placeholder={`Tìm theo ${paramName[param]} xe`}
                onChangeHandler={onQueryChange}
              />
              <SelectSearch transfer={selectParam} />
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{
                width: "20%",
                height: "100%",
              }}
            >
              <StyledButton onClick={toPrevChunk}>
                <span>
                  <ArrowLeft
                    sx={{
                      height: "100%",
                      width: "100%",
                    }}
                  />
                </span>
                <span>BACK</span>
              </StyledButton>
              <StyledButton onClick={toNextChunk}>
                <span>
                  <ArrowRight
                    sx={{
                      height: "100%",
                      width: "100%",
                    }}
                  />
                </span>
                <span>NEXT</span>
              </StyledButton>
            </Stack>
          </Stack>
          <Box
            height={{
              xs: "90%",
              sm: "90%",
              md: "90%",
              lg: "91%",
              xl: "91%",
            }}
            sx={{
              border: "2px solid var(--secondary-color)",
              backgroundColor: "var(--secondary-color)",
              borderRadius: 3,
            }}
          >
            <CartList filterList={pageData[page] ?? []} />
          </Box>
        </Grid>
        <Grid
          item
          alignItems="center"
          height={{
            xs: "70%",
            sm: "80%",
            md: "90%",
            lg: "100%",
          }}
          xs={12}
          lg={4.5}
          p={"var(--padding-item)"}
          pl={{
            xs: "var(--padding-item)",
            lg: 0,
          }}
          pt={{
            xs: 0,
            lg: "var(--padding-item)",
          }}
        >
          <RegistrationBox />
        </Grid>
      </Grid>
    </Page>
  );
};

export default Registration;
