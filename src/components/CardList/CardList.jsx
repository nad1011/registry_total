import MyCard from "../MyCard/MyCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const CartList = ({ filterList }) => {
  if (!filterList) {
    return null;
  }

  return (
    <Box display={"flex"} sx={{ width: 1, height: 1, p: 1 }}>
      <Grid
        container
        m={{ xs: 0 }}
        spacing={{ xs: 1, md: 2 }}
        sx={{ height: 1, overflowY: "auto" }}
      >
        {filterList.map((car, index) => {
          return (
            <Grid
              item
              p={{
                xs: `5px !important`,
              }}
              xs={12}
              sm={6}
              md={4}
              lg={4}
              height={{
                xs: "80%",
                sm: "75%",
                md: "75%",
                lg: "50%",
              }}
              key={car.id}
            >
              <MyCard car={car} key={car.id} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CartList;
