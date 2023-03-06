import { useMediaQuery, useTheme } from "@mui/material";
import { PersistentDrawer, SwipeableTemporaryDrawer } from "./Drawer";

export const Drawer = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return !isMobile ? <PersistentDrawer /> : <SwipeableTemporaryDrawer/>
}