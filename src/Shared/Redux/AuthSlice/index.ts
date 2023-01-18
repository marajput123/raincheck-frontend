import {createSlice} from "@reduxjs/toolkit";
import { EmptyString } from "src/Shared/HelperMethods";
import { initialAuthCheckAction, loginAction, logoutAction, SignUpAction } from "./Actions";

interface AuthReducerState {
  isAuthenticated: boolean;
  userId: string;
  initialAuthCheckCompleted: boolean
}
const initialState: AuthReducerState = {
  isAuthenticated: false,
  userId: EmptyString,
  initialAuthCheckCompleted: false
}

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder
    .addCase(loginAction.fulfilled, (state, action) => {
      console.log("here",action)
      state.isAuthenticated = true;
      state.userId = action.payload.user._id
      state.initialAuthCheckCompleted = true;
    })
    .addCase(logoutAction.fulfilled, (state) => {
      state.isAuthenticated = false
    })
    .addCase(initialAuthCheckAction.fulfilled, (state, action) => {
      // Check for payload just for safety measure :)
      state.isAuthenticated = true;
      state.initialAuthCheckCompleted = true
    })
    .addCase(initialAuthCheckAction.rejected, (state) => {
      state.isAuthenticated = false;
      state.initialAuthCheckCompleted = true;
    })
    .addCase(SignUpAction.fulfilled, (state, action) => {
      // state.isAuthenticated = true;
      // state.user = action.payload;
    })
  }
});

export const AuthSliceActions = AuthSlice.actions;
export default AuthSlice.reducer;