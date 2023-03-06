import {createAsyncThunk} from "@reduxjs/toolkit";
import { signIn, signUp, verifyToken, fetchSelf } from "src/Shared/Api/Auth";
import { clearAuthInStorage, getAccessTokenFromStorage, setAuthInStorage } from "src/Shared/Helpers";
import { ISignInRequestBody, ISignUpRquestBody } from "src/Shared/Models/IAuth";

interface ISignInParameters {
  credentials: ISignInRequestBody;
  presist: boolean;
}
export const loginAction = createAsyncThunk(
  "AuthSlice/Login",
  async (signInParameters: ISignInParameters, thunkApi) => {
    try {
      const {credentials, presist} = signInParameters
      const signInResponse = await signIn(credentials);
      const content = signInResponse.content
      const accessToken = content.accessToken;
      setAuthInStorage(accessToken, presist);
      return content
    } catch (err: any) {
      if (err?.response?.data) {
        return thunkApi.rejectWithValue(err.response.data)
      }
      return thunkApi.rejectWithValue(err.message)
    }
  }
)

export const logoutAction = createAsyncThunk(
  "AuthSlice/Logout",
  (_, thunkApi) => {
    try {
      clearAuthInStorage()
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
)


export const SignUpAction = createAsyncThunk(
  "AuthSlice/SignUp",
  async (signUpParameters: ISignUpRquestBody, thunkApi) => {
    try {
      const signUpResponse = await signUp(signUpParameters);
      return {
        user: signUpResponse.content
      }
    } catch (err: any) {
      if (err?.response?.data) {
        return thunkApi.rejectWithValue(err.response.data)
      }
      return thunkApi.rejectWithValue(err.message)
    }
  }
)

export const initialAuthCheckAction = createAsyncThunk(
  "AuthSlice/IntialAuthCheck",
  async (_, thunkApi) => {
    try {
      const accessToken = getAccessTokenFromStorage();
      if (!accessToken) {
        throw new Error("unauthenticated")
      }
      const verifyResponse = await verifyToken();
      const authenticatedUser = verifyResponse.content;
      
      return {
        user: authenticatedUser,
        userId: authenticatedUser._id
      }
    } catch (err: any) {
      clearAuthInStorage();
      if (err?.response?.data) {
        return thunkApi.rejectWithValue(err.response.data)
      }
      return thunkApi.rejectWithValue(err.message)
    }
  }
)

