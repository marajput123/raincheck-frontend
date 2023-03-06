import Box from '@mui/material/Box';
import { PersistentDrawer, SwipeableTemporaryDrawer } from 'src/Shared/Components/Drawer/Drawer';
import { useDocumentTitle } from 'src/Shared/Hooks/useDocumentTitle';
import { Outlet } from 'react-router-dom';
import {Stack,useMediaQuery } from '@mui/material';
import { CreateEventSpeedDial, StyledSpeedDialAction } from 'src/Shared/Components/CreateEventSpeedDial';
import { Drawer } from 'src/Shared/Components/Drawer';

export const Dashboard = () => {
  useDocumentTitle("Eventhub | Home");
  const isMobile = useMediaQuery('(max-width:800px)');

  return (
    <Box sx={{display: !isMobile ? "flex" : "block"}}>
      <Drawer/>
      <Stack sx={{ width: "100%" }}>
        <Outlet />
      </Stack>
    </Box>
  )
}

