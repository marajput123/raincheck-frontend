import React, { useEffect, useState } from "react"
import { Grid, Stack, Container, Card } from "@mui/material";
import { Spinner } from "src/Shared/Components/Spinner";
import { cardStyle, EventCard } from "src/Shared/Components/Event/EventCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from '@mui/material/styles';
import { useQuery } from "react-query";
import { fetchPublicEvents } from "src/Shared/Api/Event";
import Typography from "@mui/material/Typography";
import { IEvent } from "src/Shared/Models/Event/IEvent";
import { useQueryMyEvents } from "src/Shared/ReactQuery/Event";
import { useAppSelector } from "src/Shared/Redux/Store";
import { StyledLink } from "src/Shared/Components/Link";
import { useCustomNavigate } from "src/Shared/Hooks/useCustomNavigate";
import { useCustomSearchParams } from "src/Shared/Hooks/useCustomSearchParams";
import moment from "moment";
import errorSVG from "src/Shared/Svg/error.svg";


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

  const onEventCardClick = (_, event: IEvent) => {
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
              <EventCard event={event} onCardClick={onEventCardClick} />
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

  const { isLoading, data, error } = useQuery("EventList/FetchNearbyEvents", () => fetchPublicEvents({ limit: 4, lat: latitude, long: longitude }))

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
        <Typography variant="h5" sx={{ fontWeight: 600 }}>Nearby events</Typography>
        <StyledLink onClick={onSearchNearby}>See more</StyledLink>
      </Stack>
      {!error ?
        data.content.length !== 0 ?
          <GridEventList events={data.content || []} /> :
          <Typography>No Events</Typography>
        :
        <>Error</>
        // <Stack sx={{ width: "100%" }} alignItems="center">
        //   <img style={{ maxHeight: "100px" }} src={errorSVG} />
        //   <Typography variant="h5">Huh, something went wrong</Typography>
        // </Stack>
      }
    </Stack>
  )
}



const RandomEvents = () => {
  const { isLoading, data, error } = useQuery("EventList/SearchPublicEvents", () => fetchPublicEvents({ limit: 4 }));
  const { constructUri } = useCustomSearchParams()
  const navigate = useCustomNavigate();



  const onSearchRandom = () => {
    const uri = constructUri("/search", {
      _searchLabel: "Random",
      "startDate[$gte]": moment(new Date).format("YYYY-MM-DD")
    })

    navigate(uri)
  }

  if (isLoading) {
    return (
      <Container sx={{ height: "80vh" }}>
        <Spinner />
      </Container>
    )
  }

  return (
    <Stack sx={{ width: "100%" }}>
      <Stack direction="row" justifyContent={"space-between"} alignItems="center">
        <Typography variant="h5" sx={{ fontWeight: 600 }}>Random events</Typography>
        <StyledLink onClick={onSearchRandom}>See more</StyledLink>
      </Stack>
      {!error ?
        data.content.length !== 0 ?
          <GridEventList events={data.content || []} /> :
          <Typography>No Events</Typography>
        :
        <>Error</>
        // <Stack sx={{ width: "100%" }} alignItems="center">
        //   <img style={{ maxHeight: "100px" }} src={errorSVG} />
        //   <Typography variant="h5">Huh, something went wrong</Typography>
        // </Stack>
      }

    </Stack>
  )
}

const MyEvents = () => {
  const { isLoading, data, error } = useQueryMyEvents({ limit: 4 });
  const navigate = useCustomNavigate();

  const toMyEvents = () => {
    navigate("/app/events")
  }


  if (isLoading) {
    return (
      <Container sx={{ height: "80vh" }}>
        <Spinner />
      </Container>
    )
  }

  return (
    <Stack sx={{ width: "100%" }}>
      <Stack direction="row" justifyContent={"space-between"} alignItems="center">
        <Typography variant="h5" sx={{ fontWeight: 600 }}>My events</Typography>
        <StyledLink onClick={toMyEvents}>See more</StyledLink>
      </Stack>
      {!error ?
        data.content.length !== 0 ?
          <GridEventList events={data.content || []} /> :
          <Typography>No Events</Typography>
        :
        <>Error</>
        // <Stack sx={{ width: "100%" }} alignItems="center">
        //   <img style={{ maxHeight: "100px" }} src={errorSVG} />
        //   <Typography variant="h5">Huh, something went wrong</Typography>
        // </Stack>
      }

    </Stack>
  )
}