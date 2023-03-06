import { Box, Grid, Portal } from "@mui/material";
import { StyledSpeedDial } from "src/Shared/Components/CreateEventSpeedDial";
import EditIcon from '@mui/icons-material/Edit';
import { EventPanel } from "./EventPanel";
import { MemberPanel } from "./MemberPanel";
import { useParams } from "react-router-dom";
import { useCustomNavigate } from "src/Shared/Hooks/useCustomNavigate";
import { useAppSelector } from "src/Shared/Redux/Store";
import { useRef } from "react";

export const EventTab = () => {
  const containerRef = useRef();
  const authState = useAppSelector(state => state.auth);
  const naivgate = useCustomNavigate();
  const eventId = useParams().eventId;

  const onNavigate = () => {
    naivgate(`/app/events/${eventId}/settings`);
  }

  return (
    <>
      <Grid container spacing={4} sx={{ marginTop: "15px" }}>
        <Grid item xxs={12} lg={8}>
          <EventPanel containerRef={containerRef} />
        </Grid>
        <Grid item xxs={12} lg={4}>
          <MemberPanel />
        </Grid>
      </Grid>
      <Box ref={containerRef}></Box>
      
    </>
  )
}