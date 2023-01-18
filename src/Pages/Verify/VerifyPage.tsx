import { Typography, Stack, SxProps, Button, TextField } from "@mui/material";
import { useDocumentTitle } from "src/Shared/Hooks/useDocumentTitle";
import { useCustomNavigate } from "src/Shared/Hooks/useCustomNavigate";
import { useAppDispatch, useAppSelector } from "src/Shared/Redux/Store";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { confirmAccount } from "src/Shared/Api/Auth";

const rootStackStyle: SxProps = {
  width: "100%"
}
const stackStyle: SxProps = {
  width: "340px",
  minHeight: "500px",
  paddingTop:"20px"
}

export const VerifyPage = () => {
  useDocumentTitle("Eventhub")
  const navigate = useCustomNavigate();

  const [confirmationCode, setConfirmationCode] = useState("")
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");

  useEffect(() => {
    console.log(searchParams.get("username"))
    if (!username) {
      onNavigate("/auth/login")
    }
  }, [])

  const onConfirmAccount = async () => {
    if (username) {
      try {
        await confirmAccount({username, confirmationCode})
        onNavigate("/auth/login")
      } catch (err) {
        console.log(err)
      }
    }
  }

  const onNavigate = (route: string) => {
    navigate(route)
  }

  return (
    <Stack sx={rootStackStyle} alignItems="center">
      <Stack sx={stackStyle} spacing={2}>
        <Typography variant="h3">Verify</Typography>
        <TextField
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
          label={"Confirmation code"}
          variant="standard"
        />
        <Button onClick={onConfirmAccount}>Confirm</Button>
      </Stack>
    </Stack>
  );
};
