export interface IRole {
    _id: string;
    name: RoleType;
    description: string;
    event: string;
    createdAt: string;
    updatedAt: string;
}

export enum RoleType {
    Organizer = 'Organizer',
    Attendee = 'Attendee',
    Volunteer = 'Volunteer'
}