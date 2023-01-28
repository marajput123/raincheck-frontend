import { Button, Card, CardMedia, Grid, List, ListItem, Skeleton, Stack, SxProps, TextField, Typography } from "@mui/material";
import moment from "moment";
import React, { useMemo, useState } from "react"
import { useParams } from "react-router-dom";
import { AvatarGroup } from "src/Shared/Components/AvatarGroup";
import { CopyTextArea } from "src/Shared/Components/CopyArea";
import { StyledLink } from "src/Shared/Components/Link";
import { MemberCount } from "src/Shared/Components/MemberCounter";
import { stylePanelBoxShadow } from "src/Shared/Contants";
import { randomImage } from "src/Shared/HelperMethods";
import { IUser } from "src/Shared/Models/IUser";
import { useAppSelector } from "src/Shared/Redux/Store";
import { useQueryEvent, useQueryGetMembers, useQueryMembershipCheck } from "./EventQuery";

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
    height: "100%"
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
    const imageUri = useMemo(() => event?.imageUri || randomImage(), []);
    const date = useMemo(() => moment(event?.date).format('MMM DD, YYYY'), [eventQuery.data])
    const time = useMemo(() => moment(event?.date).format('hh:mm A'), [eventQuery.data])
    const description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident corporis fuga iure cum accusamus quibusdam quisquam vitae pariatur deleniti ducimus incidunt est doloribus similique exercitationem atque eveniet at, labore ex!";
    const organizer = event?.organizers[0] as IUser
    const username = `@${organizer?.username}`;
    const name = `${organizer?.firstName} ${organizer?.lastName}`;

    const onHandleRSVP = () => {
        if (authState.isAuthenticated) {

        }
    }

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
                        <Button onClick={onHandleRSVP} variant="contained">RSVP</Button>
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

    const imageUri = randomImage();

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
                        <List>
                            {membersQuery.data?.content.map(member => (
                                <React.Fragment key={member.username}>
                                    <ListItem sx={{ paddingLeft: "0px" }}>
                                        <AvatarGroup
                                            imageuri={imageUri}
                                            name={`${member.firstName}
                                        ${member.lastName}`}
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