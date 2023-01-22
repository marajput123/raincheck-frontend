import { Box } from "@mui/system"
import CircleIcon from '@mui/icons-material/Circle';
import { Typography } from "@mui/material";

interface IMemberCountProps {
    totalMemberCount: number
}

export const MemberCount = (props: IMemberCountProps) => {
    const {totalMemberCount} = props;
    return (
        <Box sx={{ display: "flex", height: "20px", alignItems: "center" }}>
            <CircleIcon sx={{ fontSize: "10px" }} color="success" />
            <Typography variant="body2" sx={{ color: "#5E5E5E", paddingLeft: "5px" }}>
              {totalMemberCount} going
            </Typography>
          </Box>
    )
}