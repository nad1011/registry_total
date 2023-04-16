import React from "react";
import Page from "./Page/Page";
import LineChart from "../components/LineChart";
import Box from "@mui/material/Box";

export default function Mail() {
  return (
    <Page>
      <Box
        sx={{
          bgcolor: "#173A5E",
          boxShadow: 1,
          borderRadius: 2,
          p: 1,
          width: 1,
          height: 1,
          columns: 1,
        }}
      >
        <Box
          sx={{
            bgcolor: "#fff",
            boxShadow: 1,
            borderRadius: 2,
            p: 1,
            width: 600,
            height: 300,
          }}
        >
          <LineChart />
        </Box>
      </Box>
    </Page>
  );
}
