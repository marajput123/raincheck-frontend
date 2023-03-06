import React, { useMemo } from "react"
import { Stack } from "@mui/material"
import { EventList } from "src/Shared/Components/Event/EventList";
import { useCustomNavigate } from "src/Shared/Hooks/useCustomNavigate";
import { IEvent } from "src/Shared/Models/Event/IEvent"
import { fetchMyEvents } from "src/Shared/Api/Event";
import { InfinitLoaderTrigger } from "src/Shared/Components/InfiniteLoader";
import { Spinner } from "src/Shared/Components/Spinner";
import { useSearchParams } from "react-router-dom";
import { RoleType } from "src/Shared/Models/IRole";
import { useCustomInfiniteQuery } from "src/Shared/Hooks/useCustomInfiniteQuery";


// TODO: Refactor the tabs in UpcomgingEvents as their functioanlity is extremely similar
export const UpcomingEvents = () => {
  const [getSearchParams] = useSearchParams();
  const navigate = useCustomNavigate();

  const roleQuery = useMemo(() => {
    const organizingParam = getSearchParams.get("organizing");
    const attendingParam = getSearchParams.get("attending");
    let role: RoleType;
    if (organizingParam) {
      role = RoleType.Organizer
    } else if (attendingParam) {
      role = RoleType.Attendee
    }
    return role;
  }, [getSearchParams])

  const { isLoading, error, data, onInfiniteTrigger } = useCustomInfiniteQuery(
    `EventListInifinite/FetchMyUpcomingEvents/${roleQuery}`,
    ({ pageParam = 1 }) => fetchMyEvents({ page: pageParam - 1, "startDate[$gte]": new Date().toISOString(), role: roleQuery })
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

  return (
    <Stack alignItems={"center"}>
      {data?.pages?.map((page, index) => (
        <React.Fragment key={index}>
          <EventList events={page.content} onEventCardClick={onEventCardClick} />
        </React.Fragment>
      ))}
      <InfinitLoaderTrigger onTriggerCallback={onInfiniteTrigger} />
    </Stack>
  )
}


