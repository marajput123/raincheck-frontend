import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchAllUserEvents } from "src/Shared/Api/Event";
import { StyledTab, StyledTabs, TabPanel } from "src/Shared/Components/Tabs";
import { IEvent } from "src/Shared/Models/IEvent";
import { AllEvents } from "./AllEvents";
import { AttendingEvents } from "./AttendingEvents";
import { OrganizingEvents } from "./OrganizingEvents";

export const UpcomingEvents = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [events, setEvents] = useState<IEvent[]>([]);

  const getUserEvents = async () => {
    try {
      const response = await fetchAllUserEvents();
      setEvents(response.content);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUserEvents()
  }, [])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <>
    <Container>
      <StyledTabs value={tabIndex} onChange={handleChange}>
        <StyledTab label={"All my events"} aria-label="phone" />
        <StyledTab label={"Attending"} aria-label="favorite" />
        <StyledTab label={"Organizing"} aria-label="person" />
      </StyledTabs>
      <TabPanel value={tabIndex} index={0}>
        <AllEvents events={events} />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <AttendingEvents events={events} />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <OrganizingEvents events={events} />
      </TabPanel>
      </Container>
    </>
  )
}