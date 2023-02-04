import { IEvent } from "src/Shared/Models/IEvent";
import { RoleType } from "src/Shared/Models/IMembership";
import { IRole } from "src/Shared/Models/IRole";

export const getRoleFromEvent = (event: IEvent, roleType: RoleType) => {
    const index = event.roles.findIndex((role: IRole | string) => {
        role = role as IRole;
        if (role.name === roleType) {
            return role
        }
    });
    return event.roles[index] as IRole;
}

export const findEventMemberIdFromSession = (eventId: string) => {
  const stringifiedEvents = localStorage.getItem("evntr-guest-events");
  if (!stringifiedEvents) {
    return;
  }

  const events = JSON.parse(stringifiedEvents) as {eventId: string; memberId: string}[];
  const event = events.find((event) => event.eventId === eventId);

  if(!event) {
    return
  }

  return event.memberId;

};