import { useState, useEffect } from "react";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { clientAuth } from "../database/firebase";
import { user } from "../database/cache";

import {
  Box,
  Grid,
  Link,
  Stack,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdPermIdentity } from "react-icons/md";
import backgroundImage from "../assets/images/test2.jpg";

const SignIn = ({ transfer }) => {
  useEffect(() => {
    user.reset();
    signOut(clientAuth).catch(console.error);
  }, []);

  const [input, setInput] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState({ state: false, message: "" });
  const [passwordError, setPasswordError] = useState({ state: false, message: "" });

  const handleInput = (e) => setInput({ ...input, [e.target.name]: e.target.value });

  const handleSignIn = () => {
    setEmailError({ state: false, message: "" });
    setPasswordError({ state: false, message: "" });

    if (!input.email.length) {
      setEmailError({ state: true, message: "Vui lòng nhập email" });
      return;
    }

    if (!input.password.length) {
      setPasswordError({ state: true, message: "Vui lòng nhập mật khẩu" });
      return;
    }

    signInWithEmailAndPassword(clientAuth, input.email, input.password)
      .then((userCred) => {
        user.loadData(userCred.user);
        transfer();
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found":
            setEmailError({ state: true, message: "Email không tồn tại" });
            break;
          case "auth/wrong-password":
            setPasswordError({ state: true, message: "Mật khẩu không đúng" });
            break;
          default:
            alert(`${error.code}\n${error.message}`);
        }
      });
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
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam, molestias
                  possimus quod, autem.
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
                name="email"
                label="Email"
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
                error={emailError.state}
                helperText={emailError.message}
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
                error={passwordError.state}
                helperText={passwordError.message}
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
                onClick={handleSignIn}
              >
                Sign In
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignIn;
