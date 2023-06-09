import { useContext } from "react";

import { Button, Typography, CardMedia, CardContent, CardActions, Card, Box } from "@mui/material";

import { FormContext } from "../contexts/FormContext";

const CustomCard = ({ cert }) => {
  const { id, name, licensePlate, expiredDate } = cert;

  const { autoComplete } = useContext(FormContext);

  return (
    <>
      <Card
        sx={{
          height: "100%",
          borderRadius: "6%",
          border: "1.5px solid var(--border-color)",
          boxShadow: "none",
        }}
      >
        <CardMedia
          component="img"
          height="40%"
          image="https://imageio.forbes.com/specials-images/imageserve/5d3703e2f1176b00089761a6/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x836,y799,safe&width=960"
          alt="Paella dish"
        />
        <CardContent
          sx={{
            p: "var(--padding-item)",
            ":last-child": {
              paddingBottom: 0,
            },
            height: "60%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              fontFamily: "var(--font-roboto)",
              color: "var(--title-color)",
            }}
          >
            {licensePlate}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: { xs: "center", sm: "center", md: "flex-start" },
              overflowX: "hidden",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                fontSize: "1rem",
                fontFamily: "var(--font-inter)",
                color: "var(--font2-color)",
                whiteSpace: "nowrap",
              }}
            >
              {name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "1rem",
                fontFamily: "var(--font-inter)",
                color: "var(--font1-color)",
              }}
            >
              {expiredDate}
            </Typography>
          </Box>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "center" },
              alignItems: "center",
              pr: 0,
              width: "100%",
              height: "37%",
            }}
          >
            <Button
              disableRipple
              onClick={() => autoComplete(id, name, licensePlate)}
              sx={{
                boxShadow: "none",
                textTransform: "none",
                borderRadius: 4,
                border: "1.5px solid var(--border-color)",
                fontSize: "0.8em",
                fontFamily: "var(--font-raleway)",
                width: { xs: "80%", sm: "100%", md: "100%", lg: "80%" },
                height: "100%",
                color: "var(--title-color)",
                transition: "all 0.4s",
                "&:hover": {
                  backgroundColor: "var(--border-color)",
                  color: "var(--primary-color)",
                  fontSize: "0.9em",
                  fontWeight: "bold",
                  boxShadow: "none",
                },
              }}
            >
              Đăng kiểm
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
};

export default CustomCard;
