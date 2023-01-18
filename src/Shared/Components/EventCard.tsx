import { useMemo, useState } from "react";
import moment from "moment";
import { Typography, Stack, Card, Box, Tooltip, IconButton, ClickAwayListener, SxProps } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IEvent } from "../Models/IEvent"

const cardStyle: SxProps = {
    width: "100%",
    maxWidth: "800px",
    minWidth: "320px",
    minHeight: "250px",
    maxHeight: "300px",
    display: "flex",
    backgroundColor: "#f9f9f9",
    boxShadow: "none"
}

const eventDescriptionStyle: SxProps = {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: "6",
    WebkitBoxOrient: "vertical",
    whiteSpace: "normal"
}

export interface IEventCardProps {
    event: IEvent
}

export const EventCard = (props: IEventCardProps) => {
    const { event } = props;

    const date = useMemo(() => moment(event.date).format('DD/MM/YYYY'), [])
    const time = useMemo(() => moment(event.date).format('hh:mm A'), [])

    return (
        <Card sx={cardStyle}>
            <Stack flex={1} spacing={1} sx={{ margin: "20px 0px 20px 20px" }}>
                <Typography fontWeight={700} variant="h5" sx={{}}>
                    {event.name}
                </Typography>
                <Typography fontWeight={700} variant="body2">
                    Description:
                </Typography>
                <Typography sx={eventDescriptionStyle} >
                    {event.description}
                </Typography>
            </Stack>
            <Stack flex={1} spacing={1} sx={{ margin: "20px", overflow: "hidden" }} justifyContent="center">
                <Box>
                    <Typography fontWeight={700} variant="body2">
                        Time:
                    </Typography>
                    <Typography>
                        {time}
                    </Typography>
                </Box>
                <Box>
                    <Typography fontWeight={700} variant="body2">
                        Date:
                    </Typography>
                    <Typography>
                        {date}
                    </Typography>
                </Box>
                <Box>
                    <Typography fontWeight={700} variant="body2">
                        Address:
                    </Typography>
                    <CopyTextArea label={event.location} copyText={event.location} />
                </Box>
            </Stack>
        </Card>
    )
}



const copyBoxStyle: SxProps = {
    backgroundColor: "#e4dddd",
    padding: "5px",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center"
}

const CopyTextArea = (props: { label: string, copyText: string }) => {
    const { label, copyText } = props;
    const [open, setOpen] = useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        navigator.clipboard.writeText(copyText)
        setOpen(true);
    };

    return (
        <Box sx={copyBoxStyle}>
            <Typography noWrap sx={{ flex: 1 }}>
                {label}
            </Typography>
            <ClickAwayListener onClickAway={handleTooltipClose}>
                <Tooltip
                    PopperProps={{
                        disablePortal: true,
                    }}
                    onClose={handleTooltipClose}
                    open={open}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title="Copied!"
                >
                    <IconButton onClick={handleTooltipOpen}>
                        <ContentCopyIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </ClickAwayListener>
        </Box>
    )
}