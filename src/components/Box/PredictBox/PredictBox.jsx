import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

export default function PredictBox({ head, value, percent }) {
  return (
    <Box
      sx={{
        display: "flex",
        height: 1,
        width: 0.3,
        bgcolor: "var(--secondary-color)",
        borderRadius: 2,
      }}
    >
      <Stack
        direction="column"
        spacing={1}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          width: 1,
          height: 1,
        }}
      >
        <Typography color={"black"} fontFamily={"inter"}>
          Đăng kiểm {head} sau:
        </Typography>
        <Stack direction="row">
          <Typography color={"black"} sx={{ fontSize: 20, fontWeight: "bold" }}>
            {value}
          </Typography>
          {percent > 0 ? (
            <ArrowCircleUpIcon
              sx={{
                marginLeft: 1,
                fontSize: 18,
                color: "green",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                verticalAlign: "middle",
              }}
            />
          ) : (
            <ArrowCircleDownIcon
              sx={{
                marginLeft: 1,
                fontSize: 18,
                color: "#ff0000",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                verticalAlign: "middle",
              }}
            />
          )}

          <Typography
            sx={{
              color: percent > 0 ? "green" : "red",
              fontSize: 12.5,
              display: "flex",
              alignItems: "center",
              fontFamily: "inter",
            }}
          >
            {percent}%
          </Typography>
        </Stack>
        <Typography
          color={"black"}
          sx={{
            fontFamily: "inter",
            fontSize: 12,
            color: "red",
          }}
        >
          (So sánh với tháng gần nhất)
        </Typography>
      </Stack>
    </Box>
  );
}
