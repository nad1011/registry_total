import { Children } from "react";
import ResponsiveNavbar from "./Navbar/ResponsiveNavbar";
import { Box } from "@mui/system";
import { user } from "../database/cache";

export default function Page({ children }) {
  if (!user.id) return <></>;
  return (
    <>
      <ResponsiveNavbar />
      <Box
        sx={{
          marginTop: { xs: "45px", sm: "45px", md: "0px" },
          position: "relative",
          width: "100vw",
          height: "auto",
          backgroundColor: "var(--primary-color)",
          overflow: "auto",
        }}
      >
        {Children.map(children, (child) => (
          <>{child}</>
        ))}
      </Box>
    </>
  );
}
