import { Typography, Stack, SxProps, Button, TextField, Card, Box, Icon, Tooltip, IconButton, ClickAwayListener, CardMedia, CardContent, colors, ListItem, List } from "@mui/material";
import { useDocumentTitle } from "src/Shared/Hooks/useDocumentTitle";
import { useCustomNavigate } from "src/Shared/Hooks/useCustomNavigate";
import { useAppSelector } from "src/Shared/Redux/Store";
import Navbar from "src/Shared/Components/Navbar";
import React, { useEffect, useState } from "react";
import { fetchPublicEvents } from "src/Shared/Api/Event";
import { IEvent } from "src/Shared/Models/IEvent";
import { EventCard } from "src/Shared/Components/EventCard";


export const HomeView = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  useDocumentTitle("Eventhub | Home")

  const getEvents = async () => {
    try {
      const eventsResponse = await fetchPublicEvents();
      setEvents([...eventsResponse.content, ...eventsResponse.content])
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getEvents()
  }, [])

  return (
    <>
      <Navbar />
      <List sx={{display: "flex", overflow: "scroll"}}>
        {events.map((event, index) => {
          return (
            <ListItem key={event._id + index}>
              <EventCard event={event} />
            </ListItem>
          )
        })}
      </List>
    </>
  )
}