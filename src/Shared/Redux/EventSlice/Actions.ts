import {createAsyncThunk} from "@reduxjs/toolkit";
import { fetchEvent, fetchMembershipCheck } from "src/Shared/Api/Event";
import { IEvent } from "src/Shared/Models/IEvent";
import { IMembership } from "src/Shared/Models/IMembership";
import { RootState } from "../Store";

interface IGetEventParameters {
    eventId: string
}

interface IGetEventReturn {
    event: IEvent,
    isMember: boolean,
    membership: IMembership
}
export const getEventAction = createAsyncThunk<any, IGetEventParameters, {state: RootState}>(
  "Event/Get",
  async (params, thunkApi) => {
    const {eventId} = params;
    const userId = thunkApi.getState().userAccount?.user._id;
    
    // try {
    //     const responses = Promise.all([fetchEvent(eventId), fetchMembershipCheck(eventId, userId)])
    // } catch (err: any) {
      
    // }
  }
)