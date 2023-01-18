import { Typography, Stack, SxProps, Button } from "@mui/material";
import { useDocumentTitle } from "src/Shared/Hooks/useDocumentTitle";
import { useCustomNavigate } from "src/Shared/Hooks/useCustomNavigate";
import { useAppSelector } from "src/Shared/Redux/Store";
import Navbar from "src/Shared/Components/Navbar";

const rootStackStyle: SxProps = {
  maxHeight: "900px",
  height: "90vh",
}
const stackStyle: SxProps = {
  paddingBottom: "20px"
}

export const LandingPage = () => {
  useDocumentTitle("Home")
  const auth = useAppSelector(state => state.auth);
  const navigate = useCustomNavigate();

  const onNavigate = (route: string) => {
    navigate(route)
  }

  return (
    <>
      <Navbar />
      <Stack
        sx={rootStackStyle}
        direction="column"
        justifyContent="center"
      >
        <Stack
          sx={stackStyle}
        >
          <Typography variant="h2">Let's create an event.</Typography>
          <Typography variant="h2">Now.</Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-start"
          spacing={2}
        >
          <Button
            onClick={() => auth.isAuthenticated ? onNavigate("/app") : onNavigate("/home")}
          >
            Search events
          </Button>
        </Stack>
      </Stack>
    </>
  );
};
