import { useRef, useState } from "react";
import { Box } from "@mui/material"
import { EmptyString } from "src/Shared/HelperMethods";
import { useCustomNavigate } from "src/Shared/Hooks/useCustomNavigate";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "src/Shared/Components/SearchBar";

export const ExploreSearchbar = () => {
  const timerRef = useRef<NodeJS.Timer>();
  const navigate = useCustomNavigate();
  const [searchParams] = useSearchParams();
  const [searchBarInput, setSearchBarInput] = useState(searchParams.get("q") ?? EmptyString);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBarInput(e.target.value);
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (searchBarInput) {
      navigate(`/search?q=${searchBarInput}`);
    }
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%", position: "relative" }}>
      <SearchBar value={searchBarInput} onChange={onChange} onSubmit={onSubmit} />
    </Box>
  )
}


