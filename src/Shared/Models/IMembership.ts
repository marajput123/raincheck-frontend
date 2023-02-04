import { IEvent } from "./IEvent";
import { IUser } from "./IUser";

export interface IMembership {
    _id: string;
    role: string;
    roleType: string;
    event: IEvent | string;
    user: IUser | string;
}

export enum RoleType {
    Organizer = 'Organizer',
    Attendee = 'Attendee',
    Volunteer = 'Volunteer'
}

export interface IMembershipCheck {
    isMember: boolean;
    member?: IMembership
}

export interface IRsvpRequestBody {
    eventId: string;
    roleId: string;
}

export interface IUnrsvpRequestBody {
    memberId: string
}