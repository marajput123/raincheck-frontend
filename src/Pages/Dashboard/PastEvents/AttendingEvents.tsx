import React from "react"
import { Stack } from "@mui/material"
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
    "EventListInifinite/FetchMyPastAttendingEvents",
    ({ pageParam = 1 }) => fetchMyEvents({ page: pageParam - 1, role: RoleType.Attendee, "startDate[$lte]": new Date().toISOString() })
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
      {data.pages.map((page, index) => (
        <React.Fragment key={index}>
          <EventList events={page.content} onEventCardClick={onEventCardClick} />
        </React.Fragment>
      ))}
      <InfinitLoaderTrigger onTriggerCallback={onInfiniteTrigger} />
    </Stack>
  )
}