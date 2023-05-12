import { Box, Avatar, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const UserInfo = ({ close }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        color: "black",
        backgroundColor: "rgba(255, 255, 255,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        textAlign: "center",
      }}
    >
      <CloseIcon
        sx={{ position: "absolute", left: 0, top: 0, fontSize: "40px" }}
        onClick={close}
      />

      <Box
        sx={{
          backgroundColor: "rgb(182, 117, 117)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          p: 1.5,
          border: "2px solid var(--secondary-color)",
          bgcolor: "var(--secondary-color)",
          borderRadius: 3,
          width: "40%",
          height: "80%",
        }}
      >
        <Stack spacing={2}>
          <Avatar>H</Avatar>
          <Box>
            <h2>Trung tâm đăng kiểm</h2>
          </Box>
          <div>Số điện thoại:</div>
          <div>Địa chỉ:</div>
        </Stack>
      </Box>
    </Box>
  );
};

export default UserInfo;
