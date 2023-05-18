import { Box, Stack, Typography } from "@mui/material";

export default function StatisticBox() {
  return (
    <Box
      sx={{
        bgcolor: "var(--secondary-color)",
        borderRadius: 2,
        p: 1,
        width: 0.47,
        height: 1,
        // mr: "2% !important",
      }}
    >
      <Stack
        justifyContent="space-between"
        sx={{
          color: "var(--avatar-color)",
          p: 3,
          height: 1,
        }}
      >
        <Typography
          height={"35%"}
          sx={{
            fontWeight: "bold",
            fontFamily: "roboto mono",
            fontSize: 17,
          }}
        >
          Tổng lượng đăng kiểm gần nhất
        </Typography>
        <Stack
          height={"65%"}
          justifyContent="space-between"
          mx={{
            xs: 0,
            sm: 0,
            md: 0,
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
              }}
            >
              Tháng
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontFamily: "poppins",
                fontSize: 16,
              }}
            >
              10
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
              }}
            >
              Quý
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontFamily: "poppins",
                fontSize: 16,
              }}
            >
              20
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
              }}
            >
              Năm
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontFamily: "poppins",
                fontSize: 16,
              }}
            >
              30
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
