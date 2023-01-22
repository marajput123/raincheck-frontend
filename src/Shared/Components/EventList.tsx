import { List, ListItem } from "@mui/material";
import { IEvent } from "../Models/IEvent"
import { WideEventCard } from "./EventCard";

/**
 * @events list of events to be rendered
 * @onEventCardClick handle when user clicks the card
 */
interface IEventListProps {
    events: IEvent[];
    onEventCardClick?: (e: React.SyntheticEvent, event: IEvent) => void
}

export const EventList = (props: IEventListProps) => {
    const { events, onEventCardClick } = props;
    return (<List
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}
    >
        {events.map((event, index) => {
            return (
                <ListItem
                    key={event._id + index}
                    sx={{
                        maxWidth: "600px",
                        width: "100%",
                        padding: "10px 16px 25px 16px"
                    }}
                >
                    <WideEventCard event={event} onCardClick={onEventCardClick}/>
                </ListItem>
            )
        })}
    </List>
    )
}