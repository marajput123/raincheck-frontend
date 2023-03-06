import { Button, Container, Stack } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { fetchMyEvents } from "src/Shared/Api/Event";
import { CreateEventSpeedDial } from "src/Shared/Components/CreateEventSpeedDial";
import { EventList } from "src/Shared/Components/Event/EventList";
import { InfinitLoaderTrigger } from "src/Shared/Components/InfiniteLoader";
import { Spinner } from "src/Shared/Components/Spinner";
import { StyledTab, StyledTabs, TabPanel } from "src/Shared/Components/Tabs";
import { useCustomInfiniteQuery } from "src/Shared/Hooks/useCustomInfiniteQuery";
import { useCustomNavigate } from "src/Shared/Hooks/useCustomNavigate";
import { IEvent } from "src/Shared/Models/Event/IEvent";
import { RoleType } from "src/Shared/Models/IRole";
import { useAppSelector } from "src/Shared/Redux/Store";
import { PastEvents } from "./PastEvents";

// TODO: Optimize upcoming events and past events into one shared component
export const EventView = () => {
  const [getSearchParams] = useSearchParams();
  const [tabIndex, setTabIndex] = useState(0);
  const location = useLocation()
  const navigate = useCustomNavigate();

  useEffect(() => {
    if (getSearchParams.get("attending")) {
      setTabIndex(1)
    } else if (getSearchParams.get("organizing")) {
      setTabIndex(2)
    } else {
      setTabIndex(0)
    }
  }, [getSearchParams])

  const roleQuery = useMemo(() => {
    const organizingParam = getSearchParams.get("organizing");
    const attendingParam = getSearchParams.get("attending");
    if (attendingParam) {
      return RoleType.Attendee
    } else if (organizingParam) {
      return RoleType.Organizer
    }
  }, [getSearchParams])

  const { isLoading, error, data, onInfiniteTrigger } = useCustomInfiniteQuery(
    `EventListInifinite/FetchMyPastEvents/${roleQuery}`,
    ({ pageParam = 1 }) => fetchMyEvents({ page: pageParam - 1, role: roleQuery })
  );

  const onEventCardClick = (e: React.SyntheticEvent, event: IEvent) => {
    navigate(`/events/${event._id}`)
  }

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <p>error</p>
  }

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    switch (newValue) {
      case 1:
        navigate(`${location.pathname}?attending=true`)
        return;
      case 2:
        navigate(`${location.pathname}?organizing=true`)
        return;
      default:
        navigate(`${location.pathname}`)
        return;
    }
  };

  return (
    <>
      <Container>
        <StyledTabs value={tabIndex} onChange={handleChange}>
          <StyledTab label={"All my events"} aria-label="phone" />
          <StyledTab label={"Attending"} aria-label="favorite" />
          <StyledTab label={"Organizing"} aria-label="person" />
        </StyledTabs>
        <Stack alignItems={"center"}>
          {data?.pages?.map((page, index) => (
            <React.Fragment key={index}>
              <EventList events={page.content} onEventCardClick={onEventCardClick} />
            </React.Fragment>
          ))}
          <InfinitLoaderTrigger onTriggerCallback={onInfiniteTrigger} />
        </Stack>
        <CreateEventSpeedDial />
      </Container>
    </>
  )
}