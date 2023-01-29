import { Avatar, Button, Card, CardMedia, Container, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { AxiosResponse } from "axios";
import moment from "moment";
import { useMemo, useState } from "react"
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchEvent, fetchMembershipCheck } from "src/Shared/Api/Event";
import { axiosInstance } from "src/Shared/Axios";
import { AvatarGroup } from "src/Shared/Components/AvatarGroup";
import { CopyTextArea } from "src/Shared/Components/CopyArea";
import { StyledLink } from "src/Shared/Components/Link";
import { MemberCount } from "src/Shared/Components/MemberCounter";
import { StyledTab, StyledTabs } from "src/Shared/Components/Tabs";
import { stylePanelBoxShadow } from "src/Shared/Contants";
import { randomImage } from "src/Shared/HelperMethods";
import { IEvent } from "src/Shared/Models/IEvent";
import { IServerResponse } from "src/Shared/Models/IServerResponse";
import { useAppSelector } from "src/Shared/Redux/Store";
import { Event } from "./Tabs/Event";
import { useQueryEvent, useQueryMembershipCheck } from "./EventQuery";


export const EventPage = () => {
    const eventId = useParams().id!;
    const authState = useAppSelector(state => state.auth);
    const [tabIndex, setTabIndex] = useState(0);

    useQueryEvent(eventId)
    useQueryMembershipCheck(eventId, authState.userId, authState.isAuthenticated);
    
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <>
            <Container>
                <StyledTabs value={tabIndex} onChange={handleTabChange}>
                    <StyledTab label={"All my events"} />
                    <StyledTab label={"Attending"} />
                    <StyledTab label={"Organizing"} />
                </StyledTabs>
                <Event/>
            </Container>
        </>
    )
}