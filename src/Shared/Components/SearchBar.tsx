import { InputAdornment, styled, TextField } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';

const StyledSearchbar = styled(TextField)({
  "& .MuiInputBase-root": {
    borderRadius: "22px"
  }
})

interface ISearchBarProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const SearchBar = (props: ISearchBarProps) => {
  const { value, onChange, onSubmit } = props;

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: "500px", width: "100%" }}>
      <StyledSearchbar value={value} onChange={onChange} fullWidth sx={{ maxWidth: "500px", width: "100%" }} placeholder="Search" InputProps={{
        endAdornment: (
          <InputAdornment position="end" sx={{ cursor: "pointer" }}>
            <SearchIcon />
          </InputAdornment>
        )
      }} />
    </form>
  )
}