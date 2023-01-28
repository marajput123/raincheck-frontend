import {createSlice} from "@reduxjs/toolkit";
import { EmptyString } from "src/Shared/HelperMethods";
import { IUser } from "src/Shared/Models/IUser";
import { initialAuthCheckAction, loginAction, logoutAction, SignUpAction } from "src/Shared/Redux//AuthSlice/Actions";

interface UserReducerState {
    user: IUser
}
const initialState: UserReducerState = {
    user: null
}

const UserAccountSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder
    .addCase(loginAction.fulfilled, (state, action) => {
      state.user = action.payload.user;
    })
    .addCase(logoutAction.fulfilled, (state) => {
      state.user = null
    })
    .addCase(initialAuthCheckAction.fulfilled, (state, action) => {
      state.user = action.payload.user;
    })
  }
});

export const UserAccountSliceActions = UserAccountSlice.actions;
export default UserAccountSlice.reducer;