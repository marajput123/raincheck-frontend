import React, { useMemo } from "react";
import moment from "moment";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CircleIcon from '@mui/icons-material/Circle';
import { faker } from "@faker-js/faker";
import { Typography, Stack, Card, Box, SxProps, CardMedia, CardContent, Skeleton } from "@mui/material";
import { IEvent } from "src/Shared/Models/Event/IEvent"
import { AttendeeChip, OrganizerChip } from "src/Shared/Components/Chips";
import { styleCardBoxShadow } from "src/Shared/Contants";
import { RoleType } from "src/Shared/Models/IRole";
import { randomImage } from "src/Shared/Helpers";
import { Event } from "src/Shared/Models/Event/Event";
import { elipsisStyles } from "src/Shared/Styles";

export const cardStyle: SxProps = {
  display: "flex",
  flexDirection: "column",
  maxWidth: "100%",
  minWidth: "10rem",
  height: "335px",
  borderRadius: "10px",
  flex: 1,
  cursor: "pointer",
  position: "relative",
  boxShadow: "none",
  border: "1px solid #c4c4c4"
}

const wideCardStyle: SxProps = {
  width: "100%",
  maxWidth: "700px",
  minWidth: "500px",
  height: "200px",
  display: "flex",
  backgroundColor: "white",
  cursor: "pointer",
  position: "relative",
  boxShadow: "none",
  border: "1px solid #c4c4c4"
}

const memberCountContainerStyle: SxProps = {
  display: "flex",
  height: "20px",
  alignItems: "center",
  position: "absolute",
  top: "0px",
  right: "0px",
  backdropFilter: "blur(30px)",
  borderRadius: "10px",
  padding: "5px"
}

const roleTypeChipContainerStyle: SxProps = {
  height: "20px",
  position: "absolute",
  top: "0px",
  left: "0px",
  padding: "5px"
}

export interface IEventCardProps {
  event: IEvent
  isLoading?: boolean;
  onCardClick?: (e: React.SyntheticEvent, event: IEvent) => void;
}

export const WideEventCard = (props: IEventCardProps) => {
  const event = useMemo(() => new Event(props.event), [props.event]);

  const onCardClick = (e: React.SyntheticEvent) => {
    if (props.onCardClick) {
      props.onCardClick(e, props.event);
    }
  }

  return (
    <Card sx={wideCardStyle} onClick={onCardClick}>
      <Box sx={{ height: "100%", flex: 1, position: "relative" }}>
        <CardMedia
          sx={{ height: "100%" }}
          image={event.imageUri}
          title={event.name}
        />
        <Box sx={memberCountContainerStyle}>
          <CircleIcon sx={{ fontSize: "10px", color: "#3dea46" }} />
          <Typography variant="body2" sx={{ color: "white", paddingLeft: "5px" }}>
            {event.getMemberCount()} going
          </Typography>
        </Box>
        {event.isMember() &&
          <Stack direction="row" justifyContent={"flex-end"} spacing={1} sx={roleTypeChipContainerStyle}>
            {event.getUserMembership().roleType === RoleType.Attendee ? <AttendeeChip pointer /> : null}
            {event.getUserMembership().roleType === RoleType.Organizer ? <OrganizerChip pointer /> : null}
          </Stack>
        }
      </Box>
      <Stack
        flex={1}
        sx={{ padding: "20px 20px 10px 20px" }}
        justifyContent="space-around"
      >
        <Stack>
          <Typography variant="body1">{`${event.getDate()}  ${event.getTime()}`}</Typography>
          <Box sx={elipsisStyles}>
            <Typography
              gutterBottom={false}
              variant="h5"
              sx={{ fontWeight: 600, wordBreak: "break-all" }}
            >
              {event.name}
            </Typography>
          </Box>
          <Typography
            variant="caption"
            sx={{ color: "#9a9a9a", marginTop: "-7px" }}
          >
            @{event.getPopulateOrganizers()[0].username}
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocationOnIcon sx={{ fontSize: "20px" }} />
            <Typography sx={{ paddingLeft: "1px" }} variant="body1">{event.address || event.location}</Typography>
          </Box>
        </Stack>
      </Stack>
    </Card>
  )
}

export const EventCardSkeleton = () => {
  return (
    <Box sx={{ maxWidth: "100%", minWidth: "10rem", height: "335px" }}>
      <Skeleton variant="rectangular" height={"50%"} />
      <Skeleton variant="text" height={"20%"} />
      <Skeleton />
      <Skeleton width={"50%"} />
    </Box>
  )
}

export const EventCard = (props: IEventCardProps) => {
  const event = useMemo(() => new Event(props.event), [props.event]);

  const onCardClick = (e: React.SyntheticEvent) => {
    if (props.onCardClick) {
      props.onCardClick(e, props.event);
    }
  }

  return (
    <Card sx={cardStyle} onClick={onCardClick}>
      <CardMedia
        sx={{ height: "170px" }}
        image={event.imageUri}
        title={event.name}
      />
      <Box sx={memberCountContainerStyle}>
        <CircleIcon sx={{ fontSize: "10px", color: "#3dea46" }} />
        <Typography variant="body2" sx={{ color: "white", paddingLeft: "5px" }}>
          {event.getMemberCount()} going
        </Typography>
      </Box>
      {event.isMember() &&
        <Stack direction="row" justifyContent={"flex-end"} spacing={1} sx={roleTypeChipContainerStyle}>
          {event.getUserMembership().roleType === RoleType.Attendee ? <AttendeeChip pointer /> : null}
          {event.getUserMembership().roleType === RoleType.Organizer ? <OrganizerChip pointer /> : null}
        </Stack>
      }
      <Stack
        flex={1}
        sx={{ padding: "20px 20px 10px 20px" }}
        justifyContent="space-around"
      >
        <Stack>
          <Typography variant="body1">
            {`${event.getDate()}  ${event.getTime()}`}
          </Typography>
          <Box sx={elipsisStyles}>
            <Typography
              gutterBottom={false}
              variant="h5"
              sx={{ fontWeight: 600, wordBreak: "break-all" }}
            >
              {event.name}
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: "#9a9a9a", marginTop: "-7px" }}>@{event.getPopulateOrganizers()[0].username}</Typography>
        </Stack>
        <Stack spacing={1}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocationOnIcon sx={{ fontSize: "20px" }} />
            <Typography sx={{ paddingLeft: "1px" }} variant="body1">{event.address || event.location}</Typography>
          </Box>
        </Stack>
      </Stack>
    </Card>
  )
};