import { List, ListItem, useMediaQuery } from "@mui/material";
import { IEvent } from "../../Models/IEvent"
import { EventCard, WideEventCard } from "./EventCard";

/**
 * @events list of events to be rendered
 * @onEventCardClick handle when user clicks the card
 */
interface IEventListProps {
    events: IEvent[];
    direction?: "row" | "column";
    enableScroll?: boolean;
    cardType?: "normal" | "wide" | "responsive";
    onEventCardClick?: (e: React.SyntheticEvent, event: IEvent) => void
}

export const EventList = (props: IEventListProps) => {
    const {
        events,
        enableScroll,
        direction,
        cardType = "responsive",
        onEventCardClick
    } = props;
    const isMobile = useMediaQuery('(max-width:600px)');

    const Card = ({event}: {event: IEvent}) => {
        if (cardType === "responsive") {
            return isMobile ? <EventCard event={event} onCardClick={onEventCardClick}/> : <WideEventCard event={event} onCardClick={onEventCardClick}/>
        } else if (cardType === "normal") {
            return <EventCard event={event} onCardClick={onEventCardClick}/>
        } else {
            return <WideEventCard event={event} onCardClick={onEventCardClick}/>
        }
    }

    return (<List
        sx={{
            display: "flex",
            flexDirection: direction === "row" ? "row" : "column",
            alignItems: "center",
            width: "100%",
            overflowX: direction === "row" && enableScroll ? "scroll" : "hidden"
        }}
    >
        {events.map((event, index) => {
            return (
                <ListItem
                    key={event._id + index}
                    sx={{
                        maxWidth: "600px",
                        width: "100%",
                        padding: "10px 16px 25px 16px",
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <Card event={event}/>
                </ListItem>
            )
        })}
    </List>
    )
}