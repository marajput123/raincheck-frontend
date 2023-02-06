import { useEffect, useState } from "react"
import { Typography, styled, Stack, Box, CircularProgress } from "@mui/material";
import { useDocumentTitle } from "src/Shared/Hooks/useDocumentTitle";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { IEvent } from "src/Shared/Models/IEvent";
import { fetchMyEvents, fetchPublicEvents } from "src/Shared/Api/Event";
import { EventList } from "src/Shared/Components/Event/EventList";
import { Spinner } from "src/Shared/Components/Spinner";
import { useCustomNavigate } from "src/Shared/Hooks/useCustomNavigate";
import { useAppSelector } from "src/Shared/Redux/Store";

const StyleSearchBar = styled(TextField)({
  maxWidth: "600px",
  "& .MuiInputBase-root": {

  }
})

export const ExplorePage = () => {
  useDocumentTitle("Explore");
  const authState = useAppSelector((state) => state.auth);
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
      latitude: position.coords.longitude
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
    <Stack alignItems={"center"} sx={{width: "100%"}}>
      <Stack sx={{ maxWidth: "1000px", width:"inherit" }} alignItems={"center"} spacing={3}>
        <Typography>Explore page</Typography>
        <StyleSearchBar fullWidth label="Search" />
        <NearbyEvents
          latitude={coordinates.latitude}
          longitude={coordinates.longitude}
        />
        <RecomendedEvents
          latitude={coordinates.latitude}
          longitude={coordinates.longitude}
        />
        {authState.isAuthenticated && <MyEvents />}
      </Stack>
    </Stack>
  );
};


interface INearbyEventsProps {
  latitude: number;
  longitude: number;
}

export const NearbyEvents = (props: INearbyEventsProps) => {
  const { latitude, longitude } = props;
  const [events, setEvents] = useState<IEvent[]>([])
  const navigate = useCustomNavigate();


  const fetchEvents = async () => {
    const response = await fetchPublicEvents({});
    setEvents(response.content)
  }

  useEffect(() => {
    fetchEvents();
  }, [])

  const eventClickHandler = (_, event: IEvent) => {
    navigate(`/events/${event._id}`)
  }

  return (
    <Stack sx={{ width: "100%" }}>
      <Typography>Nearby events</Typography>
      <EventList onEventCardClick={eventClickHandler} direction="row" enableScroll events={events} />
    </Stack>
  )
}

interface IRecomendedEventsProps {
  latitude: number;
  longitude: number;
}

export const RecomendedEvents = (props: IRecomendedEventsProps) => {
  const { latitude, longitude } = props;
  const [events, setEvents] = useState<IEvent[]>([])
  const navigate = useCustomNavigate();

  const fetchEvents = async () => {
    const response = await fetchPublicEvents({});
    setEvents(response.content)
  }

  useEffect(() => {
    fetchEvents();
  }, [])

  const eventClickHandler = (_, event: IEvent) => {
    navigate(`/events/${event._id}`)
  }

  return (
    <Stack sx={{ width: "100%" }}>
      <Typography>Recomended Events</Typography>
      <EventList onEventCardClick={eventClickHandler} direction="row" enableScroll events={events} />
    </Stack>
  )
}


export const MyEvents = () => {
  const [events, setEvents] = useState<IEvent[]>([])
  const navigate = useCustomNavigate();

  const fetchEvents = async () => {
    const response = await fetchMyEvents();
    setEvents(response.content)
  }

  useEffect(() => {
    fetchEvents();
  }, [])

  const eventClickHandler = (_, event: IEvent) => {
    navigate(`/events/${event._id}`)
  }

  return (
    <Stack sx={{ width: "100%" }}>
      <Typography>My events</Typography>
      <EventList onEventCardClick={eventClickHandler} direction="row" enableScroll events={events} />
    </Stack>
  )
}