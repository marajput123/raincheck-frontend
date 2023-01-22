import { Button, SpeedDial, SpeedDialAction, Stack, styled, Typography } from "@mui/material";
import { useState } from "react";
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { useCustomNavigate } from "../Hooks/useCustomNavigate";

export const StyledSpeedDialAction = styled(SpeedDialAction)({
  borderRadius: "20px",
  width: "100%",
  height: "100%",
  padding: "10px",
  margin: "0px",
  marginBottom: "10px",
  boxShadow: "none",
  border: "1px solid black"
});

export const StyledSpeedDial = styled(SpeedDial)({
  position: 'absolute',
  bottom: 16,
  right: 16,
  alignItems: "flex-end",
  "& .MuiSpeedDial-actions": {
    paddingBottom: "35px"
  }
})

interface ICreateEventSpeedDialProps {
  children?: React.ReactNode
}

export const CreateEventSpeedDial = (props: ICreateEventSpeedDialProps) => {
  const {children} = props
  const [open, setOpen] = useState(false);
  const naviagte = useCustomNavigate();

  const onSpeedDialClick = () => setOpen(!open);

  const onCreateEventClick = () => {
    naviagte("/app/create");
    setOpen(false);
  }

  return (
    <StyledSpeedDial
      ariaLabel="SpeedDial-Createevent"
      icon={<SpeedDialIcon />}
      onClick={onSpeedDialClick}
      open={open}
    >
      {children}
      <StyledSpeedDialAction
        key={"createevent"}
        icon={<><Typography>Create quick event</Typography></>}
        onClick={onCreateEventClick}
      />
    </StyledSpeedDial>
  )
}