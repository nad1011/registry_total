//react import
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//data import
import { database } from "../../firebase/firebase";
import { collection, onSnapshot, getDocs } from "firebase/firestore";
//UI import
import {
  Grid,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function Home() {
  const [stat, setStat] = useState({
    month: { id: 5, count: 8 },
    quarter: { id: 2, count: 26 },
    year: { id: 2022, count: 74 },
  });

  return (
    <Grid
      container
      sx={{
        backgroundImage:
          'url("https://cdn.wallpapersafari.com/19/63/HYnDUL.jpg")',
        backgroundColor: "darkgray",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100vh",
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
        <Box sx={{ m: "10%" }}>
          <Typography variant="h2" sx={{ fontFamily: "garamond,serif" }}>
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
            car? Say goodbye to the hassle and register your car online with our
            easy-to-use platform. Our website offers a fast and convenient way
            to get your car registered without any unnecessary delays. Save time
            and energy by using our car registration service today!
          </Typography>
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
      </Grid>
      <Grid item sm={6} md={3}>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            height: "100%",
          }}
        >
          {Object.entries(stat).map(([title, { id, count }]) => (
            <ListItem
              sx={{
                display: "flex",
                width: "75%",
                height: "20%",
                p: 0,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#939799",
                  border: "2px double #6E7173",
                  borderRadius: "10px 40px",
                  opacity: "0.75",
                }}
              ></Box>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
