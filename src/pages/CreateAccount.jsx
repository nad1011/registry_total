import Page from "../components/Page/Page";
import CreateAccBox from "../components/Box/CreateAccBox/CreateAccBox";
import { Box } from "@mui/material";
import React from "react";
import DropFileInput from "../components/DropFileInput/DropFileInput";

const CreateAccount = () => {
  const onFileChange = (files) => {
    //
    //
    // task here
    //
    //
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
