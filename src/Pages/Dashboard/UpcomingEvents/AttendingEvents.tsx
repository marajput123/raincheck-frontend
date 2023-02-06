import React, { useRef } from "react"
import { Stack } from "@mui/material"
import { EventList } from "src/Shared/Components/Event/EventList";
import { useCustomNavigate } from "src/Shared/Hooks/useCustomNavigate";
import { IEvent } from "src/Shared/Models/IEvent"
import { QueryFunction, useInfiniteQuery } from "react-query";
import { fetchMyEvents } from "src/Shared/Api/Event";
import { InfinitLoaderTrigger, observerInView } from "src/Shared/Components/InfiniteLoader";
import { RoleType } from "src/Shared/Models/IRole";
import { IServerResponse } from "src/Shared/Models/IServerResponse";




export const AttendingEvents = () => {
  const pageRef = useRef(1);
  const navigate = useCustomNavigate();
  const { isLoading, error, data, fetchNextPage, } = useInfiniteQuery(
    "EventList/FetchMyAttendingEvents",
    ({ pageParam = 1 }) => fetchMyEvents({ page: pageParam - 1, role: RoleType.Attendee })
  )

  const onEventCardClick = (e: React.SyntheticEvent, event: IEvent) => {
    navigate(`/events/${event._id}`)
  }

  const onInfiniteTrigger = (observers: IntersectionObserverEntry[]) => {
    const isScrollEnd = (pageRef.current * 10) >= data.pages[0].metadata.totalCount
    if (!observerInView(observers) || isScrollEnd) {
      return;
    }
    pageRef.current += 1
    fetchNextPage({ pageParam: pageRef.current });
  };

  if (isLoading) {
    return <p>loading</p>
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