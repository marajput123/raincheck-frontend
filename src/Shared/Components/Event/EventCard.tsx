import React, { useMemo } from "react";
import moment from "moment";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CircleIcon from '@mui/icons-material/Circle';
import { faker } from "@faker-js/faker";
import { Typography, Stack, Card, Box, SxProps, CardMedia, CardContent } from "@mui/material";
import { IEvent } from "src/Shared/Models/IEvent"
import { AttendeeChip, OrganizerChip } from "src/Shared/Components/Chips";
import { styleCardBoxShadow } from "src/Shared/Contants";
import { RoleType } from "src/Shared/Models/IRole";
import { randomImage } from "src/Shared/HelperMethods";

const cardStyle: SxProps = {
  maxWidth: "100%",
  minWidth: "10rem",
  borderRadius: "10px",
  flex: 1,
  cursor: "pointer",
  boxShadow: styleCardBoxShadow
}

const wideCardStyle: SxProps = {
  width: "100%",
  maxWidth: "600px",
  minWidth: "500px",
  height: "200px",
  display: "flex",
  backgroundColor: "white",
  cursor: "pointer",
  boxShadow: styleCardBoxShadow
}

export interface IEventCardProps {
  event: IEvent
  onCardClick?: (e: React.SyntheticEvent, event: IEvent) => void;
}

export const WideEventCard = (props: IEventCardProps) => {
  const { event } = props;

  // TODO: Developer only
  const imageUri = event.imageUri || randomImage();
  const date = useMemo(() => moment(event.date).format('MMM DD, YYYY'), [])
  const time = useMemo(() => moment(event.date).format('hh:mm A'), [])

  const totalMemberCount = useMemo(() => {
    let count = 0;
    event.metadata?.memberCounts.forEach((memberCount) => {
      count += memberCount.count
    })
    return count
  }, []);

  const organizerUsername = useMemo(() => {
    if (typeof event.organizers[0] !== "string") {
      return event.organizers[0].username;
    }
    return null
  }, [event.organizers])

  const onCardClick = (e: React.SyntheticEvent) => {
    if (props.onCardClick) {
      props.onCardClick(e, event);
    }
  }

  return (
    <Card sx={wideCardStyle} onClick={onCardClick}>
      <CardMedia
        sx={{ height: "100%", flex: 1 }}
        image={imageUri}
        title={event.name}
      />
      <Stack sx={{ flex: 1, padding: "10px" }} spacing={3}>
        <Stack direction="row" justifyContent={"space-between"} alignItems="center">
          <Stack direction="row" spacing={1} sx={{ cursor: "pointer" }}>
            {event.metadata?.userMembership?.roleType === RoleType.Attendee ? <AttendeeChip pointer /> : null}
            {event.metadata?.userMembership?.roleType === RoleType.Organizer ? <OrganizerChip pointer /> : null}
          </Stack>
          <Box sx={{ display: "flex", height: "20px", alignItems: "center" }}>
            <CircleIcon sx={{ fontSize: "10px" }} color="success" />
            <Typography variant="body2" sx={{ color: "#5E5E5E", paddingLeft: "5px" }}>
              {totalMemberCount} going
            </Typography>
          </Box>
        </Stack>
        <Stack>
          <Typography gutterBottom={false} variant="h4" sx={{ fontWeight: 600, marginBottom: "-5px" }}>{event.name}</Typography>
          <Typography variant="caption" sx={{color:"#9a9a9a"}}>@{organizerUsername}</Typography>
        </Stack>
        <Stack>
          <Typography variant="body2">{`${date}  ${time}`}</Typography>
          <Stack direction="row" alignItems={"center"}>
            <LocationOnIcon sx={{ fontSize: "20px" }} />
            {/* <Typography sx={{ paddingLeft: "5px" }} variant="body2">{event.location}</Typography> */}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  )
}

export const EventCard = (props: IEventCardProps) => {
  const { event } = props;

  // TODO: Developer only
  const imageUri = event.imageUri || faker.image.food();

  const date = useMemo(() => moment(event.date).format('MMM DD, YYYY'), [])
  const time = useMemo(() => moment(event.date).format('hh:mm A'), [])

  const totalMemberCount = useMemo(() => {
    let count = 0;
    event.metadata?.memberCounts.forEach((memberCount) => {
      count += memberCount.count
    })
    return count
  }, []);

  const organizerUsername = useMemo(() => {
    if (typeof event.organizers[0] !== "string") {
      return event.organizers[0].username;
    }
    return null
  }, []);

  const onCardClick = (e: React.SyntheticEvent) => {
    if (props.onCardClick) {
      props.onCardClick(e, event);
    }
  }

  return (
    <Card sx={cardStyle} onClick={onCardClick}>
      <CardMedia
        sx={{ height: "170px" }}
        image={imageUri}
        title={event.name}
      />
      <CardContent
        style={{
          paddingBottom: "10px"
        }}
      >
        <Stack direction="row" justifyContent="space-between" sx={{ paddingBottom: "10px" }}>
          <Box>
            <Typography
              gutterBottom={false}
              variant="h5"
              sx={{ fontWeight: 600, marginBottom: "-5px" }}
            >
              {event.name}
            </Typography>
            <Typography variant="caption" sx={{color:"#9a9a9a"}}>@{organizerUsername}</Typography>
          </Box>
          <Box sx={{ display: "flex", height: "20px", alignItems: "center" }}>
            <CircleIcon sx={{ fontSize: "10px" }} color="success" />
            <Typography variant="body2" sx={{ color: "#5E5E5E", paddingLeft: "5px" }}>
              {totalMemberCount} going
            </Typography>
          </Box>
        </Stack>
        <Stack>
          <Typography variant="body2">{`${date}  ${time}`}</Typography>
          <Stack direction="row" alignItems={"center"}>
            <LocationOnIcon sx={{ fontSize: "20px" }} />
            {/* <Typography sx={{ paddingLeft: "5px" }} variant="body2">{event.location}</Typography> */}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export const REventCard = (props: IEventCardProps) => {
  const { event } = props;

  // TODO: Developer only
  const imageUri = event.imageUri || faker.image.food();

  const date = useMemo(() => moment(event.date).format('MMM DD, YYYY'), [])
  const time = useMemo(() => moment(event.date).format('hh:mm A'), [])

  const totalMemberCount = useMemo(() => {
    let count = 0;
    event.metadata?.memberCounts.forEach((memberCount) => {
      count += memberCount.count
    })
    return count
  }, []);

  const organizerUsername = useMemo(() => {
    if (typeof event.organizers[0] !== "string") {
      return event.organizers[0].username;
    }
    return null
  }, [])

  return (
    <Card sx={cardStyle}>
      <CardMedia
        sx={{ height: "170px" }}
        image={imageUri}
        title={event.name}
      />
      <CardContent
        style={{
          paddingBottom: "10px"
        }}
      >
        <Stack direction="row" justifyContent="space-between" sx={{ paddingBottom: "10px" }}>
          <Box>
            <Typography
              gutterBottom={false}
              variant="h5"
              sx={{ fontWeight: 600, marginBottom: "-5px" }}
            >
              {event.name}
            </Typography>
            <Typography variant="caption" sx={{color:"#9a9a9a"}}>@{organizerUsername}</Typography>
          </Box>
          <Box sx={{ display: "flex", height: "20px", alignItems: "center" }}>
            <CircleIcon sx={{ fontSize: "10px" }} color="success" />
            <Typography variant="body2" sx={{ color: "#5E5E5E", paddingLeft: "5px" }}>
              {totalMemberCount} going
            </Typography>
          </Box>
        </Stack>
        <Stack>
          <Typography variant="body2">{`${date}  ${time}`}</Typography>
          <Stack direction="row" alignItems={"center"}>
            <LocationOnIcon sx={{ fontSize: "20px" }} />
            {/* <Typography sx={{ paddingLeft: "5px" }} variant="body2">{event.location}</Typography> */}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}