import {
  Button, Stack, TextField, Typography,
  FormControl, FormLabel, FormControlLabel,
  RadioGroup, Radio, InputAdornment, Checkbox
} from "@mui/material"
import { Controller } from "react-hook-form";
import { ICreateFormTab } from "src/Pages/Dashboard/CreateEvent";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const PersonalizeTab = (props: ICreateFormTab) => {
  const { control, setValue, watch, formState: { errors } } = props.form;

  return (
    <>
      {/* <FormLabel id="info-label">Tell us more about your event!</FormLabel> */}
      <Typography variant="h6">
        Tell us more about your event!
      </Typography>
      <Controller
        name="description"
        defaultValue=""
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            variant="outlined"
            multiline
            rows={4}
          />
        )}
      />
      <FormControl>
        <FormLabel id="isPrivate-label">Is your event public or private?</FormLabel>
        <RadioGroup
          row
          sx={{ display: 'flex' }}
          aria-labelledby="isPrivate-label"
          name="isPrivate"
          value={watch('isPrivate')}
          onChange={(event: any) => {
            setValue('isPrivate', event.target.value);
          }}
        >
          <FormControlLabel value="false" control={<Radio />} label="Public" />
          <FormControlLabel value="true" control={<Radio />} label="Private" />
        </RadioGroup>
      </FormControl>
      <Controller
        name="image"
        defaultValue=""
        control={control}
        render={({ field }) => (
          <Button
            variant="contained"
            startIcon={<AddPhotoAlternateIcon />}
            component="label"
          >
            Upload Image
            <input
              type="file"
              onChange={(event: any) => {
                setValue('image', event.target.files[0]);
              }}
              hidden
            />
          </Button>
        )}
      />
      {/* <FormControlLabel
          control={
          <Controller
          name='private'
          control={control}
          render={({ field }) => (
          <Checkbox
          {...field}
          checked={field.value}
          onChange={field.onChange}
          />
          )}
          />
          }
          label="Private Event"
          /> */}
    </>
  )
}

export default PersonalizeTab;
