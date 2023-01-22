import { IMembership } from "./IMembership";
import { IUser } from "./IUser"

export interface IEvent{
  _id: string
  name: string;
  organizers: string[] | IUser[]
  date: Date;
  description: string;
  location: string;
  link: string;
  roles: string[];
  private: boolean;
  timestamps: Date
  versionKey: string;
  imageUri: string;
  metadata?: {
    memberCounts: [{_id: string, count: number}, {_id: string, count: number}]
    userMembership? : Omit<IMembership , "event" | "user">
  },
};