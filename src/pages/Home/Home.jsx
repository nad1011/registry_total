//react import
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//data import
import { database } from "../../database/firebase";
import { collection, onSnapshot, getDocs } from "firebase/firestore";
//UI import
import {
  Grid,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  Stack,
} from "@mui/material";
import Page from "../../components/Page/Page";
import Navbar from "../../components/Navbar/Navbar";

export default function Home() {
  const [stat, setStat] = useState({
    month: { id: 5, count: 8 },
    quarter: { id: 2, count: 26 },
    year: { id: 2022, count: 74 },
  });

  return (
    <Page>
      <Grid
        container
        sx={{
          backgroundColor: "darkgray",
          height: "100%",
          width: "100%",
        }}
      >
        <Grid
          item
          sm={6}
          md={9}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack sx={{ m: "10%", height: 1, width: 1 }}>
            <Typography
              variant="h2"
              sx={{ fontFamily: "garamond,serif", mt: "12%" }}
            >
              Registry Total
            </Typography>
            <Typography
              variant="body1"
              sx={{
                py: "3%",
                textAlign: "justify",
                fontFamily: "courier new,monospace",
              }}
            >
              Are you tired of waiting in long lines at the DMV to register your
              car? Say goodbye to the hassle and register your car online with
              our easy-to-use platform. Our website offers a fast and convenient
              way to get your car registered without any unnecessary delays.
              Save time and energy by using our car registration service today!
            </Typography>
            <Stack
              direction={"row"}
              sx={{ height: 1 }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                sx={{
                  bgcolor: "#fff",
                  borderRadius: 2,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  p: 1,
                  pt: 0,
                  mb: 2,
                  width: 0.3,
                  height: 0.5,
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{ borderRadius: "5px 25px" }}
                >
                  <Link
                    to="/statistic"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontFamily: "tahoma,sans-serif",
                    }}
                  >
                    Statistic
                  </Link>
                </Button>
              </Box>
              <Box
                sx={{
                  bgcolor: "#fff",
                  borderRadius: 2,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  p: 1,
                  pt: 0,
                  mb: 2,
                  width: 0.3,
                  height: 0.5,
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{ borderRadius: "5px 25px" }}
                >
                  <Link
                    to="/registration"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontFamily: "tahoma,sans-serif",
                    }}
                  >
                    Register Now
                  </Link>
                </Button>
              </Box>
              <Box
                sx={{
                  bgcolor: "#fff",
                  borderRadius: 2,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  p: 1,
                  pt: 0,
                  mb: 2,
                  width: 0.3,
                  height: 0.5,
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{ borderRadius: "5px 25px" }}
                >
                  <Link
                    to="/predict"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontFamily: "tahoma,sans-serif",
                    }}
                  >
                    Predict
                  </Link>
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Grid>
        <Grid
          item
          sm={6}
          md={3}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Box
            sx={{
              bgcolor: "#fff",
              borderRadius: 2,
              width: 0.8,
              height: 0.5,
            }}
          >
            This is logo
          </Box>
        </Grid>
      </Grid>
    </Page>
  );
}
