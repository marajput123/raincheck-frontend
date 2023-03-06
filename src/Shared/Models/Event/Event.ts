import moment from "moment";
import { randomImage } from "src/Shared/Helpers";
import { IRole } from "../IRole";
import { IUser } from "../User/IUser";
import { IEvent, IEventMetadata } from "./IEvent"

export class Event {
  private event: IEvent;
  private metadata: IEventMetadata;
  private isPopulated: boolean;
  public _id: string
  public name: string;
  public organizers: string[] | IUser[];
  public startDate: Date;
  public description: string;
  public location: string;
  public address: string;
  public link: string;
  public roles: string[] | IRole[];
  public private: boolean;
  public timestamps: Date
  public versionKey: string;
  public imageUri: string;


  public constructor(event: IEvent) {
    this.event = event
    this._id = event._id
    this.name = event.name
    this.organizers = event.organizers
    this.startDate = event.startDate
    this.description = event.description
    this.location = event.location
    this.address = event.address
    this.link = event.link
    this.roles = event.roles
    this.private = event.private
    this.timestamps = event.timestamps
    this.versionKey = event.versionKey
    this.imageUri = event.imageUri || randomImage();
    this.metadata = event.metadata;
    this.isPopulated = typeof event.organizers[0] !== 'string';
  };

  public getPopulateOrganizers() {
    return this.organizers as IUser[]
  }

  public getPopulatedRootOrganizer() {
    if (this.organizers.length === 0 || typeof this.organizers[0] === "string") {
      return;
    }

    return this.organizers[0] as IUser
  }

  public getTime() {
    return moment(this.startDate).format('hh:mm A');
  }

  public getDate() {
    return moment(this.startDate).format('MMM DD, YYYY');
  }

  public getPopulatedRoles() {
    return this.roles as IRole[];
  }

  public getMetadata() {
    return this.metadata
  }

  public isMember() {
    return this.metadata?.userMembership
  }

  public getUserMembership() {
    if (!this.metadata?.userMembership) {
      return;
    }

    return this.metadata.userMembership;
  }

  public getMemberCount() {
    if (!this.metadata?.memberCounts) {
      return;
    }
    let count = 0;
    this.metadata.memberCounts.forEach((memberCount) => {
      count += memberCount.count
    })
    return count
  }

  public getEvent() {
    return this.event;
  }

  public isRootOrganizer(username: string) {
    if (!this.isPopulated) {
      return;
    }

    const organizers = this.organizers as IUser[];
    return organizers[0]._id === username;
  }


  public isOrganizer(username: string) {
    if (!this.isPopulated) {
      return;
    }

    const organizers = this.organizers as IUser[];
    return organizers.find(organizer => organizer.username === username);
  }
}