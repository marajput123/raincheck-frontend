import { IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface ISummaryTab {
  eventUrl: string
}

const SummaryTab = (props: ISummaryTab) => {
  const { eventUrl } = props;

  return (
    <>
      <Typography variant="h2">
        You're all set!
      </Typography>
      <Typography variant="h5">
        Let's start spreading the word!
      </Typography>
      <TextField
        variant="outlined"
        value={eventUrl}
        disabled
        fullWidth
        multiline
        rows={2}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={async () => {
                await navigator.clipboard.writeText(eventUrl);
              }}>
                <ContentCopyIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {/* <Button onClick={() => onNavigate("/")} variant="contained">To The Event!</Button> */}
    </>
  )
}

export default SummaryTab;
