import React from "react";
import { Children } from "react";
import ResponsiveNavbar from "../../components/Navbar/ResponsiveNavbar";
import { Box } from "@mui/system";

export default function Page({ children }) {
  return (
    <>
      <ResponsiveNavbar />
      <Box sx={{
        marginTop: { xs: "45px", md: "0px"},
        position: "relative",
        width: "100vw",
        height: "100vh",
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
