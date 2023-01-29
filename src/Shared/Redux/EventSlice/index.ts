import {createSlice} from "@reduxjs/toolkit";
import { EmptyString } from "src/Shared/HelperMethods";
import { IUser } from "src/Shared/Models/IUser";
import { initialAuthCheckAction, loginAction, logoutAction, SignUpAction } from "src/Shared/Redux//AuthSlice/Actions";

interface EventReducerState {
    user: IUser
}
const initialState: EventReducerState = {
    user: null
}

const EventSlice = createSlice({
  name: "EventSlice",
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder
  }
});

export const UserAccountSliceActions = EventSlice.actions;
export default EventSlice.reducer;