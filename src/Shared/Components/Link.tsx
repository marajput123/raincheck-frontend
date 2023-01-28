import { styled, Typography } from "@mui/material";

export const StyledLink = styled(Typography)(({theme}) => ({
    fontSize: ".9rem",
    color: "#48a1e1",
    cursor: "pointer",
    transition: theme.transitions.create(['color'], {
        duration: theme.transitions.duration.standard,
      }),
    "&:hover":{
        color: "#19649a"
    }
}))