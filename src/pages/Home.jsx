import React from "react";
import { Link } from "react-router-dom";
import review from "./Review";

import { Grid, Box, Typography, Stack, Button } from "@mui/material";
import Page from "../components/Page/Page";
import logoImg from "../assets/images/logo.png";

export default function Home() {
  return (
    <Page>
      <Grid
        container
        sx={{
          backgroundColor: "var(--primary-color)",
          height: "100%",
          width: "100%",
        }}
      >
        <Grid
          container
          item
          sm={7}
          md={8}
          sx={{
            height: "40%",
            width: "100%",
            pl: "4%",
            pt: "4%",
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
              fontSize={{
                xs: "35px",
                sm: "35px",
                md: "40px",
                lg: "50px",
              }}
              sx={{
                fontFamily: "roboto mono",
                fontWeight: "bold",
                color: "black",
              }}
            >
              Registry Total
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "black",
                textAlign: "justify",
                fontFamily: "poppins",
                mt: 2,
              }}
            >
              Are you tired of waiting in long lines at the DMV to register your car? Say goodbye to
              the hassle and register your car online with our easy-to-use platform. Our website
              offers a fast and convenient way to get your car registered without any unnecessary
              delays. Save time and energy by using our car registration service today!
            </Typography>
          </Stack>
        </Grid>
        <Grid
          container
          item
          sm={5}
          md={4}
          // p={{
          //   sm: '25%',
          //   md: '5%',
          //   lg: '5%'
          // }}
          pt={{
            sm: "20%",
            md: "5%",
            lg: "3%",
          }}
          sx={{
            p: "3%",
            display: "fixed",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <Box
            height={{
              sm: "100%",
              md: "130%",
              lg: "150%",
            }}
            width={1}
            sx={{
              background: `url(${logoImg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              zIndex: 1,
              filter: "opacity(0.5) drop-shadow(0 0 var(--avatar-color))",
            }}
          ></Box>
        </Grid>
        <Grid
          item
          sx={{
            height: "10%",
            width: "100%",
            backgroundImage:
              "linear-gradient(to bottom right, var(--primary-color) 50%, var(--secondary-color) 50%)",
          }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        ></Grid>
        <Grid
          container
          item
          sx={{
            height: "50%",
            width: "100%",
            backgroundColor: "var(--secondary-color)",
            overflow: "auto",
          }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              height: 1,
              width: 0.9,
            }}
          >
            {review.map((item, index) => (
              <Grid
                item
                container
                sm={6}
                md={4}
                sx={{
                  bgcolor: "var(--secondary-color)",
                  overflow: "auto",
                }}
                borderRight={{
                  sm: "1px solid black",
                  md: index !== 1 ? "1px solid black" : "none",
                }}
                borderLeft={{
                  sm: "1px solid black",
                  md: index !== 1 ? "1px solid black" : "none",
                }}
                height={{
                  sm: 0.4,
                  md: 0.6,
                }}
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
                    ":hover": {
                      bgcolor: "var(--border-color)",
                      transition: "all 0.3s ease-in-out",
                    },
                  }}
                >
                  <Stack height={1} justifyContent="space-between" alignItems="flex-end">
                    <Typography color={"black"}>{item.describe}</Typography>
                    <Button
                      sx={{
                        backgroundColor: "smoke",
                        fontWeight: "bold",
                        ":hover": {
                          bgcolor: "whitesmoke",
                        },
                      }}
                      size="lg"
                      variant="solid"
                    >
                      <Link
                        to={item.path}
                        style={{
                          textDecoration: "none",
                          color: "black",
                          fontFamily: "tahoma,sans-serif",
                        }}
                      >
                        {item.title}
                      </Link>
                    </Button>
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}
