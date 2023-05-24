import React from "react";
import FormInput from "./FormInput/FormInput";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import EmailIcon from "@mui/icons-material/Email";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import Grid from "@mui/material/Grid";

export default function CreateAccForm({formFields, handleChange}) {
  return (
    <Grid container>
      <Grid item xs={6}>
        <FormInput
          label="Tên trung tâm"
          type="text"
          required
          onChange={handleChange}
          name="name"
          value={formFields.name}
          icon=<BusinessCenterIcon />
        />
        <FormInput
          label="Gmail"
          type="text"
          required
          onChange={handleChange}
          name="gmail"
          value={formFields.gmail}
          icon=<EmailIcon />
        />
        <FormInput
          label="Số điện thoại"
          type="text"
          required
          onChange={handleChange}
          name="tel"
          value={formFields.tel}
          icon=<PhoneIcon />
        />
        <FormInput
          label="Địa chỉ"
          type="text"
          required
          onChange={handleChange}
          name="address"
          value={formFields.address}
          icon=<BusinessIcon />
        />
      </Grid>
      <Grid item xs={6}>
        <FormInput
          label="Mã trung tâm"
          type="text"
          required
          onChange={handleChange}
          name="centerId"
          value={formFields.centerId}
          icon=<Grid3x3Icon />
        />
        <FormInput
          label="Mật khẩu"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={formFields.password}
          icon=<LockIcon />
        />

        <FormInput
          label="Xác nhận lại mật khẩu"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={formFields.confirmPassword}
          icon=<LockIcon />
        />
      </Grid>
    </Grid>
  );
}
