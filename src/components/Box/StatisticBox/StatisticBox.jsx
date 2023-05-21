import { Box, Stack, Typography } from "@mui/material";

export default function StatisticBox() {
  return (
    <Box
      sx={{
        bgcolor: "var(--secondary-color)",
        borderRadius: 2,
        p: "3%",
        width: {xs: "50%", lg: "48%"},
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
            fontSize: { xs: 13, sm: 16, md: 22, lg: 20 },
          }}
        >
          Tổng lượng đăng kiểm gần nhất
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
              30
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
