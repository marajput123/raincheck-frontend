export interface IUser {
  _id: string
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  isSignedUp?: boolean;
  confirmedAccount?: boolean;
}