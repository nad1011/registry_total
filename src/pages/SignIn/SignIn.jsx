import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { database } from "../../firebase/firebase";

import {
  Container,
  Box,
  TextField,
  Button,
  Avatar,
  InputAdornment,
  Link,
} from "@mui/material";
import { purple } from "@mui/material/colors";

import { BsShieldLockFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdPermIdentity } from "react-icons/md";

export default function SignIn() {
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

    const docRef = doc(database, "account", input.id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      setError({
        ...error,
        idState: true,
        idMessage: "ID không tồn tại",
      });
      return;
    }

    let account = docSnap.data();

    if (input.password !== account.password) {
      setError({
        ...error,
        passwordState: true,
        passwordMessage: "Sai mật khẩu",
      });
      return;
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ mb: 5, width: 50, height: 50, bgcolor: purple[400] }}>
          <BsShieldLockFill size={30} />
        </Avatar>
        <TextField
          required
          name="id"
          label="ID"
          variant="standard"
          sx={{ width: 1, my: 2 }}
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
          label="Mật khẩu"
          variant="standard"
          sx={{ width: 1, my: 2 }}
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
        <Link href="" underline="hover" sx={{ alignSelf: "flex-end", mt: 1 }}>
          Quên mật khẩu
        </Link>
        <Button
          variant="contained"
          sx={{ width: 1, mt: 3, borderRadius: "15px" }}
          onClick={handleSubmit}
        >
          Đăng nhập
        </Button>
      </Box>
    </Container>
  );
}
