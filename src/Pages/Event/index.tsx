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
            <Container>
                <StyledTabs value={tabIndex} onChange={handleTabChange}>
                    <StyledTab label={"Event"} />
                    <StyledTab label={"Messages"} />
                    <StyledTab label={"Album"} />
                </StyledTabs>
                <EventTab/>
            </Container>
        </>
    )
}