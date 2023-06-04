import React from "react";

import { Stack, Grid } from "@mui/material";
import { Lock, Phone, Business, BusinessCenter, Email, Grid3x3 } from "@mui/icons-material";

import FormInputHQ from "./FormInputHQ/FormInputHQ";
import ButtonNina from "./ButtonNina/ButtonNina";

export default function SignUpForm({ form, onChange, onSubmit }) {
  return (
    <Grid container sx={{ height: "90%" }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          height: { xs: "50%", md: "100%" },
          pr: "calc(var(--padding-item)/2)",
        }}
      >
        <Stack
          sx={{
            backgroundColor: "#f5f8ff",
            p: "var(--padding-item)",
            py: 0,
            borderRadius: "20px",
            height: "100%",
          }}
        >
          <FormInputHQ
            label="Mã trung tâm*"
            type="text"
            onChange={onChange}
            name="centerId"
            value={form.centerId}
            icon=<Grid3x3 />
          />
          <FormInputHQ
            label="Email"
            type="text"
            readOnly
            name="email"
            value={form.email}
            icon=<Email />
          />
          <FormInputHQ
            label="Mật khẩu"
            type="password"
            readOnly
            name="password"
            value={form.password}
            icon=<Lock />
          />
          <FormInputHQ
            label="Xác nhận mật khẩu*"
            type="password"
            onChange={onChange}
            name="confirmPassword"
            value={form.confirmPassword}
            icon=<Lock />
          />
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          pl: "calc(var(--padding-item)/2)",
          height: { xs: "50%", md: "100%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          sx={{
            width: "100%",
            backgroundColor: "#f5f8ff",
            p: "var(--padding-item)",
            py: 0,
            borderRadius: "20px",
            height: "75.65%",
            mb: { xs: 0, md: "var(--padding-item)" },
          }}
        >
          <FormInputHQ
            label="Tên trung tâm*"
            type="text"
            onChange={onChange}
            name="name"
            value={form.name}
            icon=<BusinessCenter />
          />
          <FormInputHQ
            label="Số điện thoại*"
            type="text"
            onChange={onChange}
            name="tel"
            value={form.tel}
            icon=<Phone />
          />
          <FormInputHQ
            label="Địa chỉ*"
            type="text"
            onChange={onChange}
            name="address"
            value={form.address}
            icon=<Business />
          />
        </Stack>
        <ButtonNina content="Tạo mới" onClick={onSubmit} />
      </Grid>
    </Grid>
  );
}
