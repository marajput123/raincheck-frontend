import {configureStore} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import AuthReducer from "./AuthSlice";
import UserAccountReducer from "./UserAccountSlice";

const store =  configureStore({
  reducer:{
    auth: AuthReducer,
    userAccount: UserAccountReducer
  }
})


export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch
export default store;