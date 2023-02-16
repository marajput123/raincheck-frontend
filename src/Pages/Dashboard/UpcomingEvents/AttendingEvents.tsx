import React from "react"
import { Stack, Typography } from "@mui/material"
import { EventList } from "src/Shared/Components/Event/EventList";
import { useCustomNavigate } from "src/Shared/Hooks/useCustomNavigate";
import { IEvent } from "src/Shared/Models/IEvent"
import { fetchMyEvents } from "src/Shared/Api/Event";
import { InfinitLoaderTrigger } from "src/Shared/Components/InfiniteLoader";
import { RoleType } from "src/Shared/Models/IRole";
import { useCustomInfiniteQuery } from "./Shared/Hook";
import { Spinner } from "src/Shared/Components/Spinner";




export const AttendingEvents = () => {
  const navigate = useCustomNavigate();

  const {isLoading, error, data, onInfiniteTrigger} = useCustomInfiniteQuery(
    "EventListInifinite/FetchMyUpcomingAttendingEvents",
    ({ pageParam = 1 }) => fetchMyEvents({ page: pageParam - 1, role: RoleType.Attendee, "startDate[$gte]": new Date().toISOString() })
  );

  const onEventCardClick = (e: React.SyntheticEvent, event: IEvent) => {
    navigate(`/events/${event._id}`)
  }

  if (isLoading) {
    return <Spinner/>
  }

  if (error) {
    return <p>error</p>
  }

  return (
    <Stack alignItems={"center"}>
      {data?.pages?.map((page, index) => {
        if (page.content.length === 0) {
          return null;
        }
        return (<React.Fragment key={index}>
          <EventList events={page.content} onEventCardClick={onEventCardClick} />
        </React.Fragment>)
      })}
      <InfinitLoaderTrigger onTriggerCallback={onInfiniteTrigger} />
      {
        data?.pages[0].content.length === 0 &&
        <Typography>No upcoming events</Typography>
      }
    </Stack>
  )
}