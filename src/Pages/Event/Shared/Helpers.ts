import { APP_NAME } from "src/Shared/Contants";
import { IEvent } from "src/Shared/Models/Event/IEvent";
import { IGuestSession } from "src/Shared/Models/IGuestSession";
import { RoleType } from "src/Shared/Models/IRole";
import { IRole } from "src/Shared/Models/IRole";

/**
 * Extract the specified role from the even
 * @param event IEvent object
 * @param roleType RoleType
 * @returns IRole
 */
export const getRoleFromEvent = (event: IEvent, roleType: RoleType) => {
  const index = event.roles.findIndex((role: IRole | string) => {
    role = role as IRole;
    if (role.name === roleType) {
      return role
    }
    return null;
  });
  return event.roles[index] as IRole;
}

/**
 * Find the member if of a given event if stored in the guest session.
 * @param eventId Event id
 * @returns 
 */
export const findMemberIdFromSession = (eventId: string) => {
  const currentSessions = getGuestSession();  
  const event = currentSessions.find((event) => event.eventId === eventId);

  if (!event) {
    return
  }
  return event.memberId;
};

/**
 * Save the rsvp for the guest session. Called when the guest user rsvp's
 * @param eventId Event id
 * @param memberId Member Id
 * @param userId user Id
 */
export const saveGuestMemberSession = (eventId: string, memberId: string, userId: string) => {
  const guestSession: IGuestSession = {
    eventId: eventId,
    memberId: memberId,
    userId: userId
  };

  const currentSessions = getGuestSession();
  try {
    saveGuestSession([...currentSessions, guestSession])
  } catch (error) {
    saveGuestSession([guestSession])
  }
}

/**
 * Remove the rsvp from the guest session. Called when the guest user unrsvp's
 * @param memberId Membership Id
 */
export const removeGuestMemberSession = (memberId: string) => {
  try {
    const currentSessions = getGuestSession();
    const filteredArr = currentSessions.filter(session => session.memberId !== memberId);
    saveGuestSession(filteredArr);
  } catch {
    saveGuestSession([])
  }
}

/**
 * Save the list of guest session in the browser session storage 
 * @param sessions List of IGuestSessions
 */
export const saveGuestSession = (sessions: IGuestSession[]) => {
  const updatedSessions = JSON.stringify(sessions);
  sessionStorage.setItem(`${APP_NAME}-guest-session`, updatedSessions);
}

/**
 * Get the current guest session in the browser session storage 
 * @returns IGuestSession 
 */
export const getGuestSession = () => {
  const stringifiedSessions = sessionStorage.getItem(`${APP_NAME}-guest-session`);
  if (!stringifiedSessions) {
    return [];
  }
  return JSON.parse(stringifiedSessions) as IGuestSession[];
}