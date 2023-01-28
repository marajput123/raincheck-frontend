import { Box, SxProps } from "@mui/material"
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../Redux/Store";
import Navbar from "./Navbar";

const RootLayoutStyle: SxProps = {
    minWidth: "360px",
  };

interface IRootLayoutProps {
    children: React.ReactNode;
}

export const RootLayout = (props: IRootLayoutProps) => {
    const { children } = props;
    // const location = useLocation;
    // const isInsideApp = location().pathname.split("/").length >= 2 && location().pathname.split("/")[1] === "app";
    
    return (
        <Box sx={RootLayoutStyle}>
            {/* {!isInsideApp ? <Navbar/> : null} */}
            {children}
        </Box>
    )
}