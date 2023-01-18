import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/material/styles';

const rootBoxSx: SxProps = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%"
}

interface IProgress {
  showLoader?: boolean;
}

function Progress(props: IProgress) {
  const {showLoader} = props;
  return (
    <Box sx={rootBoxSx}>
      {showLoader? <CircularProgress /> : null}
    </Box>
  );
}

export default Progress;
