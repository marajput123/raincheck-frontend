import React, { useRef } from "react"
import { Stack } from "@mui/material"
import { EventList } from "src/Shared/Components/Event/EventList";
import { useCustomNavigate } from "src/Shared/Hooks/useCustomNavigate";
import { IEvent } from "src/Shared/Models/IEvent"
import { QueryFunction, useInfiniteQuery } from "react-query";
import { fetchMyEvents } from "src/Shared/Api/Event";
import { InfinitLoaderTrigger, observerInView } from "src/Shared/Components/InfiniteLoader";
import { IServerResponse } from "src/Shared/Models/IServerResponse";

const useCustomInfiniteQuery = <T extends any>(queryKey: string, queryFunction: QueryFunction<IServerResponse<T>>, initialPage = 1) => {
  const pageRef = useRef(1);

  const query = useInfiniteQuery(
    queryKey,
    queryFunction
    // "EventList/FetchMyAttendingEvents",
    // ({ pageParam = 1 }) => fetchMyEvents({ page: pageParam - 1, role: RoleType.Attendee })
  );

  const onInfiniteTrigger = (observers: IntersectionObserverEntry[]) => {
    const isScrollEnd = (pageRef.current * 10) >= query.data.pages[0].metadata.totalCount
    if (!observerInView(observers) || isScrollEnd) {
      return;
    }
    pageRef.current += 1
    query.fetchNextPage({ pageParam: pageRef.current });
  };

  return {...query, onInfiniteTrigger}
}


// TODO: Refactor the tabs in UpcomgingEvents as their functioanlity is extremely similar
export const AllEvents = () => {
  // const pageRef = useRef(1);
  const navigate = useCustomNavigate();
  const {isLoading, error, data, onInfiniteTrigger} = useCustomInfiniteQuery("EventList/FetchMyEvents", ({ pageParam = 1 }) => fetchMyEvents({ page: pageParam - 1 }))
  // const { isLoading, error, data, fetchNextPage, } = useInfiniteQuery(
  //   "EventList/FetchMyEvents",
  //   ({ pageParam = 1 }) => fetchMyEvents({ page: pageParam - 1 })
  // )

  const onEventCardClick = (e: React.SyntheticEvent, event: IEvent) => {
    navigate(`/events/${event._id}`)
  }

  // const onInfiniteTrigger = (observers: IntersectionObserverEntry[]) => {
  //   const isScrollEnd = (pageRef.current * 10) >= data.pages[0].metadata.totalCount
  //   if (!observerInView(observers) || isScrollEnd) {
  //     return;
  //   }
  //   pageRef.current += 1
  //   fetchNextPage({ pageParam: pageRef.current });
  // };

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


