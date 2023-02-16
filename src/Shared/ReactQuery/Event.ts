import { useQuery } from "react-query"
import { fetchEvent} from "src/Shared/Api/Event"
import { fetchEventMemberList, fetchMembershipCheck } from "src/Shared/Api/Member"
import { fetchMyEvents } from "src/Shared/Api/Event"
import { IQuery } from "../Models/IServerResponse"

export const useQueryMyEvents = (query?: IQuery) => {
  return useQuery("EventList/FetchMyEvents", () => fetchMyEvents(query))
}

export const useQueryEvent = (eventId: string) => {
    return useQuery("Event/FetchEvent", () => fetchEvent(eventId))
}

export const useQueryMembershipCheck = (eventId: string, userId: string, isAuthenticated: boolean) => {
    return useQuery("Event/FetchMembership", () => fetchMembershipCheck(eventId, userId), {enabled: !!eventId && !!userId && isAuthenticated});
}

export const useQueryGetMembers = (eventId: string, isAuthenticated: boolean) => {
    return useQuery("Event/FetchEventMemebers", () => fetchEventMemberList(eventId), {enabled: !!eventId && isAuthenticated});
}