import { useNavigate } from "react-router-dom";

import { Grid, Box, Typography, Stack } from "@mui/material";

import Page from "../components/Page";
import review from "./Review";

import logoImg from "../assets/images/logo.png";

const Home = () => {
  const navigate = useNavigate();
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
            width: "100%",
            pt: "var(--padding-item)",
            pl: {
              xs: "var(--padding-item)",
              sm: "var(--padding-item)",
              md: "calc(var(--padding-item)*2)",
              lg: "calc(var(--padding-item)*3)",
            },
            pr: {
              xs: "var(--padding-item)",
              sm: "var(--padding-item)",
              md: 0,
            },
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Stack
            sx={{
              width: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Typography
              variant="h2"
              fontSize={{
                xs: "30px",
                sm: "35px",
                md: "50px",
                lg: "50px",
              }}
              sx={{
                fontFamily: "var(--font-roboto)",
                fontWeight: "bold",
                color: "var(--title-color)",
              }}
            >
              Registry Total
            </Typography>
            <Typography
              variant="body1"
              fontSize={{
                xs: "20px",
                sm: "20px",
                md: "21px",
                lg: "20px",
              }}
              sx={{
                color: "var(--font1-color)",
                textAlign: "start",
                fontFamily: "var(--font-inter)",
              }}
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa minima, perspiciatis
              aliquid quo ex totam consequatur repellendus ducimus quisquam incidunt sunt, veniam
              sequi laborum! Cupiditate minima animi unde ullam sapiente!
            </Typography>
          </Stack>
        </Grid>
        <Grid
          item
          sx={{
            minHeight: "5%",
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
            p: "var(--padding-item)",
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
                key={index}
                item
                container
                sm={6}
                md={4}
                sx={{
                  position: "relative",
                  bgcolor: "var(--secondary-color)",
                  ":hover": {
                    ".box": {
                      transform: "translate3d(0, 0, 0)",
                      opacity: 0.4,
                    },
                  },
                }}
                borderRight={{
                  xs: "1px solid var(--border-color)",
                  sm: "1px solid var(--border-color)",
                  md: index !== 1 ? "1.5px solid var(--border-color)" : "none",
                }}
                borderLeft={{
                  xs: "1px solid var(--border-color)",
                  sm: index !== 1 ? "1px solid var(--border-color)" : "none",
                  md: index !== 1 ? "1.5px solid var(--border-color)" : "none",
                }}
                height={{
                  xs: "auto",
                  sm: 0.5,
                  md: 0.8,
                  lg: 0.8,
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  className="box"
                  onClick={() => navigate(item.path)}
                  sx={{
                    position: "absolute",
                    bgcolor: "var(--background-color)",
                    height: 1,
                    width: 0.9,
                    opacity: 0,
                    transform: "translate3d(0, -50%, 0)",
                    transition: "transform 0.2s, opacity 0.5s",
                  }}
                ></Box>
                <Box
                  sx={{
                    bgcolor: "var(--secondary-color)",
                    width: 0.9,
                    height: 0.9,
                    p: 1,
                  }}
                >
                  <Stack height={1} justifyContent="space-between" alignItems="flex-end">
                    <Typography color={"var(--font1-color)"}>{item.describe}</Typography>
                    <Typography
                      sx={{
                        color: "var(--title-color)",
                        fontWeight: "bold",
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Home;
