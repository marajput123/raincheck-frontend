import { Button, TextField, Typography } from '@mui/material'

interface ISummaryTab {
  eventURL: string
}

export const SummaryTab = (props: ISummaryTab) => {
  const { eventURL } = props;
  return (
    <>
      <Typography variant="h2">
        You're all set!
      </Typography>
      <Typography variant="h4">
        Let's start spreading the word!
      </Typography>
      <TextField label="Url" variant="standard" value={eventURL} disabled />
      {/* <Button onClick={() => onNavigate("/")} variant="contained">To The Event!</Button> */}
    </>
  )
}
