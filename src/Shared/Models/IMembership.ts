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