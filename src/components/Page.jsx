import { useContext } from "react";

import { Children } from "react";
import { Box } from "@mui/system";

import Warning from "../pages/Warning";
import ResponsiveNavbar from "./Navbar/ResponsiveNavbar";

import { AuthContext } from "../contexts/AuthProvider";

export default function Page({ children }) {
  const currentUser = useContext(AuthContext);

  return (
    <>
      {!currentUser ? (
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
