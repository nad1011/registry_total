import { Box } from "@mui/material";

import Page from "../../components/Page";
import FileUploadArea from "../../components/FileUploadArea";
import SignUpBox from "../../components/Box/SignUpBox";

const Registration = () => {
  return (
    <Page>
      <Box height={1} p={"var(--padding-item)"}>
        <SignUpBox />
        <FileUploadArea />
      </Box>
    </Page>
  );
};

export default Registration;
