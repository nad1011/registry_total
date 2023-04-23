import MyCard from "../MyCard/MyCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const CartList = ({ filterList }) => {
  if (!filterList) {
    return null;
  }

  return (
    <Box sx={{ width: 1, height: 1 }}>
      <Grid
        container
        // spacing={{ xs: 1, md: 2 }}
        spacing={{ xs: 1, md: 2 }}
        sx={{ height: 1 }}
      >
        {filterList.map((car) => {
          return (
            <Grid item xs={4} key={car.id}>
              <MyCard car={car} key={car.id} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CartList;
