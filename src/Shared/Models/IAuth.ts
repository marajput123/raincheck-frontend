import { IUser } from "src/Shared/Models/IUser";

export interface ISignInResponse{
  accessToken: string;
  user: IUser
}

export interface ISignInRequestBody {
  username: string;
  password: string;
}

export interface ISignUpRquestBody extends Omit<IUser, "_id" | "isSignedUp" | "confirmedAccount" > {
  password: string
};

export interface IConfirmAccountBody {
  username: string;
  confirmationCode: string;
}