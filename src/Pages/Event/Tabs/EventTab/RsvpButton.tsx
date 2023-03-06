import { Button, Skeleton } from "@mui/material";
import {  useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom";
import { postGuestRSVP, postRSVP, postUnrsvp } from "src/Shared/Api/Rsvp";
import { BasicModal } from "src/Shared/Components/BasicModal";
import { EmptyString } from "src/Shared/Helpers";
import { IEvent } from "src/Shared/Models/Event/IEvent";
import { IRsvpRequestBody } from "src/Shared/Models/IMembership";
import { RoleType } from "src/Shared/Models/IRole";
import { queryClient } from "src/Shared/ReactQuery";
import { useAppSelector } from "src/Shared/Redux/Store";
import { useQueryMembershipCheck } from "../../Shared/EventQuery";
import { findMemberIdFromSession, getRoleFromEvent, removeGuestMemberSession, saveGuestMemberSession } from "../../Shared/Helpers";
import { GuestRsvpForm, IGuestRsvpForm } from "./GuestForm";

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