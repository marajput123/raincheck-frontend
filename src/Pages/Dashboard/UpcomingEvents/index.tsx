import { Container } from "@mui/material";
import React, { useState } from "react";
import { StyledTab, StyledTabs, TabPanel } from "src/Shared/Components/Tabs";
import { AllEvents } from "./AllEvents";
import { AttendingEvents } from "./AttendingEvents";
import { OrganizingEvents } from "./OrganizingEvents";

export const UpcomingEvents = () => {
  const [tabIndex, setTabIndex] = useState(0);

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
          <AllEvents />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <AttendingEvents />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <OrganizingEvents />
        </TabPanel>
      </Container>
    </>
  )
}