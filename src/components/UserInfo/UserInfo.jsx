import { Stack, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import { Sheet, Box } from "@mui/joy";
//
import { user } from "../../database/dexie";

const UserInfo = ({ open, close }) => {
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={close}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}
      >
        <ModalClose
          variant="outlined"
          sx={{
            top: "calc(-1/4 * 40px)",
            right: "calc(-1/4 * 40px)",
            boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
            borderRadius: "50%",
            bgcolor: "background.body",
          }}
        />
        <Typography
          component="h2"
          id="modal-title"
          level="h3"
          textColor="inherit"
          fontWeight="lg"
          mb={1}
        >
          Trung tâm đăng kiểm {user.id}
        </Typography>
        <Stack
          height={"30vh"}
          width={"30vw"}
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "flex-start",
            pl: "10%",
          }}
        >
          <Typography
            id="modal-desc"
            textColor="inherit"
            fontWeight="lg"
            fontSize={18}
            startDecorator={<EmailIcon />}
          >
            Email:
          </Typography>
          <Typography
            id="modal-desc"
            textColor="inherit"
            fontWeight="lg"
            fontSize={18}
            startDecorator={<PhoneIcon />}
          >
            Số điện thoại:
          </Typography>
          <Typography
            id="modal-desc"
            textColor="inherit"
            fontWeight="lg"
            fontSize={18}
            startDecorator={<BusinessIcon />}
          >
            Địa chỉ:
          </Typography>
          <Box
            width={"110%"}
            display={"flex"}
            justifyContent={"center"}
            ml={"-10%"}
          >
            <Button
              sx={{
                backgroundColor: "whitesmoke",
                color: "black",
                fontWeight: "bold",
                boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
                "&:hover": {
                  backgroundColor: "var(--border-color)",
                  color: "black",
                  // boxShadow: "none",
                },
              }}
              size="lg"
              variant="solid"
            >
              <LogoutIcon /> Đăng xuất
            </Button>
          </Box>
        </Stack>
      </Sheet>
    </Modal>
  );
};

export default UserInfo;
