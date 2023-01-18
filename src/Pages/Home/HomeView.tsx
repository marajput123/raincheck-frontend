import { Typography, Stack, SxProps, Button, TextField, Card, Box, Icon, Tooltip, IconButton, ClickAwayListener } from "@mui/material";
import { useDocumentTitle } from "src/Shared/Hooks/useDocumentTitle";
import { useCustomNavigate } from "src/Shared/Hooks/useCustomNavigate";
import { useAppSelector } from "src/Shared/Redux/Store";
import Navbar from "src/Shared/Components/Navbar";
import React, { useEffect, useState } from "react";
import { fetchEvent } from "src/Shared/Api/Event";
import { IEvent } from "src/Shared/Models/IEvent";
import { EventCard } from "src/Shared/Components/EventCard";
import { display } from "@mui/system";

const rootStackStyle: SxProps = {
  maxHeight: "900px",
  height: "90vh",
  paddingTop: "20px"
}

export const HomeView = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  
  useEffect(() => {
    setTimeout(() => {
      const events = fetchEvent();
      setEvents(events);
    }, 1000)
  }, [])

  return (
    <>
      <Navbar />
      <Stack
        sx={rootStackStyle}
        alignItems="center"
        spacing={3}
      >
        {events.map(event => {
          return (
            <React.Fragment key={event._id}>
              <EventCard event={event} />
            </React.Fragment>
          )
        })}
      </Stack>

    </>
  )
}