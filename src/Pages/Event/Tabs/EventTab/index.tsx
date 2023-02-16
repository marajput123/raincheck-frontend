import { Grid } from "@mui/material";
import { EventPanel } from "./EventPanel";
import { MemberPanel } from "./MemberPanel";

export const EventTab = () => {

  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: "15px" }}>
        <Grid item xxs={12} lg={8}>
          <EventPanel />
        </Grid>
        <Grid item xxs={12} lg={4}>
          <MemberPanel />
        </Grid>
      </Grid>
    </>
  )
}