import React from "react"
import { useSearchParams } from "react-router-dom";
import { useCustomNavigate } from "src/Shared/Hooks/useCustomNavigate";
import { fetchPublicEvents } from "src/Shared/Api/Event";
import { useCustomInfiniteQuery } from "../Dashboard/UpcomingEvents/Shared/Hook";
import { InfinitLoaderTrigger } from "src/Shared/Components/InfiniteLoader";
import { EventList } from "src/Shared/Components/Event/EventList";
import { IEvent } from "src/Shared/Models/IEvent";
import { Stack, Typography } from "@mui/material";

interface ISearchQueryProps {
}

export const SearchEvents = (props: ISearchQueryProps) => {
  const navigate = useCustomNavigate();
  const [searchParams] = useSearchParams();
  const uriQueryParams = window.location.search

  const constructQuery = React.useMemo(() => {
    const query = {};
    searchParams.forEach((value, key) => {
      if (!key.startsWith("_")) {
        query[key] = value
      }
    })
    return query
  }, [searchParams])


  const { isLoading, error, data, onInfiniteTrigger, } = useCustomInfiniteQuery(
    ["EventList/SearchPublicEvents", uriQueryParams],
    ({ pageParam = 1 }) => fetchPublicEvents({
      page: pageParam - 1,
      ...constructQuery
    })
  );

  const onEventCardClick = (e: React.SyntheticEvent, event: IEvent) => {
    navigate(`/events/${event._id}`)
  }

  if (isLoading) {
    return <p>loading</p>
  }

  if (error) {
    return <p>error</p>
  }

  const renderSearchHeader = () => {
    if (searchParams.get("_searchLabel")) {
      return (
        <Stack alignItems={"center"}>
          <Typography variant="h5">Searching by {searchParams.get("_searchLabel")}</Typography>
        </Stack>
      )
    }
  }

  return (
    <Stack sx={{ width: "100%", paddingTop: "20px" }} spacing={3}>
      {renderSearchHeader()}
      {data.pages.map((page, index) => (
        <React.Fragment key={index}>
          <EventList events={page.content} onEventCardClick={onEventCardClick} />
        </React.Fragment>
      ))}
      <InfinitLoaderTrigger onTriggerCallback={onInfiniteTrigger} />
    </Stack>
  )
};