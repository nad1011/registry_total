//react import
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import review from "./Review";
//UI import
import { Grid, Box, Typography, Button, Stack } from "@mui/material";
import Page from "../../components/Page/Page";
import img from "../../assets/images/logo.png";
export default function Home() {
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
            height: "35%",
            width: "100%",
            pl: "5%",
            pt: "5%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Stack
            sx={{
              height: 0.35,
              width: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Typography
              variant="h2"
              sx={{ fontFamily: "roboto mono", fontWeight: "bold" }}
            >
              Registry Total
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: "justify",
                fontFamily: "poppins",
                mt: 2,
                ml: 2,
              }}
            >
              Are you tired of waiting in long lines at the DMV to register your
              car? Say goodbye to the hassle and register your car online with
              our easy-to-use platform. Our website offers a fast and convenient
              way to get your car registered without any unnecessary delays.
              Save time and energy by using our car registration service today!
            </Typography>
          </Stack>
        </Grid>
        <Grid
          container
          item
          sx={{
            height: "65%",
            width: "100%",
          }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Stack
            direction={"row"}
            justifyContent="space-between"
            alignItems="center"
            sx={{
              height: 0.9,
              width: 0.9,
            }}
          >
            {review.map((item, index) => (
              <Box
                sx={{
                  bgcolor: "darkgray",
                  width: 1 / 3,
                  height: 0.7,
                }}
                borderRight={index < 2 ? "1px solid black" : "none"}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  sx={{
                    bgcolor: "#darkgray",
                    width: 0.9,
                    height: 0.9,
                    p: 1,
                    ":hover": { bgcolor: "var(--border-color)", transition: "all 0.3s ease-in-out" },
                  }}
                >
                  <Stack
                    height={1}
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Typography color={"black"}>{item.describe}</Typography>
                    <Link
                      to={item.path}
                      style={{
                        color: "black",
                        fontFamily: "tahoma,sans-serif",
                      }}
                    >
                      {item.title}
                    </Link>
                  </Stack>
                </Box>
              </Box>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Page>
  );
}
