import { Children } from "react";
import { Box } from "@mui/system";

import Warning from "../pages/Warning";
import ResponsiveNavbar from "./Navbar/ResponsiveNavbar";

export default function Page({ children }) {
  return (
    <>
      {!localStorage.getItem("id") ? (
        <Warning />
      ) : (
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
      )}
    </>
  );
}
