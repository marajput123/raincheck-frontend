import { Box, Card, List, ListItem, Skeleton, Stack, SxProps, Typography } from "@mui/material";
import React from "react"
import { useParams } from "react-router-dom";
import { AvatarGroup } from "src/Shared/Components/AvatarGroup";
import { useAppSelector } from "src/Shared/Redux/Store";
import { useQueryGetMembers, useQueryMembershipCheck } from "../../Shared/EventQuery";
import { panelStyle } from "../../Shared/Styles";
import securitySVG from "src/Shared/Svg/security.svg";

const memberPanelStyle: SxProps = {
  ...panelStyle,
  height: "650px"
}


export const MemberPanel = () => {
  const eventId = useParams().eventId!;
  const authState = useAppSelector(state => state.auth);

  const membershipQuery = useQueryMembershipCheck(eventId, authState.userId, authState.isAuthenticated);
  const membersQuery = useQueryGetMembers(eventId, authState.isAuthenticated);

  if (membershipQuery.isLoading || membershipQuery.isLoading) {
    return <Skeleton variant="rounded" width={"100%"} height={"100%"} />
  }

  return (
    <Card sx={memberPanelStyle}>
      <Stack sx={{ height: "100%" }} spacing={0}>
        <Box sx={{ padding: "20px" }}>
          <Typography variant="h6">Who's going</Typography>
        </Box>
        {authState.isAuthenticated ?
          <>
            <List sx={{ flex: 1, overflowY: "auto", padding: "5px" }}>
              {membersQuery.data?.content.map((member, index) => (
                <React.Fragment key={member.username + index}>
                  <ListItem sx={{ padding: "5px 0px" }}>
                    <AvatarGroup
                      sx={{ width: "100%", padding: "5px" }}
                      user={member}
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </>
          :
          <Stack alignItems={"center"}>
            <img src={securitySVG} />
            <Typography>Please sign up to see</Typography>
          </Stack>
        }

      </Stack>
    </Card>
  )
}