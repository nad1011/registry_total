import MyCard from "../MyCard/MyCard";
import Grid from "@mui/material/Grid";
import styles from "./CardList.module.css";
import Box from "@mui/material/Box";

const CartList = ({ filterList }) => {
  if (!filterList) {
    return null;
  }

  return (
    <Box sx={{ width: 0.9}}>
      <Grid container spacing={{ xs: 0, sm: 1, md: 1 }} rowSpacing={{xs: -1, sm: 0, md: 1 }} className={styles['container']}>
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
