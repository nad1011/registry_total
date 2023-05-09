import { useContext } from "react";

import { Button, Typography } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { FormContext } from "../../contexts/FormContext";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

const MyCard = ({ car }) => {
  const { id, name, expirationDate, numberPlate } = car;

  const { autoCompleteNameAndNumberPlate } = useContext(FormContext);

  const onClickHandler = () => {
    autoCompleteNameAndNumberPlate(name, numberPlate);
  };

  return (
    <>
      <Card
        sx={{
          height: "100%",
          borderRadius: "6%",
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
            p: 2,
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
            }}
          >
            {car.numberPlate}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              {name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "1rem",
              }}
            >
              {expirationDate}
            </Typography>
          </Box>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              pr: 0,
            }}
          >
            <Button
              variant="contained"
              disableRipple
              onClick={onClickHandler}
              sx={{
                boxShadow: "none",
                textTransform: "none",
                borderRadius: 3,
                color: "var(--primary-color)",
                backgroundColor: "var(--avatar-color)",
                "&:hover": {
                  backgroundColor: "var(--border-color)",
                  color: "black",
                  boxShadow: "none",
                },
              }}
            >
              Renew Form
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
};

export default MyCard;