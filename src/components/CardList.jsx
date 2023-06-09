import { Grid, Box } from "@mui/material";

import Card from "./Card";

const CartList = ({ filterList }) => {
  return (
    <Box display={"flex"} sx={{ width: 1, height: 1, p: 1 }}>
      <Grid
        container
        m={{ xs: 0 }}
        spacing={{ xs: 1, md: 2 }}
        sx={{ height: 1, overflowY: "auto" }}
      >
        {filterList.map((cert) => {
          return (
            <Grid
              item
              p={{
                xs: `calc(var(--padding-item)/2) !important`,
              }}
              xs={12}
              sm={6}
              md={4}
              lg={4}
              height={{
                xs: "80%",
                sm: "55%",
                md: "60%",
                lg: "50%",
              }}
              key={cert.id}
            >
              <Card cert={cert} key={cert.id} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CartList;
