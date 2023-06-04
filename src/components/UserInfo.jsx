import { Stack, Button } from "@mui/material";
import { Logout, Email, Phone, Business } from "@mui/icons-material";
import { Sheet, Box, ModalClose, Typography, Modal } from "@mui/joy";

import { user } from "../database/cache";
import { useNavigate } from "react-router";

const UserInfo = ({ open, close }) => {
  const navigate = useNavigate();

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
          pb: 1,
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
          mb={1}
          sx={{
            fontFamily: "var(--font-roboto)",
            fontWeight: "bold",
            color: "var(--title-color)",
          }}
        >
          {user.id === "hq" ? "Cục đăng kiểm" : `Trung tâm đăng kiểm ${user.id}`}
        </Typography>
        <Stack
          height={"40vh"}
          width={"100%"}
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "flex-start",
            pl: "10%",
          }}
        >
          <Typography
            id="modal-desc"
            startDecorator={<Email />}
            sx={{
              fontFamily: "var(--font-inter)",
              fontWeight: "bold",
              color: "var(--font2-color)",
            }}
          >
            Email: {user.email}
          </Typography>
          <Typography
            id="modal-desc"
            sx={{
              fontFamily: "var(--font-inter)",
              fontWeight: "bold",
              color: "var(--font2-color)",
            }}
            startDecorator={<Phone />}
          >
            Số điện thoại: {user.tel}
          </Typography>
          <Typography
            id="modal-desc"
            sx={{
              fontFamily: "var(--font-inter)",
              fontWeight: "bold",
              color: "var(--font2-color)",
            }}
            startDecorator={<Business />}
          >
            Địa chỉ: {user.address}
          </Typography>
          <Box width={"110%"} display={"flex"} justifyContent={"center"} ml={"-10%"}>
            <Button
              onClick={() => navigate("/")}
              sx={{
                backgroundColor: "var(--background-color)",
                border: "1.5px solid var(--background-color)",
                color: "white",
                fontWeight: "bold",
                borderRadius: 3,
                "&:hover": {
                  border: "1.5px solid var(--border-color)",
                  backgroundColor: "white",
                  color: "var(--title-color)",
                },
              }}
              size="lg"
              variant="solid"
            >
              <Logout /> Đăng xuất
            </Button>
          </Box>
        </Stack>
      </Sheet>
    </Modal>
  );
};

export default UserInfo;
