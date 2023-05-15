import { Box, Avatar, Stack, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";

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
      <Box>
        <CloseIcon
          sx={{ position: "absolute", left: 0, top: 0, fontSize: "40px" }}
          onClick={close}
        />
      </Box>

      <Box
        sx={{
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
        <Stack
          direction="column"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <Avatar>H</Avatar>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <h2>Trung tâm đăng kiểm</h2>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <EmailIcon />
            <span>Email:</span>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PhoneIcon />
            <span>Số điện thoại:</span>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <BusinessIcon />
            <span>Địa chỉ:</span>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default UserInfo;
