import { Avatar, Button, Card, CardMedia, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { AxiosResponse } from "axios";
import moment from "moment";
import { useMemo, useState } from "react"
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchEvent } from "src/Shared/Api/Event";
import { axiosInstance, setAuthorizationHeader } from "src/Shared/Axios";
import { AvatarGroup } from "src/Shared/Components/AvatarGroup";
import { CopyTextArea } from "src/Shared/Components/CopyArea";
import { MemberCount } from "src/Shared/Components/MemberCounter";
import { stylePanelBoxShadow } from "src/Shared/Contants";
import { randomImage } from "src/Shared/HelperMethods";
import { IEvent } from "src/Shared/Models/IEvent";
import { IServerResponse } from "src/Shared/Models/IServerResponse";

export const EventPage = () => {
  const eventId = useParams().id!;
  const { isLoading, error, data } = useQuery("fetchEvent", () => fetchEvent(eventId))
  const event = data?.content;
  const imageUri = event?.imageUri || randomImage();
  const date = useMemo(() => moment(event?.date).format('MMM DD, YYYY'), [data])
  const time = useMemo(() => moment(event?.date).format('hh:mm A'), [data])

  if (isLoading) {
    return <Typography>Loading</Typography>
  }

  return (
    <Stack flexDirection={"row"} justifyContent="center">
      <Card sx={{ boxShadow: stylePanelBoxShadow, maxWidth: "800px", flex: 1, minWidth: "340px", borderRadius: "30px" }}>
        <CardMedia
          sx={{ height: "300px", flex: 1, }}
          image={imageUri}
          title={event?.name}
        />
        <Stack sx={{padding: "25px"}} spacing={6}>
          <Stack direction="row">
            <Stack sx={{ flex: 7 }} spacing={1}>
              <Typography variant="h3" sx={{ fontWeight: 800 }}>Event 03</Typography>
              <AvatarGroup imageuri={imageUri} name={"Muhammad Rajput"} username={"@coolio"} size="small"/>
            </Stack>
            <Stack sx={{ flex: 3, maxWidth: "140px" }} spacing={1}>
              <Button variant="contained">RSVP</Button>
              <MemberCount totalMemberCount={3} />
            </Stack>
          </Stack>
          <Stack spacing={2}>
            <Typography>{date}{"      "}{time}</Typography>
            <CopyTextArea label="http://localhost:3000/app/events/63c4dec5e5f11ef7c1eee5e6" copyText="link"/>
          </Stack>
          <Stack alignItems="center">
            <Typography sx={{cursor:"pointer", fontSize: ".9rem", color:"#48a1e1"}}>View details</Typography>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  )
}