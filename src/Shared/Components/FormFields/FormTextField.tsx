import TextField from "@mui/material/TextField";
import { useController, UseControllerProps } from "react-hook-form";
import { EmptyString } from "src/Shared/HelperMethods";

interface IFormTextFieldProps<T> {
  label: string;
  controllerProps: UseControllerProps<T>
}

export const FormTextField = <T extends any>(props: IFormTextFieldProps<T>) => {
  const { controllerProps, label } = props;;
  const { field, fieldState } = useController(controllerProps);

  return (
    <>
      <TextField
        {...field}
        label={label}
        error={!!fieldState.error}
        helperText={
          !!fieldState.error ?
            fieldState.error.message :
            EmptyString
        }
      />
    </>

  );
}