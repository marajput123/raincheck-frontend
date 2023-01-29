import { useState } from 'react';
import { TextField, Typography, Button, Stack, SxProps, Box, Checkbox, FormControlLabel, Alert } from '@mui/material';
import { useDocumentTitle } from 'src/Shared/Hooks/useDocumentTitle';
import { useCustomNavigate } from 'src/Shared/Hooks/useCustomNavigate';
import { useAppDispatch } from 'src/Shared/Redux/Store';
import { loginAction } from 'src/Shared/Redux/AuthSlice/Actions';
import { Controller, useForm } from 'react-hook-form';
import { ServerErrorTypes } from 'src/Shared/Contants';

const rootStackStyle: SxProps = {
    width: "100%"
}
const stackStyle: SxProps = {
    width: "330px",
    minHeight: "500px",
    paddingTop:"20px"
}

interface IFormData {
    email: string;
    password: string;
    staySignedIn: boolean
}

const Login = () => {
    useDocumentTitle("Login");
    
    const [apiError, setApiError] = useState(false)
    const dispatch = useAppDispatch()
    const navigate = useCustomNavigate();

    const { handleSubmit, control, reset, formState: { errors, } } = useForm<IFormData>({
        defaultValues: {
            email: "",
            password: "",
            staySignedIn: false
        },
        shouldFocusError: true
    });
    

    const onSubmit = async (data: IFormData) => {
        const { email, password, staySignedIn } = data
        try {
            const action = await dispatch(loginAction({ credentials: {username: email, password: password}, presist: staySignedIn })).unwrap()
            if (action) {
                onNavigate("/app")
            }
        } catch (err: any) {
            console.log(err)
            if (err?.error?.length !== 0) {
                if (err.error[0].type === ServerErrorTypes.ACCOUNT_UNCONFIRMED) {
                    onNavigate(`/auth/verify?username=${email}`)
                }
            }
            setApiError(true)
        }
    }

    const onNavigate = async (route: string) => {
        navigate(route);
    }

    const renderAlert = () => (
        <Alert severity="error">Hmmm, something went wrong. Try again later ^_^</Alert>
    )

    return (
        <Stack sx={rootStackStyle} alignItems="center">
            <Stack sx={stackStyle} spacing={2}>
                <Typography variant="h3">Log In</Typography>
                {apiError ? renderAlert() : null}
                <Controller
                    name="email"
                    control={control}
                    rules={{ required: "Please enter your email" }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label={"Email"}
                            error={!(!errors.email?.message)}
                            helperText={errors.email?.message}
                            variant="outlined"
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    rules={{ required: "Please enter your password" }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label={"Password"}
                            error={!(!errors.password?.message)}
                            helperText={errors.password?.message}
                            variant="outlined"
                        />
                    )}
                />
                <Controller
                    name="staySignedIn"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={field.value}
                                />
                            }
                            label="Stay signed in?"
                            onClick={field.onChange}
                        />
                    )}
                />
                <Button onClick={handleSubmit(onSubmit)} variant="contained">Log In</Button>
                <Typography
                    variant="body1"
                >
                    Dont have an account?
                    <Box
                        style={{ cursor: 'pointer' }}
                        component="span"
                        fontWeight='fontWeightMedium'
                        onClick={() => onNavigate('/sign-up')}
                    >
                        {" "}Click here
                    </Box>
                </Typography>
            </Stack>
        </Stack>
    );
}

export default Login;
