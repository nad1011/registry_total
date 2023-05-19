import Page from "../../components/Page/Page";
import CreateAccForm from "../../components/CreateAccForm/CreateAccForm";
import { Box } from "@mui/material";

const CreateAccount = () => {
  return (
    <Page>
      <Box>
        <CreateAccForm />
      </Box>
    </Page>
  );
};

export default CreateAccount;
