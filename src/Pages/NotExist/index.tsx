import { Box, Button, Container, Stack, SxProps, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { useDocumentTitle } from 'src/Shared/Hooks/useDocumentTitle';
import { useCustomNavigate } from 'src/Shared/Hooks/useCustomNavigate';
import { IUser } from 'src/Shared/Models/User/IUser';
import { useAppSelector } from 'src/Shared/Redux/Store';
import notExistSVG from "src/Shared/Svg/notExist.svg"

const rootStackStyle: SxProps = {
  width: "100%"
}

export const NotExistPage = () => {
  useDocumentTitle("Edit Event")

  return (
    <Container>
      <Stack sx={rootStackStyle} alignItems="center">
        <Box sx={{ width: "100%" }}>
          <img src={notExistSVG} />
        </Box>
        <Typography variant='h3' sx={{fontWeight: 600}}>Page not found</Typography>
      </Stack>
    </Container>
  );
}
