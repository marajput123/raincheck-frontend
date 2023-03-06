import { Stack, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useDocumentTitle } from "src/Shared/Hooks/useDocumentTitle";
import { ExploreSearchbar } from "./SearchBar";


export const ExplorePage = () => {
  useDocumentTitle("Explore");

  return (
    <Container maxWidth="xxl">
      <Stack alignItems={"center"} sx={{padding: "20px 0px"}}>
        <ExploreSearchbar searchUri="/search" />
        <Outlet />
      </Stack>
    </Container>
  );
};




