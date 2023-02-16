import React, { useEffect, useState } from "react"
import { Grid, Stack, Container } from "@mui/material";
import { Spinner } from "src/Shared/Components/Spinner";
import { EventCard } from "src/Shared/Components/Event/EventCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from '@mui/material/styles';
import { useQuery } from "react-query";
import { fetchPublicEvents } from "src/Shared/Api/Event";
import Typography from "@mui/material/Typography";
import { IEvent } from "src/Shared/Models/IEvent";
import { useQueryMyEvents } from "src/Shared/ReactQuery/Event";
import { useAppSelector } from "src/Shared/Redux/Store";
import { StyledLink } from "src/Shared/Components/Link";
import { useCustomNavigate } from "src/Shared/Hooks/useCustomNavigate";

export const ExploreEvents = () => {
  const authState = useAppSelector((state) => state.auth)

  const [isLocationLoaded, setIsLocationLoaded] = useState(false);
  const [coordinates, setCoordinates] = useState({ longitude: -122.11, latitude: 47.67 })

  useEffect(() => {
    // TODO: Make this call in a higher component, maybe the app component
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  const successCallback: PositionCallback = (position) => {
    setIsLocationLoaded(true);
    setCoordinates({
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    })
  };

  const errorCallback = () => {
    setIsLocationLoaded(true);
  };

  if (!isLocationLoaded) {
    return (
      <Container sx={{ height: "80vh" }}>
        <Spinner />
      </Container>
    )
  }
  return (
    <Stack sx={{ width: "100%", paddingTop: "20px" }} spacing={4}>
      <NearbyEvents latitude={coordinates.latitude} longitude={coordinates.longitude} />
      <RandomEvents />
      {authState.isAuthenticated ? <MyEvents /> : null}
    </Stack>
  )
}

interface IGridEventList {
  events: IEvent[]
}
const GridEventList = (props: IGridEventList) => {
  const navigate = useCustomNavigate();
  const theme = useTheme();
  const { events } = props;
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const onEventCardClick = (_, event:IEvent) => {
    navigate(`/events/${event._id}`)
  }


  return (
    <Grid spacing={1} container justifyContent={"space-between"}>
      {events?.map((event, index) => {
        if (isTablet && index >= 2) {
          return null;
        }
        if (isMobile && index >= 1) {
          return null;
        }
        return (
          <React.Fragment key={event._id}>
            <Grid item lg={3} xs={6} xxs={12}  >
              <EventCard event={event} onCardClick={onEventCardClick}/>
            </Grid>
          </React.Fragment>
        )
      })}
    </Grid>
  )
}

interface INearbyEventsProps {
  latitude: number;
  longitude: number;
}

export const NearbyEvents = (props: INearbyEventsProps) => {
  const { latitude, longitude } = props;
  const navigate = useCustomNavigate();

  const { isLoading, data } = useQuery("EventList/FetchNearbyEvents", () => fetchPublicEvents({ limit: 4, lat: latitude, long: longitude }))

  if (isLoading) {
    return (
      <Container sx={{ height: "80vh" }}>
        <Spinner />
      </Container>
    )
  }

  const onSearchNearby = () => {
    navigate(`/search?_searchLabel=Nearby&long=${longitude}&lat=${latitude}`)
  }

  return (
    <Stack sx={{ width: "100%" }}>
      <Stack direction="row" justifyContent={"space-between"} alignItems="center">
        <Typography variant="h4" sx={{ fontWeight: 600 }}>Nearby events</Typography>
        <StyledLink onClick={onSearchNearby}>See more</StyledLink>
      </Stack>
      <GridEventList events={data.content || []} />
    </Stack>
  )
}



const RandomEvents = () => {
  const { isLoading, data } = useQuery("EventList/FetchNearbyEvents", () => fetchPublicEvents({ limit: 4 }))
  const navigate = useCustomNavigate();
  
  if (isLoading) {
    return (
      <Container sx={{ height: "80vh" }}>
        <Spinner />
      </Container>
    )
  }

  const onSearchRandom = () => {
    navigate(`/search?_searchLabel=Random`)
  }

  return (
    <Stack sx={{ width: "100%" }}>
      <Stack direction="row" justifyContent={"space-between"} alignItems="center">
        <Typography variant="h4" sx={{ fontWeight: 600 }}>Random events</Typography>
        <StyledLink onClick={onSearchRandom}>See more</StyledLink>
      </Stack>
      <GridEventList events={data.content || []} />
    </Stack>
  )
}

const MyEvents = () => {
  const { isLoading, data } = useQueryMyEvents({ limit: 4 });
  const navigate = useCustomNavigate();


  if (isLoading) {
    return (
      <Container sx={{ height: "80vh" }}>
        <Spinner />
      </Container>
    )
  }

  const toMyEvents = () => {
    navigate("/app/upcomingEvents")
  }

  return (
    <Stack sx={{ width: "100%" }}>
      <Stack direction="row" justifyContent={"space-between"} alignItems="center">
        <Typography variant="h4" sx={{ fontWeight: 600 }}>My events</Typography>
        <StyledLink onClick={toMyEvents}>See more</StyledLink>
      </Stack>
      <GridEventList events={data.content || []} />
    </Stack>
  )
}