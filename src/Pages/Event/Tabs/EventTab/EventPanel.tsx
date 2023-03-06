import { Box, Card, CardMedia, Portal, Skeleton, Stack, SxProps, Typography } from "@mui/material";
import moment from "moment";
import { useMemo, useState } from "react"
import CircleIcon from '@mui/icons-material/Circle';
import { useParams } from "react-router-dom";
import { AvatarGroup } from "src/Shared/Components/AvatarGroup";
import { CopyTextArea } from "src/Shared/Components/CopyArea";
import { StyledLink } from "src/Shared/Components/Link";
import { MemberCount } from "src/Shared/Components/MemberCounter";
import { randomImage } from "src/Shared/Helpers";
import { IUser } from "src/Shared/Models/User/IUser";
import { elipsisStyles } from "src/Shared/Styles";
import { useQueryEvent, } from "../../Shared/EventQuery";
import { panelStyle } from "../../Shared/Styles";
import { RsvpButton } from "./RsvpButton";
import { Event } from "src/Shared/Models/Event/Event";
import { useAppSelector } from "src/Shared/Redux/Store";
import { StyledSpeedDial } from "src/Shared/Components/CreateEventSpeedDial";
import EditIcon from '@mui/icons-material/Edit';
import { useCustomNavigate } from "src/Shared/Hooks/useCustomNavigate";


const eventPanelStyle: SxProps = {
  ...panelStyle,
  minWidth: "700",
};

const memberCountContainerStyle: SxProps = {
  display: "flex",
  height: "20px",
  alignItems: "center",
  position: "absolute",
  top: "10px",
  right: "10px",
  backdropFilter: "blur(30px)",
  borderRadius: "10px",
  padding: "5px"
}
interface IEventPanelProps {
  containerRef: any
}

export const EventPanel = (props: IEventPanelProps) => {
  const { containerRef } = props;
  const {userState, authState} = useAppSelector(state => ({userState: state.userAccount?.user, authState: state.auth}));
  const [isCardOpen, setIsCardOpen] = useState(false);
  const eventId = useParams().eventId!;
  const naivgate = useCustomNavigate();

  const onNavigate = () => {
    naivgate(`/app/events/${eventId}/settings`);
  }

  const eventQuery = useQueryEvent(eventId);

  if (eventQuery.isLoading) {
    return <Skeleton variant="rounded" width={"100%"} height={"650px"} />
  }

  if (eventQuery.isError) {
    return <Typography>Error</Typography>
  }

  const event = eventQuery.data;


  return (
    <Card
      sx={{ ...eventPanelStyle, height: isCardOpen ? "auto" : "650px", position: "relative" }}
    >
      <Box>
        <CardMedia
          sx={{ height: "300px", flex: 1 }}
          image={event.imageUri}
          title={event?.name}
        />
        <Box sx={memberCountContainerStyle}>
          <CircleIcon sx={{ fontSize: "10px", color: "#3dea46" }} />
          <Typography variant="body2" sx={{ color: "white", paddingLeft: "5px" }}>
            {event.getMemberCount()} going
          </Typography>
        </Box>
      </Box>

      <Stack sx={{ padding: "25px" }} spacing={6}>
        <Stack direction="row">
          <Stack sx={{ flex: 7 }} spacing={1}>
            <Box sx={elipsisStyles}>
              <Typography variant="h4" sx={{ fontWeight: 800 }}>
                {event?.name}
              </Typography>
            </Box>
            <AvatarGroup disableBackgroundFade user={event.getPopulatedRootOrganizer()} size="small" />
          </Stack>
          {!event.isOrganizer(userState?.username) &&
            <Stack
              sx={{ flex: 3, maxWidth: "140px" }}
              spacing={1}
            >
              <RsvpButton event={event.getEvent()} />
            </Stack>
          }
        </Stack>
        <Stack spacing={2}>
          <Typography>{`${event.getDate()} ${event.getTime()}`}</Typography>
          <CopyTextArea
            label="Place holder link"
            copyText="link"
          />
        </Stack>
        {isCardOpen &&
          <Stack>
            <Typography variant="h6">Description</Typography>
            <Typography>{event.description}</Typography>
          </Stack>
        }
        <Stack alignItems="center">
          <StyledLink onClick={() => setIsCardOpen(!isCardOpen)}>View details</StyledLink>
        </Stack>
      </Stack>
      <Portal container={containerRef.current}>
        {authState.isAuthenticated && event.isOrganizer(userState.username) &&
          <StyledSpeedDial
            ariaLabel="SpeedDial-edit-event"
            icon={<EditIcon />}
            onClick={onNavigate}
          />
        }
      </Portal>
    </Card>
  )
}
