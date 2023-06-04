import { useState, useEffect } from "react";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { fireAuth } from "../database/firebase";
import { user } from "../database/cache";
import { styled } from "@mui/material/styles";

import { Box, Grid, Stack, Button, TextField, Typography, InputAdornment } from "@mui/material";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdPermIdentity } from "react-icons/md";
import backgroundImage from "../assets/images/WVntmOE.jpg";

const CustomTextField = styled(TextField)(({ theme }) => ({
  position: "relative",
  width: "100%",
  marginTop: "20px",
  marginBottom: "20px",
  "& .MuiInputBase-input": {
    position: "relative",
    width: "100%",
    padding: "10px 5px",
    background: "transparent",
    outline: "none",
    boxShadow: "none",
    border: "none",
    color: "#569DAA",
    fontSize: "1em",
    letterSpacing: "0.05em",
    transition: "0.5s",
    zIndex: 10,
  },
  "& .MuiInputLabel-root": {
    color: "var(--title-color)",
    fontWeight: "bold",
    position: "absolute",
    left: 0,
    fontSize: "1em",
    fontFamily: "prompt",
    letterSpacing: "0.05em",
    transition: "0.5s",
    pointerEvents: "none",
  },
  "&.Mui-focused .MuiInputLabel-root": {
    color: "var(--title-color) !important",
  },
  "& .MuiInputLabel-shrink": {
    transform: "translateY(-20px)",
    fontSize: "0.8em",
  },
  "& .MuiInputBase-root::after": {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    height: "2px",
    background: "#B9EDDD",
    borderRadius: "4px",
    transition: "0.5s",
    pointerEvents: "none",
    zIndex: 9,
    content: '""',
  },
  "& .MuiInputLabel-shrink + .MuiInputBase-root::after": {
    height: "100%",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
}));

const SignIn = ({ transfer }) => {
  useEffect(() => {
    user.reset();
    signOut(fireAuth).catch(console.error);
  }, []);

  const [input, setInput] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState({ state: false, message: "" });
  const [pwError, setPwError] = useState({ state: false, message: "" });

  const handleInput = (e) => setInput({ ...input, [e.target.name]: e.target.value });

  const handleSignIn = () => {
    setEmailError({ state: false, message: "" });
    setPwError({ state: false, message: "" });

    if (!input.email.length) {
      setEmailError({ state: true, message: "Vui lòng nhập email" });
      return;
    }

    if (!input.password.length) {
      setPwError({ state: true, message: "Vui lòng nhập mật khẩu" });
      return;
    }

    const signIn = async ({ email, password }) => {
      try {
        const userCred = await signInWithEmailAndPassword(fireAuth, email, password);
        user.loadData(userCred.user.email);
        transfer();
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            setEmailError({ state: true, message: "Email không tồn tại" });
            break;
          case "auth/wrong-password":
            setPwError({ state: true, message: "Mật khẩu không đúng" });
            break;
          default:
            alert(`${error.code}\n${error.message}`);
        }
      }
    };

    signIn(input);
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
            <Stack sx={{ height: "100%", p: { xs: 3, sm: 4, md: 6, lg: 10 } }}>
              <Box sx={{ height: "50%" }}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    textShadow: "0 0 8px rgba(1,173,181, 0.8)",
                    color: "var(--title-color)",
                    fontWeight: "bold",
                    fontFamily: "Prompt",
                    fontSize: 50,
                  }}
                >
                  REGISTRY TOTAL
                </Typography>
              </Box>
              <Box sx={{ height: "50%" }}>
                <Typography
                  variant="h3"
                  sx={{
                    color: "var(--primary-color)",
                    fontFamily: "var(--font-raleway)",
                    fontWeight: "bold",
                  }}
                >
                  Welcome
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    color: "var(--primary-color)",
                    fontFamily: "var(--font-raleway)",
                    fontWeight: "bold",
                  }}
                >
                  To Registry Total !
                </Typography>
                <Typography
                  variant="p"
                  sx={{
                    color: "var(--primary-color)",
                    fontFamily: "var(--font-roboto)",
                    fontSize: 16,
                  }}
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
                  textShadow: {
                    xs: "0 0 8px rgba(1,173,181, 0.8)",
                    lg: "0 0 8px rgba(255, 255, 255, 0.8)",
                  },
                  color: { xs: "#569DAA", lg: "var(--secondary-color)" },
                  fontFamily: "Prompt",
                  fontWeight: "bold",
                }}
              >
                Sign in
              </Typography>
              <CustomTextField
                required
                name="email"
                label="Email"
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{
                        zIndex: 10,
                      }}
                    >
                      <MdPermIdentity size={24} color="var(--title-color)" />
                    </InputAdornment>
                  ),
                }}
                onChange={handleInput}
                error={emailError.state}
                helperText={emailError.message}
              />
              <CustomTextField
                type="password"
                name="password"
                label="Password"
                required
                InputProps={{
                  classes: {
                    input: "MuiInputBase-input",
                  },
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{
                        zIndex: 10,
                      }}
                    >
                      <RiLockPasswordFill size={24} color="var(--title-color)" />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  classes: {
                    root: "MuiInputLabel-root",
                    shrink: "MuiInputLabel-shrink",
                  },
                }}
                onChange={handleInput}
                error={pwError.state}
                helperText={pwError.message}
              />
              <Button
                sx={{
                  width: 0.8,
                  height: 50,
                  mt: 2,
                  backgroundColor: "#569DAA",
                  fontSize: "1em",
                  borderRadius: 5,
                  color: "white",
                  fontWeight: "bold",
                  fontFamily: "prompt",
                  transition: "0.3s",
                  "&:hover": {
                    backgroundColor: "var(--border-color)",
                    fontSize: "1.2em",
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
