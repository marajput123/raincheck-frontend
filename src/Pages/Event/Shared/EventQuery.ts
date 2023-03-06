import { useQuery } from "react-query"
import { fetchEvent } from "src/Shared/Api/Event"
import { fetchEventMemberList, fetchMembershipCheck } from "src/Shared/Api/Member"
import { Event } from "src/Shared/Models/Event/Event"

export const useQueryEvent = (eventId: string) => {
    return useQuery(`Event/FetchEvent/${eventId}`, () => fetchEvent(eventId), {
      select: (data) => {
        return new Event(data.content[0]);
      },

    })
}

export const useQueryMembershipCheck = (eventId: string, userId: string, isAuthenticated: boolean) => {
    return useQuery("Event/FetchMembership", () => fetchMembershipCheck(eventId, userId), {enabled: !!eventId && !!userId && isAuthenticated});
}

export const useQueryGetMembers = (eventId: string, isAuthenticated: boolean) => {
    return useQuery("Event/FetchEventMemebers", () => fetchEventMemberList(eventId), {enabled: !!eventId && isAuthenticated});
}