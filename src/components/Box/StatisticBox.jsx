import { Box, Stack, Typography } from "@mui/material";

export default function StatisticBox({ title, month, quarter, year }) {
  return (
    <Box
      sx={{
        bgcolor: "var(--secondary-color)",
        borderRadius: 2,
        p: "calc(var(--padding-item)*2)",
        width: { xs: "50%" },
        height: "100%",
      }}
    >
      <Stack
        justifyContent="space-between"
        sx={{
          height: 1,
        }}
      >
        <Typography
          height={"30%"}
          sx={{
            fontWeight: "600",
            fontFamily: "var(--font-inter))",
            fontSize: { xs: 13, sm: 17, md: 22, lg: 20 },
            color: "var(--title-color)",
          }}
        >
          {title}
        </Typography>
        <Stack
          height={"70%"}
          justifyContent="space-between"
          mx={{
            xs: 2,
            sm: 3,
            md: 5,
            lg: 5,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              sx={{
                fontFamily: "var(--font-roboto)",
                color: "var(--font1-color)",
                fontSize: { xs: 13, sm: 16, md: 20, lg: 20 },
              }}
            >
              Tháng
            </Typography>
            <Typography
              sx={{
                color: "var(--font2-color)",
                fontWeight: "bold",
                fontFamily: "var(--font-roboto)",
                fontSize: { xs: 13, sm: 16, md: 20, lg: 20 },
              }}
            >
              {month}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              sx={{
                color: "var(--font1-color)",
                fontFamily: "var(--font-roboto)",
                fontSize: { xs: 13, sm: 16, md: 20, lg: 20 },
              }}
            >
              Quý
            </Typography>
            <Typography
              sx={{
                color: "var(--font2-color)",
                fontWeight: "bold",
                fontFamily: "var(--font-roboto)",
                fontSize: { xs: 13, sm: 16, md: 20, lg: 20 },
              }}
            >
              {quarter}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              sx={{
                color: "var(--font1-color)",
                fontFamily: "var(--font-roboto)",
                fontSize: { xs: 13, sm: 16, md: 20, lg: 20 },
              }}
            >
              Năm
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                color: "var(--font2-color)",
                fontFamily: "var(--font-roboto)",
                fontSize: { xs: 13, sm: 16, md: 20, lg: 20 },
              }}
            >
              {year}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
