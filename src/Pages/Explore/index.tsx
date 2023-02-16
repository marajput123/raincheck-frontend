import { Stack, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useDocumentTitle } from "src/Shared/Hooks/useDocumentTitle";
import { ExploreSearchbar } from "./ExploreSearchBar";


export const ExplorePage = () => {
  useDocumentTitle("Explore");

  return (
    <Container maxWidth="xxl">
      <Stack alignItems={"center"} sx={{paddingTop: "20px"}}>
        <ExploreSearchbar />
        <Outlet />
      </Stack>
    </Container>
  );
};




