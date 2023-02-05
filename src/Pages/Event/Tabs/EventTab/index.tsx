import { Card, Grid, Typography } from "@mui/material";
import { EventPanel } from "./EventPanel";
import { MemberPanel } from "./MemberPanel";

export const EventTab = () => {

  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: "15px" }}>
        <Grid item xs={12} lg={8}>
          <EventPanel />
        </Grid>
        <Grid item xs={12} lg={4}>
          <MemberPanel />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <Typography>hello</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <Typography>hello world</Typography>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}