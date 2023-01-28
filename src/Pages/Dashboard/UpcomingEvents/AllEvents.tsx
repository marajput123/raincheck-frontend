import { Box, List, ListItem } from "@mui/material"
import React, { useMemo } from "react";
import { WideEventCard } from "src/Shared/Components/EventCard";
import { EventList } from "src/Shared/Components/EventList";
import { useCustomNavigate } from "src/Shared/Hooks/useCustomNavigate";
import { IEvent } from "src/Shared/Models/IEvent"
import { RoleType } from "src/Shared/Models/IMembership";

interface IAllEventsProps {
    events: IEvent[]
}

export const AllEvents = (props: IAllEventsProps) => {
   const { events } = props;
   const navigate = useCustomNavigate()

   console.log(events);

   const onEventCardClick = (e: React.SyntheticEvent, event: IEvent) => {
    navigate(`/events/${event._id}`)
   }

    return (
        <Box sx={{ overflow: "scroll" }}>
            <EventList events={events} onEventCardClick={onEventCardClick} />
        </Box>
    )
}