import { AxiosResponse } from "axios";
import { axiosInstance } from "src/Shared/Axios";
import { IConfirmAccountBody, ISignInRequestBody, ISignInResponse, ISignUpRquestBody } from "src/Shared/Models/IAuth";
import { IServerResponse } from "src/Shared/Models/IServerResponse";
import { IUser } from "src/Shared/Models/User/IUser";



export const signIn = async (signInBody: ISignInRequestBody) => {
    try {
        const response = await axiosInstance
            .post<never, AxiosResponse<IServerResponse<ISignInResponse>>, ISignInRequestBody>(
                "/auth/signin",
                signInBody,
            );
        return response.data;
    } catch (err) {
        throw err
    }
};

export const signUp = async (signUpBody: ISignUpRquestBody) => {
    try {
        const response = await axiosInstance
            .post<never, AxiosResponse<IServerResponse<IUser>>, ISignUpRquestBody>(
                "/auth/signup",
                signUpBody
            );
        return response.data;
    } catch (err) {
        throw err
    }

}

export const signOut = async () => {
    try {
        const response = await axiosInstance
            .post<never, AxiosResponse<IServerResponse<null>>>(
                "/auth/signout",
            );
        return response.data;
    } catch (err) {
        throw err
    }
}

export const confirmAccount = async (confirmAccountBody: IConfirmAccountBody) => {
    try {
        ;
        const response = await axiosInstance
            .post<never, AxiosResponse<IServerResponse<null>>, IConfirmAccountBody>(
                "/auth/confirmUser",
                confirmAccountBody
            );
        return response.data;
    } catch (err) {
        throw err
    }
}

export const verifyToken = async () => {
    try {
        const response = await axiosInstance
            .post<never, AxiosResponse<IServerResponse<IUser>>>(
                "/auth/verifyToken",
            );
        return response.data;
    } catch (err) {
        throw err
    }
}

export const fetchSelf = async () => {
    try {
        ;
        const response = await axiosInstance
            .get<never, AxiosResponse<IServerResponse<IUser>>>(
                "/auth/self"
            );
        return response.data;
    } catch (err) {
        throw err
    }
}