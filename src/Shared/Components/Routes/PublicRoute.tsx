import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "src/Shared/Redux/Store"
import { Drawer } from "../Drawer";
import Navbar from "../Navbar";

export const PublicRoute = () => {
    const authState = useAppSelector(state => state.auth);
    const isMobile = useMediaQuery('(max-width:800px)');

    return (
        <>
            <Box sx={{ display: "flex",  flexDirection: !authState.isAuthenticated || isMobile ? "column": "row"}}>
                {authState.isAuthenticated ? <Drawer /> : <Navbar />}
                <Outlet />
            </Box>
        </>
    )
}