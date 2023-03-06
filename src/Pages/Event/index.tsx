import { Container } from "@mui/material";
import { useState } from "react"
import { StyledTab, StyledTabs } from "src/Shared/Components/Tabs";
import { EventTab } from "./Tabs/EventTab";


export const EventPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <Container sx={{ paddingTop: "10px", paddingBottom: "10px" }}>
        <StyledTabs value={tabIndex} onChange={handleTabChange}>
          <StyledTab label={"Event"} />
          {/* TODO: Figure out a way to pass boolean props. Like AvatarGroup.tsx */}
          <StyledTab disabletab={"true"} label={"Coming soon"} />
          <StyledTab disabletab={"true"} label={"Coming soon"} />
        </StyledTabs>
        <EventTab />
      </Container>
    </>
  )
}