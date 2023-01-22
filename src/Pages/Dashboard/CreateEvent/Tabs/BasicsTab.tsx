import {
  Button, Stack, TextField, Typography,
  FormControl, FormLabel, FormControlLabel,
  RadioGroup, Radio, InputAdornment, Checkbox
} from "@mui/material"
import EventIcon from '@mui/icons-material/Event';
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller } from "react-hook-form";
import { ICreateFormTab } from "src/Pages/Dashboard/CreateEvent";

const BasicsTab = (props: ICreateFormTab) => {
  const { control, getValues, setValue, watch, formState: { errors } } = props.form;

  return (
    <>
      <Typography variant="h6">
        Basic Info
      </Typography>
      <FormLabel id="info-label">Tell us <b>what</b>, <b>when</b>, and <b>where</b> your event will be!</FormLabel>
      <Controller
        name="name"
        defaultValue=""
        control={control}
        rules={{ required: "Please enter an event name" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Event Name"
            variant="outlined"
            error={!!errors.name?.message}
            helperText={errors.name?.message}
          />
        )}
      />
      <Controller
        name="date"
        control={control}
        defaultValue=""
        rules={{ required: "Please select a time and date" }}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDateTimePicker
              value={field.value}
              onChange={field.onChange}
              renderInput={(params) => (
                <TextField
                  {...field}
                  {...params}
                  label="Date & Time"
                  variant="outlined"
                  fullWidth
                  error={!!errors.date?.message}
                  helperText={errors.date?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <EventIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </LocalizationProvider>
        )}
      />
      <FormControl>
        <FormLabel id="location-label">Location</FormLabel>
        <RadioGroup
          row
          sx={{ display: 'flex', justifyContent: 'space-between' }}
          aria-labelledby="location-label"
          name="location"
          value={watch('location')}
          onChange={(event: any) => {
            setValue('location', event.target.value);
          }}
        >
          <FormControlLabel value="address" control={<Radio />} label="Address" />
          <FormControlLabel value="virtual" control={<Radio />} label="Virtual" />
          <FormControlLabel value="tba" control={<Radio />} label="TBA" />
        </RadioGroup>
      </FormControl>
      <div hidden={watch('location') !== "address"}>
        <Controller
          name="address"
          defaultValue=""
          control={control}
          rules={{ required: "Please enter event location" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Address"
              variant="outlined"
              fullWidth
              error={!!errors.address?.message}
              helperText={errors.address?.message}
            />
          )}
        />
      </div>
      <div hidden={watch('location') !== "virtual"}>
        <Controller
          name="link"
          defaultValue=""
          control={control}
          rules={{ required: "Please enter a meeting link" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Meeting Link"
              variant="outlined"
              fullWidth
              error={!!errors.link?.message}
              helperText={errors.link?.message}
            />
          )}
        />
      </div>
    </>
  )
}

export default BasicsTab;
