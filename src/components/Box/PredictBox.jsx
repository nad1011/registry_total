import { Box, Stack, Typography } from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

export default function PredictBox({ head, value, percent }) {
  return (
    <Box
      sx={{
        display: "flex",
        height: 1,
        width: 1,
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
        <Typography
          color={"var(--font2-color)"}
          fontFamily={"var(--font-inter)"}
          sx={{ fontSize: { xs: 10, sm: 12, md: 14, lg: 16 }, fontWeight: 600 }}
        >
          Đăng kiểm {head} sau:
        </Typography>
        <Stack direction="row">
          <Typography color={"var(--title-color)"} sx={{ fontSize: 22, fontWeight: "bold" }}>
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
            fontFamily: "var(--font-inter)",
            fontSize: { xs: 7.5, sm: 10, md: 12, lg: 13 },
            color: "var(--font1-color)",
            opacity: 0.7,
          }}
        >
          (So sánh với {head} gần nhất)
        </Typography>
      </Stack>
    </Box>
  );
}
