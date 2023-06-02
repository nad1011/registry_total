import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import Image from "mui-image";
import { Box, Grid, Stack, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

import { ImageConfig } from "../ImageConfig";
import ButtonNina from "./ButtonNina/ButtonNina";

const DropFileInput = (props) => {
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      props.onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };

  return (
    <Grid
      container
      mb={2}
      height={{
        xs: "60%",
        sm: "60%",
        md: "40%",
      }}
      backgroundColor={"#fff"}
      p={"var(--padding-item)"}
      sx={{
        borderRadius: "20px",
        // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        item
        xs={6}
        md={3}
        lg={4}
        height={{
          xs: "50%",
          sm: "50%",
          md: "100%",
        }}
      >
        <Box
          ref={wrapperRef}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          sx={{
            opacity: 1,
            position: "relative",
            width: "100%",
            height: "100%",
            border: "2px dashed #569DAA",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f5f8ff",
            "&:hover": {
              opacity: 0.8,
              transition: "all 0.2s ease-in-out",
            },
            "&.dragover": {
              opacity: 0.8,
              transition: "all 0.2 s ease-in-out",
            },
          }}
        >
          <Stack
            spacing={1}
            sx={{
              // opacity: 0.7,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
              width: "80%",
              height: "100%",
            }}
          >
            <FileUploadOutlinedIcon
              sx={{
                color: "#569DAA",
                fontSize: "80px",
              }}
            />
            <Typography
              color="var(--avatar-color)"
              height="20%"
              align="center"
              sx={{
                fontSize: { xs: 12, sm: 13, md: 14, lg: 15 },
              }}
            >
              Drag & Drop your files here or Click to browse files
            </Typography>
          </Stack>
          <input
            type="file"
            value=""
            onChange={onFileDrop}
            style={{
              opacity: 0,
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              cursor: "pointer",
            }}
          />
        </Box>
      </Grid>
      <Grid
        container
        item
        xs={5}
        sm={4}
        md={3}
        lg={2}
        height={{
          xs: "45%",
          sm: "45%",
          md: "100%",
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: "var(--padding-item)",
        }}
      >
        <Stack
          height={{
            xs: "50%",
            md: "20%",
          }}
        >
          <Typography
            color="#569DAA"
            align="center"
            sx={{
              fontSize: { xs: 12, sm: 13, md: 17, lg: 22 },
              fontFamily: "var(--font-raleway)",
              fontWeight: "bold",
            }}
          >
            Tải lên file
          </Typography>
          <Typography
            color="var(--avatar-color)"
            align="center"
            sx={{
              fontSize: { xs: 12, sm: 13, md: 14, lg: 15 },
            }}
          >
            chứa thông tin về các xe mới
          </Typography>
        </Stack>
        <ButtonNina content="Tải lên" />
      </Grid>
      <Grid
        container
        item
        sm={10}
        md={6}
        lg={6}
        pt={"var(--padding-item)"}
        height={{
          xs: "50%",
          sm: "50%",
          md: "100%",
          lg: "100%",
        }}
      >
        <Stack
          direction={"row"}
          spacing={2}
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "#f5f8ff",
              borderRadius: "20px",
              overflowY: "auto",
              border: "2px solid #569DAA",
              p: "var(--padding-item)",
            }}
          >
            {fileList.length > 0 ? (
              <>
                {fileList.map((item, index) => (
                  <Stack
                    direction={"row"}
                    key={index}
                    sx={{
                      height: "33%",
                      width: "100%",
                      position: "relative",
                      display: "flex",
                      border: "1.5px solid var(--border-color)",
                      backgroundColor: "#fff",
                      p: "calc(var(--padding-item)/2)",
                      borderRadius: "15px",
                      mb: "var(--padding-item)",
                    }}
                  >
                    <Image
                      duration={0}
                      src={
                        ImageConfig[item.type.split("/")[1]] ||
                        ImageConfig["default"]
                      }
                      height="100%"
                      width="10%"
                      fit="fit"
                    />
                    <Stack
                      direction={"row"}
                      sx={{
                        width: "90%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        pl: "calc(var(--padding-item)/2)",
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontSize: { xs: 12, sm: 13, md: 14, lg: 15 },
                            fontFamily: "var(--font-inter)",
                            fontWeight: "bold",
                            color: "var(--title-color)"
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          color="var(--avatar-color)"
                          sx={{
                            fontSize: { xs: 12, sm: 13, md: 14, lg: 15 },
                            fontFamily: "var(--font-inter)",
                          }}
                        >
                          {(item.size / (1024 * 1024)).toFixed(2)}MB
                        </Typography>
                      </Box>
                      <IconButton size="small" onClick={() => fileRemove(item)}>
                        <CloseIcon />
                      </IconButton>
                    </Stack>
                  </Stack>
                ))}
              </>
            ) : null}
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
};

export default DropFileInput;
