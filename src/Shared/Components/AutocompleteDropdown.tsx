import { useState, useRef, useEffect } from "react";
import { Autocomplete, TextField, AutocompleteRenderInputParams, Typography, Stack, SxProps } from "@mui/material";
import { googleAutocomplete } from "src/Shared/Api/GoogleMaps/GoogleAutoComplete";


export interface IAutocompleteOption {
  key: string
  name: string;
  address: string
}

export interface IAutocompleteDropdownProps {
  inputValue?: string;
  sx?: SxProps
  onClickDropdownOption?: (_props: React.HTMLAttributes<HTMLLIElement>, event: React.MouseEvent<HTMLLIElement, MouseEvent>, option: IAutocompleteOption) => void;
  onInputValueChange?: (value) => void;
  renderOption?: (props: React.HTMLAttributes<HTMLLIElement>, option: IAutocompleteOption) => JSX.Element
  renderInput?: (params: AutocompleteRenderInputParams) => JSX.Element
};

export const AutocompleteDropdown = (props: IAutocompleteDropdownProps) => {
  const setTimeoutId = useRef<NodeJS.Timeout>();

  const [autocompleteOptions, setAutocompleteOptions] = useState<IAutocompleteOption[]>([])
  const [autocompleteOptionsLoading, setAutocompleteOptionsLoading] = useState(false)
  const [address, setAddress] = useState("");

  useEffect(() => {
    if(props.inputValue){
      setAddress(props.inputValue)
    }
  }, [props.inputValue])

  useEffect(() => {
    if (address.replace(/\s/g, '').length >= 4) {
      setAutocompleteOptions([])
      setAutocompleteOptionsLoading(true)
      setTimeoutId.current = setTimeout(() => {
        googleAutocomplete({ input: address }, googleAutoCompleteCallback)
      }, 1000)
    } else {
      setAutocompleteOptions([])
    }
    return () => clearTimeout(setTimeoutId.current)
  }, [address])


  const googleAutoCompleteCallback = (result: google.maps.places.QueryAutocompletePrediction[], status: google.maps.places.PlacesServiceStatus) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const requestOptions: IAutocompleteOption[] = result.map((resultItem) => {
        const name = ((resultItem as unknown) as any).structured_formatting.main_text
        const address = resultItem.description
        return { name: name, address: address, key: address }
      });
      setAutocompleteOptions([...requestOptions])
    }
    setAutocompleteOptionsLoading(false)
  }

  const onOptionClick = (_props: React.HTMLAttributes<HTMLLIElement>, event: React.MouseEvent<HTMLLIElement, MouseEvent>, option: IAutocompleteOption) => {
    _props.onClick(event);
    if (props.onClickDropdownOption ) {
      props.onClickDropdownOption(_props, event, option)
    }
  }

  const onInputChange = (value: string) => {
    setAddress(value)
    if (props.onInputValueChange ) {
      props.onInputValueChange(value);
    }
  }

  return (
    <Autocomplete
      fullWidth
      freeSolo
      loading={autocompleteOptionsLoading}
      options={autocompleteOptions}
      getOptionLabel={(option: IAutocompleteOption) => option.name}
      noOptionsText={address.length > 5 ? "Please enter correct address" : address.length === 0 ? "Start typing..." : "Please be more specific"}
      sx={{...props.sx}}
      renderOption={(_props, option) => (
        props.renderOption ? props.renderOption(_props, option) :
          (
            <li {..._props} onClick={(event) => onOptionClick(_props, event, option)} key={option.key}>
              <Stack>
                <Typography variant="body1">{option.name}</Typography>
                <br />
                <Typography variant="caption">{option.address}</Typography>
              </Stack>
            </li>
          )
      )}
      renderInput={(params) => (
        props.renderInput ?
          props.renderInput(params) :
          <TextField
            {...params}
            InputProps={{...params.InputProps, endAdornment: <></>}}
            inputProps={{...params.inputProps, value: address}}
            onChange={(e) => onInputChange(e.target.value)}
            label="Address"
            variant="outlined"
            fullWidth
          />
      )}
    />
  )
}
