import { Avatar, SxProps, Typography, Stack } from "@mui/material"
import React from "react";

interface IAvatarGroupProps {
    imageuri: string;
    name: string;
    username: string;
    onClick?: (event: React.SyntheticEvent, username: string) => void;
    sx?: SxProps;
    userInfoContainerStyles?: SxProps;
    size?: "small" | "normal";
}

export const AvatarGroup = (props: IAvatarGroupProps) => {
    const {imageuri, name, username, userInfoContainerStyles, sx, size} = props;

    const onClickHandler = (e: React.SyntheticEvent) => {
        if (props.onClick) {
            props.onClick(e, username);
        }
    }

    return (
        <Stack sx={{...sx}} direction="row" onClick={onClickHandler}>
            <Avatar
                src={imageuri}
                sx={{
                    height: size === "small" ? "30px" : "40px",
                    width: size === "small" ? "30px" : "40px"
                }}
            />
            <Stack sx={{ pl: 1, ...userInfoContainerStyles}} direction="column" justifyContent="center">
                <Typography
                    sx={{
                        marginBottom: "-5px",
                        fontSize: size === "small" ? ".9rem" : "1rem" 
                    }}
                >
                    {name}
                </Typography>
                <Typography
                    variant="caption"
                    sx={{
                        fontSize: size === "small" ? ".65rem" : ".75rem",
                        color: "#A4A4A4"
                    }}
                >{username}</Typography>
            </Stack>
        </Stack>
    )
}