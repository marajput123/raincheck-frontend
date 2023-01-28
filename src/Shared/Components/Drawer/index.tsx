import { useMediaQuery } from "@mui/material";
import { PersistentDrawer, SwipeableTemporaryDrawer } from "./Drawer";

export const Drawer = () => {
    const isMobile = useMediaQuery('(max-width:800px)');

    return !isMobile ? <PersistentDrawer /> : <SwipeableTemporaryDrawer/>
}