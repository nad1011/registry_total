import React from "react";

import { Box } from "@mui/material";

import Page from "../components/Page";
import DropFileInput from "../components/DropFileInput";
import CreateAccBox from "../components/Box/CreateAccBox";


const CreateAccount = () => {
  const onFileChange = (files) => {
    console.log(files);
  };
  return (
    <Page>
      <Box height={1} p={"var(--padding-item)"}>
        <CreateAccBox />
        <DropFileInput onFileChange={(files) => onFileChange(files)} />
      </Box>
    </Page>
  );
};

export default CreateAccount;
