import { IEvent } from "./IEvent";
import { IUser } from "./IUser";

export interface IMembership {
    _id: string;
    role: string;
    roleType: string;
    event: IEvent | string;
    user: IUser | string;
}


export interface IMembershipCheck {
    isMember: boolean;
    member?: IMembership
}

export interface IRsvpRequestBody {
    email?: string;
    firstName?: string;
    lastName?: string;
    roleId: string,
    eventId: string,
}

export interface IUnrsvpRequestBody {
    memberId: string
}