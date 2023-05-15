import { Box, Avatar, Stack, Divider, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import LogoutIcon from "@mui/icons-material/Logout";

const UserInfo = ({ close }) => {
  const closeOutsideBox = (e) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  const logOutHandle = () => {
    console.log("dang xuat");
  };

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
      onClick={closeOutsideBox}
    >
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
          position: "relative",
        }}
      >
        <Box>
          <CloseIcon
            sx={{ position: "absolute", left: 0, top: 0, fontSize: "40px" }}
            onClick={close}
          />
        </Box>

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
            <EmailIcon sx={{ marginRight: "8px" }} />
            <span>Email:</span>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PhoneIcon sx={{ marginRight: "8px" }} />
            <span>Số điện thoại:</span>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <BusinessIcon sx={{ marginRight: "8px" }} />
            <span>Địa chỉ:</span>
          </Box>
          <br />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button onClick={logOutHandle}>
              <LogoutIcon sx={{ marginRight: "8px" }} onClick={logOutHandle} />
              Đăng xuất
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default UserInfo;
