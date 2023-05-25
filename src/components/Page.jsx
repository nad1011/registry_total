import React from "react";
import { Children } from "react";
import ResponsiveNavbar from "./Navbar/ResponsiveNavbar";
import { Box } from "@mui/system";

export default function Page({ children }) {
  return (
    <>
      <ResponsiveNavbar />
      <Box sx={{
        marginTop: { xs: "50px", sm: "45px" , md: "0px"},
        position: "relative",
        width: "100vw",
        height: "auto",
        backgroundColor: "var(--background-color)",
        overflow: "auto",
      }}>
        {Children.map(children, (child) => (
          <>{child}</>
        ))}
      </Box>
    </>
  );
}
