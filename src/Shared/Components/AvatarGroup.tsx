import { Avatar, SxProps, Typography, Stack, styled, Box } from "@mui/material"
import React from "react";
import { IUser } from "../Models/User/IUser";
import { elipsisStyles } from "../Styles";

const StyleAvatarContainer = styled(
  Stack,
  { shouldForwardProp: (prop) => prop !== 'disableBackgroundFade' }
)<Partial<IAvatarGroupProps>>(({ disableBackgroundFade, theme }) => ({
  alignItems: "center",
  borderRadius: "10px",
  ...(!disableBackgroundFade &&
  {
    transition: theme.transitions.create(["background-color"], {
      duration: theme.transitions.duration.standard,
    }),
    "&:hover": {
      backgroundColor: '#f3f3f3',
    }
  }
  )
}
));


interface IAvatarGroupProps {
  user: Partial<IUser>
  disableBackgroundFade?: boolean
  size?: "small" | "normal";
  sx?: SxProps;
  userInfoContainerStyles?: SxProps;
  onClick?: (event: React.SyntheticEvent, user: Partial<IUser>) => void;
}

export const AvatarGroup = (props: IAvatarGroupProps) => {
  const { user, userInfoContainerStyles, sx, size, disableBackgroundFade } = props;

  const onClickHandler = (e: React.SyntheticEvent) => {
    if (props.onClick) {
      props.onClick(e, user);
    }
  }

  return (
    <StyleAvatarContainer disableBackgroundFade={disableBackgroundFade} sx={{ cursor: "pointer", ...sx }} direction="row" onClick={onClickHandler}>
      <Avatar
        src={""}
        sx={{
          height: size === "small" ? "30px" : "40px",
          width: size === "small" ? "30px" : "40px"
        }}
      />
      <Stack sx={{ pl: 1, ...userInfoContainerStyles }} direction="column" justifyContent="center">
        <Box sx={{ ...elipsisStyles, WebkitLineClamp: 1 }}>
          <Typography
            sx={{
              marginBottom: "-5px",
              fontSize: size === "small" ? ".9rem" : "1rem"
            }}
          >
            {`${user.firstName} ${user.lastName}`}
          </Typography>
        </Box>

        <Box sx={{ ...elipsisStyles, WebkitLineClamp: 1 }}>
          <Typography
            variant="caption"
            sx={{
              fontSize: size === "small" ? ".65rem" : ".75rem",
              color: "#A4A4A4"
            }}
          >
            @{user.username}
          </Typography>
        </Box>
      </Stack>
    </StyleAvatarContainer>
  )
}