import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { PersistentDrawer } from 'src/Shared/Components/Drawer';
import { fetchPublicEvents } from 'src/Shared/Api/Event';
import { useDocumentTitle } from 'src/Shared/Hooks/useDocumentTitle';
import { IEvent } from 'src/Shared/Models/IEvent';
import { Outlet } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import { CreateEventSpeedDial, StyledSpeedDialAction } from 'src/Shared/Components/CreateEventSpeedDial';

export const Dashboard = () => {
  useDocumentTitle("Eventhub | Home")
  const [events, setEvents] = useState<IEvent[]>([]);

  const getEvents = async () => {
    try {
      const eventsResponse = await fetchPublicEvents();
      setEvents([...eventsResponse.content, ...eventsResponse.content, ...eventsResponse.content])
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getEvents()
  }, [])

  return (
    <>
      <CreateEventSpeedDial/>
      <Box sx={{ display: 'flex' }}>
        <PersistentDrawer />
        <Stack sx={{ width: "100%" }}>
          <Outlet />
        </Stack>
      </Box>
    </>
  )
}