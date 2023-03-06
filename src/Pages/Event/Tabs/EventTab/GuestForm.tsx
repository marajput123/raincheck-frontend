import { Button, Card, Stack, SxProps } from "@mui/material";
import { styleCardBoxShadow } from "src/Shared/Contants";
import { EmptyString } from "src/Shared/Helpers";
import { useForm } from "react-hook-form";
import { FormTextField } from "src/Shared/Components/FormFields/FormTextField";
import { emailPattern } from "src/Shared/Validation";

const style: SxProps = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 280,
  bgcolor: 'background.paper',
  boxShadow: styleCardBoxShadow,
  padding: "40px 25px",
  borderRadius: "30px"
};

export interface IGuestRsvpForm {
  firstName: string;
  lastName: string;
  email: string;
}

interface IGuestRsvpFormProps {
  onRsvp: (formData: IGuestRsvpForm) => void
}


export const GuestRsvpForm = (props: IGuestRsvpFormProps) => {
  const { onRsvp } = props;
  const { control, handleSubmit } = useForm<IGuestRsvpForm>({
    defaultValues: {
      firstName: EmptyString,
      lastName: EmptyString,
      email: EmptyString,
    }
  });

  const onSubmit = (data: IGuestRsvpForm) => {
    onRsvp(data);
  }

  return (
    <Card sx={style}>
      <Stack spacing={3}>
        <FormTextField
          controllerProps={{
            control,
            rules: {
              required: "Email is required",
              pattern: {value: emailPattern, message: "Must be a valid email"}
            },
            name: "email"
          }}
          label="Email"
        />
        <FormTextField
          controllerProps={{
            control,
            rules: { required: "First name is required" },
            name: "firstName"
          }}
          label="First name"
        />
        <FormTextField
          controllerProps={{
            control,
            rules: { required: "Last name is required" },
            name: "lastName"
          }}
          label="Last name"
        />
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>RSVP</Button>
      </Stack>
    </Card>
  )
};