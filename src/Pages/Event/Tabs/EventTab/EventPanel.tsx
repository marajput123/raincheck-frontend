import { Card, CardMedia, Skeleton, Stack, SxProps, Typography } from "@mui/material";
import moment from "moment";
import { useMemo, useState } from "react"
import { useParams } from "react-router-dom";
import { AvatarGroup } from "src/Shared/Components/AvatarGroup";
import { CopyTextArea } from "src/Shared/Components/CopyArea";
import { StyledLink } from "src/Shared/Components/Link";
import { MemberCount } from "src/Shared/Components/MemberCounter";
import { randomImage } from "src/Shared/HelperMethods";
import { IUser } from "src/Shared/Models/IUser";
import { useQueryEvent,  } from "../../Shared/EventQuery";
import { panelStyle } from "../../Shared/Styles";
import { RsvpButton } from "./RsvpButton";

const eventPanelStyle: SxProps = {
  ...panelStyle,
  minWidth: "700",
}

export const EventPanel = () => {
  const eventId = useParams().id!;
  const [isCardOpen, setIsCardOpen] = useState(false);

  const eventQuery = useQueryEvent(eventId);

  const event = eventQuery.data?.content[0];
  const imageUri = useMemo(() => event?.imageUri || randomImage(), [event?.imageUri]);
  const date = useMemo(() => moment(event?.date).format('MMM DD, YYYY'), [event?.date])
  const time = useMemo(() => moment(event?.date).format('hh:mm A'), [event?.date])
  const description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident corporis fuga iure cum accusamus quibusdam quisquam vitae pariatur deleniti ducimus incidunt est doloribus similique exercitationem atque eveniet at, labore ex!";
  const organizer = event?.organizers[0] as IUser
  const username = `@${organizer?.username}`;
  const name = `${organizer?.firstName} ${organizer?.lastName}`;

  if (eventQuery.isLoading) {
    return <Skeleton variant="rounded" width={"100%"} height={"650px"} />
  }

  return (
    <Card
      sx={{ ...eventPanelStyle, height: isCardOpen ? "auto" : "650px" }}
    >
      <CardMedia
        sx={{ height: "300px", flex: 1 }}
        image={imageUri}
        title={event?.name}
      />
      <Stack sx={{ padding: "25px" }} spacing={6}>
        <Stack direction="row">
          <Stack sx={{ flex: 7 }} spacing={1}>
            <Typography variant="h3" sx={{ fontWeight: 800 }}>{event?.name}</Typography>
            <AvatarGroup imageuri={imageUri} name={name} username={username} size="small" />
          </Stack>
          <Stack
            sx={{ flex: 3, maxWidth: "140px" }}
            spacing={1}
          >
            <RsvpButton event={event} />
            <MemberCount totalMemberCount={3} />
          </Stack>
        </Stack>
        <Stack spacing={2}>
          <Typography>{date} {time}</Typography>
          <CopyTextArea
            label="http://localhost:3000/app/events/63c4dec5e5f11ef7c1eee5e6"
            copyText="link"
          />
        </Stack>
        {isCardOpen &&
          <Stack>
            <Typography>{description}</Typography>
          </Stack>
        }
        <Stack alignItems="center">
          <StyledLink onClick={() => setIsCardOpen(!isCardOpen)}>View details</StyledLink>
        </Stack>
      </Stack>
    </Card>
  )
}
