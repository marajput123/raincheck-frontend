import { Box, Button, Container, Stack, SxProps, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { useDocumentTitle } from 'src/Shared/Hooks/useDocumentTitle';
import { useCustomNavigate } from 'src/Shared/Hooks/useCustomNavigate';
import { IUser } from 'src/Shared/Models/User/IUser';
import { useAppSelector } from 'src/Shared/Redux/Store';
import comingSoon from "src/Shared/Svg/comingSoon.svg"

const rootStackStyle: SxProps = {
  width: "100%"
}

export const EventSettingPage = () => {
  useDocumentTitle("Edit Event")

  return (
    <Container>
      <Stack sx={rootStackStyle} alignItems="center">
        <Box sx={{ width: "100%", maxWidth: "500px" }}>
          <img src={comingSoon} />
        </Box>
        <Typography variant='h3' sx={{fontWeight: 600}}>Coming soon 🚀</Typography>
      </Stack>
    </Container>
  );
}
