import { useState } from "react";
import { Typography, Box, Tooltip, IconButton, ClickAwayListener, SxProps } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const copyBoxStyle: SxProps = {
    backgroundColor: "#f3f3f3",
    padding: "5px",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center"
}

export const CopyTextArea = (props: { label: string, copyText: string }) => {
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