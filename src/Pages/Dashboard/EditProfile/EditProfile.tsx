import { Button, Stack, SxProps, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { useDocumentTitle } from 'src/Shared/Hooks/useDocumentTitle';
import { useCustomNavigate } from 'src/Shared/Hooks/useCustomNavigate';
import { IUser } from 'src/Shared/Models/IUser';
import { useAppSelector } from 'src/Shared/Redux/Store';

const rootStackStyle: SxProps = {
    width: "100%"
}
const stackStyle: SxProps = {
    width: "340px",
    minHeight: "500px"
}

const EditProfile = () => {
    useDocumentTitle("Edit Profile")
    const user = useAppSelector(state => state.auth);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const initEmail = useRef("");

    const navigate = useCustomNavigate();

    const onSubmit = async () => {

    }

    const onNavigate = async (route: string) => {
        navigate(route);
    }

    return (
        <Stack sx={rootStackStyle} alignItems="center">
            <Stack sx={stackStyle} spacing={2} justifyContent="center">
                <Typography variant="h4">Profile</Typography>
                <TextField label="First name" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} variant="standard" />
                <TextField label="Last name" value={lastName} onChange={(e) => { setLastName(e.target.value) }} variant="standard" />
                <TextField label="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} variant="standard" />
                <TextField label="Phone number" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} variant="standard" />
                <Button onClick={onSubmit} variant="contained">Save</Button>
            </Stack>
        </Stack>
    );
}

export default EditProfile