import { Button, Card, CardMedia, Grid, List, ListItem, Skeleton, Stack, SxProps, TextField, Typography } from "@mui/material";
import moment from "moment";
import React, { useMemo, useState, useEffect, useRef } from "react"
import { useParams, useSearchParams } from "react-router-dom";
import { postRSVP, postUnrsvp } from "src/Shared/Api/Event";
import { AvatarGroup } from "src/Shared/Components/AvatarGroup";
import { CopyTextArea } from "src/Shared/Components/CopyArea";
import { StyledLink } from "src/Shared/Components/Link";
import { MemberCount } from "src/Shared/Components/MemberCounter";
import { stylePanelBoxShadow } from "src/Shared/Contants";
import { randomImage } from "src/Shared/HelperMethods";
import { IEvent } from "src/Shared/Models/IEvent";
import { IMembershipCheck } from "src/Shared/Models/IMembership";
import { RoleType } from "src/Shared/Models/IRole";
import { IUser } from "src/Shared/Models/IUser";
import { queryClient } from "src/Shared/ReactQuery";
import { useAppSelector } from "src/Shared/Redux/Store";
import { useQueryEvent, useQueryGetMembers, useQueryMembershipCheck } from "../EventQuery";
import { findEventMemberIdFromSession, getRoleFromEvent } from "../Helpers";

const panelStyle: SxProps = {
  border: "1px solid #EAEAEA",
  boxShadow: stylePanelBoxShadow,
  borderRadius: "30px",
}

const eventPanelStyle: SxProps = {
  ...panelStyle,
  minWidth: "700",
}

const memberPanelStyle: SxProps = {
  ...panelStyle,
  height: "650px"
}

export const Event = () => {

  return (
    <>
        <Grid container spacing={2} sx={{ marginTop: "15px" }}>
          <Grid item xs={12} lg={8}>
            <EventPanel />
          </Grid>
          <Grid item xs={12} lg={4}>
            <MemberPanel />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <Typography>hello</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <Typography>hello world</Typography>
            </Card>
          </Grid>
        </Grid>
    </>
  )
}



const EventPanel = () => {
  const eventId = useParams().id!;
  const authState = useAppSelector(state => state.auth);
  const [isCardOpen, setIsCardOpen] = useState(false);

  const eventQuery = useQueryEvent(eventId);
  const membershipQuery = useQueryMembershipCheck(eventId, authState.userId, authState.isAuthenticated);

  const event = eventQuery.data?.content[0];
  const imageUri = useMemo(() => event?.imageUri || randomImage(), [event?.imageUri]);
  const date = useMemo(() => moment(event?.date).format('MMM DD, YYYY'), [event?.date])
  const time = useMemo(() => moment(event?.date).format('hh:mm A'), [event?.date])
  const description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident corporis fuga iure cum accusamus quibusdam quisquam vitae pariatur deleniti ducimus incidunt est doloribus similique exercitationem atque eveniet at, labore ex!";
  const organizer = event?.organizers[0] as IUser
  const username = `@${organizer?.username}`;
  const name = `${organizer?.firstName} ${organizer?.lastName}`; 

  if (eventQuery.isLoading || membershipQuery.isLoading) {
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
            <RsvpButton event={event} membership={membershipQuery?.data?.content}/>
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


const MemberPanel = () => {
  const eventId = useParams().id!;
  const authState = useAppSelector(state => state.auth);

  const membershipQuery = useQueryMembershipCheck(eventId, authState.userId, authState.isAuthenticated);
  const membersQuery = useQueryGetMembers(eventId, authState.isAuthenticated);

  console.log("Memberpanel render", membershipQuery, membersQuery);

  const imageUri = useMemo(() => randomImage(), []);

  if (membershipQuery.isLoading || membershipQuery.isLoading) {
    return <Skeleton variant="rounded" width={"100%"} height={"100%"} />
  }

  return (
    <Card sx={memberPanelStyle}>
      <Stack sx={{ padding: "15px" }} spacing={1}>
        <Typography variant="h6">Who's going</Typography>
        {authState.isAuthenticated ?
          <>
            <Stack>
              <TextField disabled label="Search by name"></TextField>
            </Stack>
            <List sx={{ height: "500px", overflowY: "auto" }}>
              {membersQuery.data?.content.map((member, index) => (
                <React.Fragment key={member.username + index}>
                  <ListItem sx={{ paddingLeft: "0px" }}>
                    <AvatarGroup
                      imageuri={imageUri}
                      name={`${member.firstName} ${member.lastName}`}
                      username={`@${member.username}`}
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </> :
          <Typography>Please sign up to see</Typography>
        }
      </Stack>
    </Card>
  )
}

interface IRsvpButton {
  membership: IMembershipCheck;
  event: IEvent;
}

export const RsvpButton = (props: IRsvpButton) => {
  const {event, membership} = props;
  const member = membership?.member;
  const enventId = event._id;

  const authState = useAppSelector(({auth}) => auth);
  const [isLoading, setIsLoading] = useState(true);
  const [isMember, setIsMember] = useState(!!membership?.isMember && !!member?._id);
  const [memberId, setMemberId] = useState(member?._id);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // If user is already logged in, we will be able to fetch all the information we need
    if (authState.isAuthenticated) {
      setIsLoading(false)
    }

    const sessionMemberId = findEventMemberIdFromSession(enventId);

    // First check the url query parameters
    if (searchParams.get("memberId")) {
      setMemberId(searchParams.get("memberId"));
      setIsMember(true)
    }
    // Then check if it exists in the session storage
    else if (!authState.isAuthenticated && sessionMemberId) {
        setMemberId(sessionMemberId);
        setIsMember(true)
    }

    setIsLoading(false);
  }, [authState.isAuthenticated, enventId, searchParams])

  const onAuthenticatedRSVP = async (roleId: string) => {
    try {
      await postRSVP(event._id, roleId);
      await queryClient.invalidateQueries(["Event/FetchEventMemebers"], {});
      await queryClient.invalidateQueries(["Event/FetchMembership"]);
      setIsMember(true);
    } catch (err) {
      console.log(err);
    }
  }

  const onHandleRSVP = async () => {
    const roleId = getRoleFromEvent(event, RoleType.Attendee)._id;
    if (authState.isAuthenticated) {
      onAuthenticatedRSVP(roleId);
    } 
  }

  const onHandleUnrsvp = async () => {
    try {
      await postUnrsvp(memberId);
      await queryClient.invalidateQueries(["Event/FetchEventMemebers"]);
      await queryClient.invalidateQueries(["Event/FetchMembership"]);
      setIsMember(false)
    } catch (err) {
      console.log(err)
    } 
  }

  if (isLoading) {
    return (
      <Skeleton variant="rounded" width={"100%"} height={"35px"} />
    )
  }


  return (
    <>
      {
        isMember ?
          <Button onClick={onHandleUnrsvp} variant="contained">UNRSVP</Button> :
          <Button onClick={onHandleRSVP} variant="contained">RSVP</Button>
      }
    </>
  )
}