import { IUser } from "./IUser";

export class User {
  public _id: string;
  public username: string
  public firstName: string;
  public lastName: string;
  public email: string;
  public phoneNumber: string;

  public constructor(user: IUser) {
    this._id = user._id;
    this.username = user.username;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.phoneNumber = user.phoneNumber;
    this.email = user.email;
  }

  public fullName() {
    let fullName = "";
    if (this.firstName) {
      fullName = `${this.firstName}`;
    } if (this.lastName) {
      fullName = `${fullName} ${this.lastName}`;
    }

    return fullName.trim()
  }
}