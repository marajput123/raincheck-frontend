import { Container, Stack, SxProps, Typography } from '@mui/material';
import { useDocumentTitle } from 'src/Shared/Hooks/useDocumentTitle';
import notExistSVG from "src/Shared/Svg/notExist.svg"

const rootStackStyle: SxProps = {
  width: "100%"
}

export const PageNotFoundPage = () => {
  useDocumentTitle("Edit Event")

  return (
    <Container>
      <Stack sx={rootStackStyle} alignItems="center">
        <img src={notExistSVG} style={{ maxHeight: "500px", height: "100%" }} />
        <Typography variant='h3' sx={{ fontWeight: 600 }}>Page not found</Typography>
      </Stack>
    </Container>
  );
}
