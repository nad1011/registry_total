import { Box, Stack, Typography } from "@mui/material";

export default function StatisticBox({ title, month, quarter, year }) {
  return (
    <Box
      sx={{
        bgcolor: "var(--secondary-color)",
        borderRadius: 2,
        p: "3%",
        width: { xs: "50%" },
        height: "100%",
        // mr: "2% !important",
      }}
    >
      <Stack
        justifyContent="space-between"
        sx={{
          color: "var(--avatar-color)",
          height: 1,
        }}
      >
        <Typography
          height={"30%"}
          sx={{
            fontWeight: "bold",
            fontFamily: "Inter",
            fontSize: { xs: 13, sm: 17, md: 22, lg: 20 },
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
                fontFamily: "poppins",
                fontSize: { xs: 13, sm: 16, md: 20, lg: 20 },
              }}
            >
              Tháng
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontFamily: "poppins",
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
                fontFamily: "poppins",
                fontSize: { xs: 13, sm: 16, md: 20, lg: 20 },
              }}
            >
              Quý
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontFamily: "poppins",
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
                fontFamily: "poppins",
                fontSize: { xs: 13, sm: 16, md: 20, lg: 20 },
              }}
            >
              Năm
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontFamily: "poppins",
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
