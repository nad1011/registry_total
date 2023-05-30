import React from "react";

import { Stack, Grid } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import EmailIcon from "@mui/icons-material/Email";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";

import FormInputHQ from "./FormInputHQ/FormInputHQ";
import ButtonNina from "./ButtonNina/ButtonNina";

export default function CreateAccForm({ formFields, handleChange }) {
  return (
    <Grid container sx={{ height: "90%" }}>
      <Grid
        item
        xs={6}
        sx={{
          height: "100%",
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
            label="Tên trung tâm"
            type="text"
            required
            onChange={handleChange}
            name="name"
            value={formFields.name}
            icon=<BusinessCenterIcon />
          />
          <FormInputHQ
            label="Mã trung tâm"
            type="text"
            required
            onChange={handleChange}
            name="centerId"
            value={formFields.centerId}
            icon=<Grid3x3Icon />
          />
          <FormInputHQ
            label="Mật khẩu"
            type="password"
            required
            onChange={handleChange}
            name="password"
            value={formFields.password}
            icon=<LockIcon />
          />
          <FormInputHQ
            label="Nhập lại mật khẩu"
            type="password"
            required
            onChange={handleChange}
            name="confirmPassword"
            value={formFields.confirmPassword}
            icon=<LockIcon />
          />
        </Stack>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          pl: "calc(var(--padding-item)/2)",
          height: "100%",
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
            mb: "var(--padding-item)",
          }}
        >
          <FormInputHQ
            label="Email"
            type="text"
            required
            onChange={handleChange}
            name="email"
            value={formFields.email}
            icon=<EmailIcon />
          />
          <FormInputHQ
            label="Số điện thoại"
            type="text"
            required
            onChange={handleChange}
            name="tel"
            value={formFields.tel}
            icon=<PhoneIcon />
          />
          <FormInputHQ
            label="Địa chỉ"
            type="text"
            required
            onChange={handleChange}
            name="address"
            value={formFields.address}
            icon=<BusinessIcon />
          />
        </Stack>
        <ButtonNina />
      </Grid>
    </Grid>
  );
}
