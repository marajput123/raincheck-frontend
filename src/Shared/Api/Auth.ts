import { AxiosResponse } from "axios";
import { axiosInstance, setAuthorizationHeader } from "src/Shared/Axios";
import { IConfirmAccountBody, ISignInRequestBody, ISignInResponse, ISignUpRquestBody } from "src/Shared/Models/IAuth";
import { IServerResponse } from "src/Shared/Models/IServerResponse";
import { IUser } from "src/Shared/Models/IUser";



export const signIn = async (signInBody: ISignInRequestBody) => {
  try {
    setAuthorizationHeader();
    const response = await axiosInstance
      .post<never, AxiosResponse<IServerResponse<ISignInResponse>>, ISignInRequestBody>(
        "/public/signin",
        signInBody
      );
    return response.data;
  } catch (err) {
    throw err
  }
};

export const signUp = async (signUpBody: ISignUpRquestBody) => {
  try {
    setAuthorizationHeader();
    const response = await axiosInstance
      .post<never, AxiosResponse<IServerResponse<IUser>>, ISignUpRquestBody>(
        "/public/signup",
        signUpBody
      );
    return response.data;
  } catch (err) {
    throw err
  }

}

export const signOut = async () => {
  try {
    setAuthorizationHeader();
    const response = await axiosInstance
      .post<never, AxiosResponse<IServerResponse<null>>>(
        "/public/signout",
      );
    return response.data;
  } catch (err) {
    throw err
  }
}

export const confirmAccount = async (confirmAccountBody: IConfirmAccountBody) => {
  try {
    setAuthorizationHeader();
    const response = await axiosInstance
      .post<never, AxiosResponse<IServerResponse<null>>, IConfirmAccountBody>(
        "/public/confirmUser",
        confirmAccountBody
      );
    return response.data;
  } catch (err) {
    throw err
  }
}

export const verifyToken = async () => {
  try {
    setAuthorizationHeader();
    console.log(axiosInstance.defaults)
    const response = await axiosInstance
      .post<never, AxiosResponse<IServerResponse<null>>>(
        "/public/verifyToken",
      );
    return response.data;
  } catch (err) {
    throw err
  }
}