import { useEffect, useState } from 'react';
import { TextField, Typography, Button, Stack, SxProps, Box, Alert } from '@mui/material';
import { useDocumentTitle } from 'src/Shared/Hooks/useDocumentTitle';
import { useCustomNavigate } from 'src/Shared/Hooks/useCustomNavigate';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from 'src/Shared/Redux/Store';
import { SignUpAction } from 'src/Shared/Redux/AuthSlice/Actions';
import { signUp } from 'src/Shared/Api/Auth';
import { EmptyString } from 'src/Shared/Helpers';

const rootStackStyle: SxProps = {
    width: "100%"
}
const stackStyle: SxProps = {
    width: "340px",
    minHeight: "500px",
    paddingTop: "20px"
};

interface IFormData {
    username: string
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
    retypePassword: string;
}

const SignUp = () => {
    useDocumentTitle("Sign up")
    const dispatch = useAppDispatch();
    const navigate = useCustomNavigate();
    const { handleSubmit, control, formState: { errors }, setError } = useForm<IFormData>();

    const [errorAlert, setErrorAlert] = useState({ message: EmptyString, show: false })
    

    const onSubmit = async (data: IFormData) => {
        const { username, email, firstName, lastName, password, phoneNumber } = data;
        setErrorAlert(previousState => ({ ...previousState, show: false }))
        try {
            await dispatch(SignUpAction({
                username,
                email,
                firstName,
                lastName,
                phoneNumber,
                password
            })).unwrap();
            onNavigate(`/auth/verify?username=${username}`)
        } catch (err: any) {
            if (err?.error) {
                err.error.map((errorObj: any) => {
                    if (errorObj.field === "email") {
                        setError("email", { message: errorObj.errorMessage })
                    } if (errorObj.field === "username") {
                        setError("username", { message: errorObj.errorMessage })
                    }
                })
            } else {
                setErrorAlert({ message: "Server is having a stomach ache. Please try again later ^_^", show: true })
            }
        }
    }

    const onNavigate = async (route: string) => {
        navigate(route);
    }

    const renderAlert = () => (
        <Alert severity='error'>{errorAlert.message}</Alert>
    )

    return (
        <Stack sx={rootStackStyle} alignItems="center">
            <Stack sx={stackStyle} spacing={2}>
                <Typography variant="h3">
                    Sign Up
                </Typography>
                {errorAlert.show ? renderAlert() : null}
                <Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Please enter your username" }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label={"Username"}
                            error={!(!errors.username?.message)}
                            helperText={errors.username?.message}
                            variant="standard"
                        />
                    )}
                />
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Please enter your email" }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label={"Email"}
                            error={!(!errors.email?.message)}
                            helperText={errors.email?.message}
                            variant="standard"
                        />
                    )}
                />
                <Controller
                    name="firstName"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Please enter your first name" }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label={"First name"}
                            error={!(!errors.firstName?.message)}
                            helperText={errors.firstName?.message}
                            variant="standard"
                        />
                    )}
                />
                <Controller
                    name="lastName"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Please enter your last name" }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label={"Last name"}
                            error={!(!errors.lastName?.message)}
                            helperText={errors.lastName?.message}
                            variant="standard"
                        />
                    )}
                />
                <Controller
                    name="phoneNumber"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Please enter your phone number" }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label={"Phone number"}
                            error={!(!errors.phoneNumber?.message)}
                            helperText={errors.phoneNumber?.message}
                            variant="standard"
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Please enter your password" }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label={"Password"}
                            error={!(!errors.password?.message)}
                            helperText={errors.password?.message}
                            variant="standard"
                        />
                    )}
                />
                <Controller
                    name="retypePassword"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Please retype your password" }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label={"Retype password"}
                            error={!(!errors.retypePassword?.message)}
                            helperText={errors.retypePassword?.message}
                            variant="standard"
                        />
                    )}
                />
                <Button onClick={handleSubmit(onSubmit)} variant="contained">Sign Up</Button>
                <Typography variant="body1">Dont have an account?<Box style={{ cursor: 'pointer' }} component="span" fontWeight='fontWeightMedium' onClick={() => onNavigate('../login')}> Click here</Box></Typography>
            </Stack>
        </Stack>
    );
}

export default SignUp;
