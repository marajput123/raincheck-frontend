import { useEffect, useState } from "react";
import { Button, IconButton, Stack, TextField, useTheme } from "@mui/material"
import { constructQueryFromParams, constructUri, EmptyString } from "src/Shared/Helpers";
import { useCustomNavigate } from "src/Shared/Hooks/useCustomNavigate";
import { useLocation, useSearchParams } from "react-router-dom";
import { AutocompleteDropdown } from "src/Shared/Components/AutocompleteDropdown";
import moment from "moment";
import { useCustomSearchParams } from "src/Shared/Hooks/useCustomSearchParams";
import SearchIcon from '@mui/icons-material/Search';

const useQuery = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
}

interface IExploreSearchBar {
  searchUri: string;
}

export const ExploreSearchbar = (props: IExploreSearchBar) => {
  const { searchUri } = props;
  const theme = useTheme();
  const navigate = useCustomNavigate();
  const { searchParams, getSearchParamQuery, constructUri } = useCustomSearchParams();
  const [eventTitle, setEventTitle] = useState(searchParams.get("q") ?? EmptyString);
  const [address, setAddress] = useState(searchParams.get("_address") ?? EmptyString);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventTitle(e.target.value);
  }

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch()
  }

  const onSearch = () => {
    if (eventTitle) {
      const intialDate = moment(new Date).format("YYYY-MM-DD");
      const uri = constructUri(
        searchUri,
        {
          "startDate[$gte]": intialDate,
          q: eventTitle,
          _address: address
        }, true);
      navigate(uri);
    }
  };

  return (
      <form style={{ maxWidth: "500px", minWidth: "350px", width: "100%" }} onSubmit={onFormSubmit}>
        <Stack spacing={1} direction="row">
          <TextField
            value={eventTitle}
            onChange={onChange}
            fullWidth
            label="Search"
          />
          <AutocompleteDropdown
            inputValue={address}
            onInputValueChange={(value) => setAddress(value)}
            onClickDropdownOption={(_, __, option) => {
              setAddress(option.address)
            }}
          />
          <IconButton type="submit" sx={{ borderRadius: theme.shape.borderRadius }} onClick={onSearch}>
            <SearchIcon />
          </IconButton>
        </Stack>
      </form>
  )
}


