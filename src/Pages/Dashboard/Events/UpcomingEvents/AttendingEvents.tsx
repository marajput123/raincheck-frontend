import { Box } from "@mui/system"
import { useMemo } from "react"
import { EventList } from "src/Shared/Components/EventList"
import { useCustomNavigate } from "src/Shared/Hooks/useCustomNavigate"
import { IEvent } from "src/Shared/Models/IEvent"
import { RoleType } from "src/Shared/Models/IMembership"

interface IAttendingEventsProps {
    events: IEvent[]
}


export const AttendingEvents = (props: IAttendingEventsProps) => {
    const navigate = useCustomNavigate()

    const onEventCardClick = (e: React.SyntheticEvent, event: IEvent) => {
        navigate(`/app/event/${event._id}`)
    }

    // This should be request to get all events that the user is attending
    const intialEvent = useMemo(() => {
        return props.events.filter((event) => {
            return event?.metadata?.userMembership?.roleType === RoleType.Attendee
        })
    }, []);

    return (
        <Box sx={{ overflow: "scroll" }}>
            <EventList events={intialEvent} onEventCardClick={onEventCardClick}/>
        </Box>
    )
}