import { Box, CircularProgress, SxProps } from "@mui/material";

const spinnerStyle: SxProps = {
  display: "flex",
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center"
}

export const Spinner = () => {
  return (
    <Box sx={spinnerStyle}>
      <CircularProgress />
    </Box>
  )
}