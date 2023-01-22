import {
  Button, Stack, TextField, Typography,
  FormControl, FormLabel, FormControlLabel,
  RadioGroup, Radio, InputAdornment
} from "@mui/material"
import EventIcon from '@mui/icons-material/Event';
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller } from "react-hook-form";
import { ICreateFormTab } from "src/Pages/Dashboard/CreateEvent";

const AdvancedTab = (props: ICreateFormTab) => {
  const { control, setValue, watch, formState: { errors } } = props.form;

  return (
    <>
      <Typography variant="h6">
        Advanced Options
      </Typography>
      <FormLabel id="info-label">Create <b>roles</b>, sign-up <b>forms</b>, and more!</FormLabel>
      <Typography variant="h2">
        Coming Soon...
      </Typography>
      {/* <Stack sx={{ paddingTop: "10px" }} justifyContent="space-between" direction="row">
          <Button variant="contained">Cancel</Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>Next</Button>
          </Stack> */}
    </>
  )
}

export default AdvancedTab;
