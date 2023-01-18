import { Button, Stack, TextField, Typography } from "@mui/material"
import { DatePicker, LocalizationProvider, MobileDatePicker, MobileDateTimePicker, MobileTimePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { IEvent } from "src/Shared/Models/IEvent";

export interface ICreateEventFormData {
  name: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  description: string;
  link: string;
  url: string;
  date: string;
}

interface IBasicTab {
  updateForm: (event: ICreateEventFormData) => void;
}


export const BasicsTab = (props: IBasicTab) => {
  const {updateForm} = props;
  const { control, handleSubmit, formState: { errors } } = useForm<ICreateEventFormData>()

  const onSubmit = (data: ICreateEventFormData) => {
    updateForm(data)
  }

  return (
    <>
      <Typography variant="h3">
        Create Event
      </Typography>
      <Controller
        name="name"
        defaultValue=""
        control={control}
        rules={{ required: "Event name is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Event Name"
            variant="standard"
            error={!!errors.name?.message}
            helperText={errors.name?.message}
          />
        )}
      />
      <Stack direction="row" spacing={1}>
        <Controller
          name="date"
          control={control}
          defaultValue={""}
          rules={{ required: "Please select date." }}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDateTimePicker
                label="Select Date"
                value={field.value}
                onChange={field.onChange}
                renderInput={(params) => (
                  <TextField
                    {...field}
                    {...params}
                    variant="standard"
                    sx={{ width: "100%"}}
                    error={!!errors.date?.message}
                    helperText={errors.date?.message}
                  />
                )}
              />
            </LocalizationProvider>
          )}
        />
      </Stack>
      <Controller
        name="link"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Meeting Link"
            variant="standard"
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        defaultValue=""
        rules={{required: "Please enter description for the event."}}
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            multiline
            rows={4}
            variant="standard"
            error={!!errors.description?.message}
            helperText={errors.description?.message}
          />
        )}
      />
      <Stack sx={{ paddingTop: "10px" }} justifyContent="space-between" direction="row">
        <Button variant="contained">Cancel</Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>Next</Button>
      </Stack>
    </>
  )
}
