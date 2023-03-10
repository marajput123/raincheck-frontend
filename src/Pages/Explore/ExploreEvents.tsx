import React, { useEffect, useState } from "react"
import { Grid, Stack, Container } from "@mui/material";
import { Spinner } from "src/Shared/Components/Spinner";
import { EventCard, EventCardSkeleton } from "src/Shared/Components/Event/EventCard";
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
import { EmptyString } from "src/Shared/Helpers";

interface IExploreEventSection {
  title: string;
  isLoading: boolean;
  error: any;
  data: IEvent[];
  onClickMore: () => void;
}

export const ExploreEventSection = (props: IExploreEventSection) => {
  const { title, isLoading, error, data, onClickMore } = props;

  const onSeeMore = () => onClickMore();

  if (error) {
    <>Error</>
  }

  return (
    <Stack sx={{ width: "100%" }}>
      <Stack direction="row" justifyContent={"space-between"} alignItems="center">
        <Typography variant="h5" sx={{ fontWeight: 600 }}>{title}</Typography>
        <StyledLink onClick={onSeeMore}>See more</StyledLink>
      </Stack>
      {
        data.length !== 0 ?
          <ExploreEventList isLoading={isLoading} events={data || []} /> :
          <Typography>No Events</Typography>
      }
    </Stack>
  )
}

interface IExploreEventList {
  events: IEvent[];
  isLoading?: boolean;
}
const ExploreEventList = (props: IExploreEventList) => {
  const navigate = useCustomNavigate();
  const { events, isLoading } = props;
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const onEventCardClick = (_, event: IEvent) => {
    navigate(`/events/${event._id}`)
  }

  const showCardHelper = (index: number) => {
    if (isTablet && index >= 2) {
      return false;
    }
    if (isMobile && index >= 1) {
      return false;
    }
    return true
  }

  return (
    <Grid spacing={1} container justifyContent={"space-between"}>
      {isLoading ?
        [1, 2, 3, 4].map((_, index) => {
          if (!showCardHelper(index)) {
            return null
          }
          return (
            <React.Fragment key={index}>
              <Grid item lg={3} xs={6} xxs={12}  >
                <EventCardSkeleton />
              </Grid>
            </React.Fragment>
          )
        }) :
        events?.map((event, index) => {
          if (!showCardHelper(index)) {
            console.log("here")
            return null
          }
          return (
            <React.Fragment key={event._id}>
              <Grid item lg={3} xs={6} xxs={12}  >
                <EventCard event={event} onCardClick={onEventCardClick} />
              </Grid>
            </React.Fragment>
          )
        })
      }

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
  const { constructUri } = useCustomSearchParams()

  const { isLoading, data, error } = useQuery("EventList/FetchNearbyEvents", () => fetchPublicEvents({ limit: 4, lat: latitude, long: longitude }))

  const onSearchNearby = () => {
    const uri = constructUri("/search", {
      _searchLabel: "Nearby",
      "startDate[$gte]": moment(new Date).format("YYYY-MM-DD"),
      ...(latitude && longitude && {
        lat: latitude.toString(),
        long: longitude.toString()
      })
    })
    navigate(uri)
  }

  return (
    <ExploreEventSection
      title="Nearby events"
      isLoading={isLoading}
      error={error}
      data={data?.content || []}
      onClickMore={onSearchNearby}
    />
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

  return (
    <ExploreEventSection
      title="Random events"
      isLoading={isLoading}
      error={error}
      data={data?.content || []}
      onClickMore={onSearchRandom}
    />
  )
}

const MyEvents = () => {
  const { isLoading, data, error } = useQueryMyEvents({ limit: 4 });
  const navigate = useCustomNavigate();

  const toMyEvents = () => {
    navigate("/app/events")
  }

  return (
    <ExploreEventSection
      title="My events"
      isLoading={isLoading}
      error={error}
      data={data?.content || []}
      onClickMore={toMyEvents}
    />
  )
}

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
