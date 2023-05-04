import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/firebase";
import {
  Box,
  TextField,
  Button,
  Avatar,
  InputAdornment,
  Link,
  Typography,
} from "@mui/material";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdPermIdentity } from "react-icons/md";
import { Stack, Grid } from "@mui/material";
import backgroundImage from "../../assets/images/test2.jpg";

export default function SignIn({ transfer }) {
  const [input, setInput] = useState({ id: "", password: "" });
  const [error, setError] = useState({
    idState: false,
    idMessage: "",
    passwordState: false,
    passwordMessage: "",
  });

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (input.id.length === 0) {
      setError({
        ...error,
        idState: true,
        idMessage: "ID không được để trống",
      });
      return;
    }

    if (input.password.length === 0) {
      setError({
        ...error,
        passwordState: true,
        passwordMessage: "Mật khẩu không được để trống",
      });
      return;
    }

    const docRef = doc(fireDB, "account", input.id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      setError({
        ...error,
        idState: true,
        idMessage: "ID không tồn tại",
      });
      transfer(false);
      return;
    }

    let account = docSnap.data();

    if (input.password !== account.password) {
      setError({
        ...error,
        passwordState: true,
        passwordMessage: "Sai mật khẩu",
      });
      transfer(false);
      return;
    } else {
      transfer(true);
    }
  };

  return (
    <Box
      width="100%"
      justifyContent="center"
      alignItems="center"
      sx={{
        p: 0,
        m: 0,
        background: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        // flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
          backdropFilter: "blur(5px)",
          display: "flex",
          // flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          sx={{
            height: "85%",
            width: "95%",
            background: `url(${backgroundImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            opacity: 0.9,
            borderRadius: 5,
            boxShadow: 3,
          }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid item xs={0} lg={6} sx={{ height: "100%" }}>
            <Stack sx={{ height: "100%", p: 10 }}>
              <Box sx={{ height: "50%" }}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    color: "var(--avatar-color)",
                    fontWeight: "bold",
                    fontFamily: "Roboto Mono",
                  }}
                >
                  Registry Total
                </Typography>
              </Box>
              <Box sx={{ height: "50%" }}>
                <Typography
                  variant="h3"
                  sx={{
                    color: "var(--primary-color)",
                    fontFamily: "roboto mono",
                    fontWeight: "bold",
                  }}
                >
                  Welcome
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    color: "var(--primary-color)",
                    fontFamily: "roboto mono",
                    fontWeight: "bold",
                  }}
                >
                  To Bla Ble!
                </Typography>
                <Typography
                  variant="p"
                  sx={{ color: "var(--primary-color)", fontFamily: "poppins" }}
                >
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Magnam, molestias possimus quod, autem.
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} lg={6} sx={{ height: "100%" }}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 10,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "var(--avatar-color)",
                  fontFamily: "roboto mono",
                  fontWeight: "bold",
                }}
              >
                Sign in
              </Typography>
              <TextField
                required
                name="id"
                label="ID"
                variant="standard"
                sx={{ width: 1, my: 2, fontFamily: "poppins" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <MdPermIdentity size={24} />
                    </InputAdornment>
                  ),
                }}
                onChange={handleInput}
                error={error.idState}
                helperText={error.idMessage}
              />
              <TextField
                required
                type="password"
                name="password"
                label="Password"
                variant="standard"
                sx={{ width: 1, my: 2, fontFamily: "poppins" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <RiLockPasswordFill size={24} />
                    </InputAdornment>
                  ),
                }}
                onChange={handleInput}
                error={error.passwordState}
                helperText={error.passwordMessage}
              />
              <Link
                href=""
                sx={{
                  alignSelf: "flex-end",
                  mt: 1,
                  fontFamily: "poppins",
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "var(--primary-color)",
                  textDecoration: "none",
                  ":hover": { color: "var(--border-color)" },
                }}
              >
                Forget password
              </Link>
              <Button
                sx={{
                  width: 0.8,
                  height: 50,
                  mt: 2,
                  backgroundColor: "var(--avatar-color)",
                  color: "whitesmoke",
                  fontWeight: "bold",
                  fontFamily: "poppins",
                  "&:hover": {
                    backgroundColor: "var(--border-color)",
                    color: "var(--avatar-color)",
                  },
                }}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
