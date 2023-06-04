import { useState } from "react";

import { Typography, Stack, Box } from "@mui/material";
import SignUpForm from "../SignUpForm";

import { dexieDB } from "../../database/cache";
import { fireDB, fireAuth } from "../../database/firebase";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUpBox = () => {
  const defaultForm = {
    centerId: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    tel: "",
    address: "",
  };
  const [form, setForm] = useState(defaultForm);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    const submit = async () => {
      const { centerId: id, confirmPassword: confirmPw, name, tel, address } = form;
      if (!/^\d{4}[A-Za-z]$/.test(id)) {
        alert("ID không hợp lệ");
        return;
      }

      const center = await dexieDB.table("certificate").get("center");
      if (center.codes.includes(id.toUpperCase())) {
        alert("ID đã tồn tại");
        return;
      }

      const email = `center${id.toLowerCase()}@registry-total.org`;
      const password = `regTot@l${id.toUpperCase()}`;
      setForm({
        ...form,
        email,
        password,
      });

      if (!confirmPw || !name || !tel || !address) {
        alert("Vui lòng điền đầy đủ các mục");
        return;
      }

      if (confirmPw !== password) {
        alert("Mật khẩu xác nhận không khớp");
        return;
      }

      try {
        await createUserWithEmailAndPassword(fireAuth, email, password);
        await setDoc(doc(fireDB, "user", id.toUpperCase()), {
          address,
          name,
          tel,
        });
        await updateDoc(doc(fireDB, "certificate", "center"), {
          codes: arrayUnion(id.toUpperCase()),
        });
      } catch (error) {
        alert(error);
      }

      alert("Tài khoản trung tâm đã được thêm thành công");
    };

    submit();
  };

  return (
    <Box
      sx={{
        height: { xs: "100%", md: "60%" },
        pb: "var(--padding-item)",
      }}
    >
      <Stack
        sx={{
          p: "var(--padding-item)",
          height: "100%",
          bgcolor: "#fff",
          borderRadius: "20px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Typography
          align="center"
          sx={{
            width: "100%",
            color: "var(--title-color)",
            fontFamily: "var(--font-raleway)",
            fontSize: "25px",
            fontWeight: "bold",
            textShadow: "0px 4px 10px rgba(86, 157, 170, 0.5)",
          }}
          mb={"var(--padding-item)"}
        >
          Tạo mới tài khoản trung tâm đăng kiểm
        </Typography>
        <SignUpForm form={form} onChange={handleChange} onSubmit={handleSubmit} />
      </Stack>
    </Box>
  );
};

export default SignUpBox;
