import { IMembership } from "../IMembership";
import { IRole } from "../IRole";
import { IUser } from "../User/IUser"

export interface IEventMetadata {
  memberCounts: [{ _id: string, count: number }, { _id: string, count: number }]
  userMembership?: Omit<IMembership, "event" | "user">
}

export interface IEvent {
  _id: string
  name: string;
  organizers: string[] | IUser[]
  startDate: Date;
  description: string;
  location: string;
  address: string;
  link: string;
  roles: string[] | IRole[];
  private: boolean;
  timestamps: Date
  versionKey: string;
  imageUri: string;
  metadata?: IEventMetadata
};