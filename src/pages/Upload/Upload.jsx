import Page from "../../components/Page/Page";
import { Button, Box, Stack } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useState } from "react";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    console.log("File uploaded:", selectedFile);
  };

  return (
    <Page>
      <Box
        sx={{
          backgroundColor: "#c48d8d",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Stack>
          <input
            sx={{ display: "none" }}
            accept=""
            id="upload-file"
            type="file"
            onChange={handleFileInputChange}
          />
          <Button
            variant="contained"
            color="secondary"
            disabled={!selectedFile}
            onClick={handleUpload}
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Page>
  );
};

export default Upload;
