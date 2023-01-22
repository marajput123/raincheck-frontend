import { Chip, ChipProps } from "@mui/material"

interface IMemberStatusChip extends ChipProps {
  pointer?: boolean
}

export const AttendeeChip = (props: IMemberStatusChip) => {
  const pointer = props.pointer;
  return <Chip
    sx={{ backgroundColor: "#E4FFCE", color: "#038800", cursor: `${pointer ? "pointer" : "default"}`, ...props.sx }}
    size="small"
    label="Attending"
  />
}
export const OrganizerChip = (props: IMemberStatusChip) => {
  const pointer = props.pointer;
  return <Chip
    sx={{ backgroundColor: "#FFFACE", color: "#909B0A", cursor: `${pointer ? "pointer" : "default"}`, ...props.sx }}
    size="small"
    label="Organizing"
  />
}