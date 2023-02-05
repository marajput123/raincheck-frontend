import { Card, List, ListItem, Skeleton, Stack, SxProps, TextField, Typography } from "@mui/material";
import React, { useMemo } from "react"
import { useParams } from "react-router-dom";
import { AvatarGroup } from "src/Shared/Components/AvatarGroup";
import { randomImage } from "src/Shared/HelperMethods";
import { useAppSelector } from "src/Shared/Redux/Store";
import { useQueryGetMembers, useQueryMembershipCheck } from "../../Shared/EventQuery";
import { panelStyle } from "../../Shared/Styles";

const memberPanelStyle: SxProps = {
  ...panelStyle,
  height: "650px"
}


export const MemberPanel = () => {
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