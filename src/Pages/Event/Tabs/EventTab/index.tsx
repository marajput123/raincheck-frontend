import { Button, Card, CardMedia, Grid, List, ListItem, Skeleton, Stack, SxProps, TextField, Typography } from "@mui/material";
import moment from "moment";
import React, { useMemo, useState, useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom";
import { postGuestRSVP, postRSVP, postUnrsvp } from "src/Shared/Api/Event";
import { AvatarGroup } from "src/Shared/Components/AvatarGroup";
import { CopyTextArea } from "src/Shared/Components/CopyArea";
import { StyledLink } from "src/Shared/Components/Link";
import { MemberCount } from "src/Shared/Components/MemberCounter";
import { BasicModal } from "src/Shared/Components/BasicModal";
import { styleCardBoxShadow, stylePanelBoxShadow } from "src/Shared/Contants";
import { EmptyString, randomImage } from "src/Shared/HelperMethods";
import { IEvent } from "src/Shared/Models/IEvent";
import { IRsvpRequestBody } from "src/Shared/Models/IMembership";
import { RoleType } from "src/Shared/Models/IRole";
import { IUser } from "src/Shared/Models/IUser";
import { queryClient } from "src/Shared/ReactQuery";
import { useAppSelector } from "src/Shared/Redux/Store";
import { useQueryEvent, useQueryGetMembers, useQueryMembershipCheck } from "../../Shared/EventQuery";
import { findMemberIdFromSession, getRoleFromEvent, removeGuestMemberSession, saveGuestMemberSession } from "../../Shared/Helpers";
import { useForm } from "react-hook-form";
import { FormTextField } from "src/Shared/Components/FormFields/FormTextField";
import { emailPattern } from "src/Shared/Validation";

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

export const EventTab = () => {

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


const MemberPanel = () => {
  const eventId = useParams().id!;
  const authState = useAppSelector(state => state.auth);

  const membershipQuery = useQueryMembershipCheck(eventId, authState.userId, authState.isAuthenticated);
  const membersQuery = useQueryGetMembers(eventId, authState.isAuthenticated);

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
  event: IEvent;
}

export const RsvpButton = (props: IRsvpButton) => {
  const { event } = props;

  const authState = useAppSelector(({ auth }) => auth);
  const [isLoading, setIsLoading] = useState(true);
  const [memberId, setMemberId] = useState(EmptyString);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const membershipQuery = useQueryMembershipCheck(event._id, authState.userId, authState.isAuthenticated);

  useEffect(() => {
    if (membershipQuery.isLoading) {
      return;
    }

    const sessionMemberId = findMemberIdFromSession(event._id);
    const content = membershipQuery.data?.content;
    if (authState.isAuthenticated && content?.isMember) {
      setMemberId(content.member._id);
    } else if (sessionMemberId) {
      setMemberId(sessionMemberId);
    } else {
      setMemberId(EmptyString);
    }

    if (searchParams.get("memberId")) {
      setMemberId(searchParams.get("m"));
    }
    setIsLoading(false);
  }, [authState.isAuthenticated, membershipQuery.isLoading, event, searchParams, membershipQuery.data])

  const onHandleRSVP = async () => {
    if (authState.isAuthenticated) {
      onAuthenticatedRSVP();
    } else {
      setIsModalOpen(true);
    }
  }

  const onHandleUnrsvp = async () => {
    try {
      await postUnrsvp(memberId);
      if (authState.isAuthenticated) {
        refreshMemberAPIs();
      } else {
        setMemberId(EmptyString)
        removeGuestMemberSession(memberId)
      }
    } catch (err) {
      console.log(err)
    }
  }

  /* Authenticated RSVP */
  const onAuthenticatedRSVP = async () => {
    try {
      const role = getRoleFromEvent(event, RoleType.Attendee)
      await postRSVP(event._id, role._id);
      refreshMemberAPIs()
    } catch (err) {
      console.log(err);
    }
  }

  /* Unauthenticated RSVP */
  const onUnAthenticatedRSVP = async (formData: IGuestRsvpForm) => {
    const role = getRoleFromEvent(event, RoleType.Attendee)
    const rsvpData: IRsvpRequestBody = {
      ...formData,
      eventId: event._id,
      roleId: role._id
    }
    try {
      const response = await postGuestRSVP(rsvpData);
      saveGuestMemberSession(response.content.event as string, response.content._id, response.content.user as string);
      setIsModalOpen(false);
      setMemberId(response.content._id);
    } catch (err) {
      console.log(err)
    }
  }

  const refreshMemberAPIs = () => {
    queryClient.invalidateQueries(["Event/FetchEventMemebers"], {});
    queryClient.invalidateQueries(["Event/FetchMembership"]);
  }


  if (isLoading) {
    return (
      <Skeleton variant="rounded" width={"100%"} height={"35px"} />
    );
  }

  return (
    <>
      {
        memberId ?
          <Button onClick={onHandleUnrsvp} variant="contained">UNRSVP</Button> :
          <Button onClick={onHandleRSVP} variant="contained">RSVP</Button>
      }
      <BasicModal
        open={isModalOpen}
        content={<GuestRsvpForm onRsvp={onUnAthenticatedRSVP}/>}
        callbackOnClose={() => setIsModalOpen(false)}
      />
    </>
  )
}


const style: SxProps = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 280,
  bgcolor: 'background.paper',
  boxShadow: styleCardBoxShadow,
  padding: "40px 25px",
  borderRadius: "30px"
};

interface IGuestRsvpForm {
  firstName: string;
  lastName: string;
  email: string;
}

interface IGuestRsvpFormProps {
  onRsvp: (formData: IGuestRsvpForm) => void
}


export const GuestRsvpForm = (props: IGuestRsvpFormProps) => {
  const { onRsvp } = props;
  const { control, handleSubmit } = useForm<IGuestRsvpForm>({
    defaultValues: {
      firstName: EmptyString,
      lastName: EmptyString,
      email: EmptyString,
    }
  });

  const onSubmit = (data: IGuestRsvpForm) => {
    onRsvp(data);
  }

  return (
    <Card sx={style}>
      <Stack spacing={3}>
        <FormTextField
          controllerProps={{
            control,
            rules: {
              required: "Email is required",
              pattern: {value: emailPattern, message: "Must be a valid email"}
            },
            name: "email"
          }}
          label="Email"
        />
        <FormTextField
          controllerProps={{
            control,
            rules: { required: "First name is required" },
            name: "firstName"
          }}
          label="First name"
        />
        <FormTextField
          controllerProps={{
            control,
            rules: { required: "Last name is required" },
            name: "lastName"
          }}
          label="Last name"
        />
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>RSVP</Button>
      </Stack>
    </Card>
  )
};