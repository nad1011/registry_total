import { useRef, useState } from "react";

import { Box, Grid, Stack, Typography, IconButton } from "@mui/material";
import { Close, FileUploadOutlined } from "@mui/icons-material";
import Image from "mui-image";

import { ImageConfig } from "../ImageConfig";
import ButtonNina from "./ButtonNina/ButtonNina";

import { fireDB } from "../database/firebase";
import { arrayUnion, doc, getDoc, writeBatch } from "firebase/firestore";

import { faker } from "@faker-js/faker";
import Papa from "papaparse";

const FileUploadArea = () => {
  const [fileList, setFileList] = useState([]);

  const wrapperRef = useRef(null);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const addFile = (e) => {
    const file = e.target.files[0];
    const extension = file.type.split("/")[1];
    if (extension === "csv") setFileList([...fileList, file]);
    e.target.value = "";
  };

  const removeFile = (file) => setFileList(fileList.filter((item) => item !== file));

  const generateCertId = () => {
    let id = faker.string.alphanumeric({ length: 12, casing: "upper" });
    getDoc(doc(fireDB, "certificate", id)).then((doc) => {
      if (doc.exists()) id = generateCertId();
    });
    return id;
  };

  const handleUpload = () => {
    const reader = new FileReader();
    const batch = writeBatch(fireDB);

    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      if (!parsedData) return;
      parsedData.pop();

      for (const row of parsedData) {
        const {
          id,
          address,
          name,
          email,
          tel,
          type,
          dateOfBirth,
          occupation,
          representative,
          vin,
          ...car
        } = row;

        let owner = { address, name, email, tel, type };
        owner =
          owner.type === "personal"
            ? { ...owner, dateOfBirth, occupation }
            : { ...owner, representative };
        const ownerRef = doc(fireDB, "owner", id);

        const certId = generateCertId();
        const certRef = doc(fireDB, "certificate", certId);

        car.cert = certRef;
        car.type = car["type_1"];
        car.owner = ownerRef;
        car.curbWeight = `${car.curbWeight} (ton)`;
        car.maxOutput = `${car.maxOutput}(kW)`;
        car.overallDimension = `${car.overallDimension} (m)`;
        car.wheelTread = `${car.wheelTread} (m)`;
        const { year, manufacturer, country } = car;
        car.mfg = { year, manufacturer, country };
        delete car["type_1"];
        delete car.year;
        delete car.manufacturer;
        delete car.country;
        const carRef = doc(fireDB, "car", vin);

        batch.set(certRef, {
          center: "None",
          car: carRef,
        });
        batch.set(carRef, car);
        const ownerDoc = await getDoc(ownerRef);
        if (ownerDoc.exists()) batch.update(ownerRef, { ownedCars: arrayUnion(carRef) });
        else batch.set(ownerRef, { ...owner, ownedCars: [carRef] });
      }

      await batch.commit();
    };

    fileList.forEach((file) => reader.readAsText(file));

    setFileList([]);
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
              width: "80%",
              height: "100%",
            }}
          >
            <FileUploadOutlined
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
            accept=".csv"
            onChange={addFile}
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
        <ButtonNina content="Tải lên" onClick={handleUpload} />
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
                      src={ImageConfig[item.type.split("/")[1]] || ImageConfig["default"]}
                      height="100%"
                      width="10%"
                      fit="fill"
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
                            color: "var(--title-color)",
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
                      <IconButton size="small" onClick={() => removeFile(item)}>
                        <Close />
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

export default FileUploadArea;
