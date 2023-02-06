import { AxiosResponse } from "axios";
import { axiosInstance } from "src/Shared/Axios";
import { IServerResponse } from "src/Shared/Models/IServerResponse";
import { IMembership, IRsvpRequestBody, IUnrsvpRequestBody } from "src/Shared/Models/IMembership";

export const postGuestRSVP = async (rsvpBody: IRsvpRequestBody) => {
  try {
    ;
    const response = await axiosInstance.post<never, AxiosResponse<IServerResponse<IMembership>>, IRsvpRequestBody>(
      `/rsvp/guest`,
      rsvpBody
    );
    return response.data;
  } catch (err) {
    throw err
  }
}

export const postRSVP = async (eventId: string, roleId: string) => {
  try {
    ;
    const response = await axiosInstance.post<never, AxiosResponse<IServerResponse<IMembership>>, IRsvpRequestBody>(
      `/rsvp`,
      {
        eventId: eventId,
        roleId: roleId
      }
    );
    return response.data;
  } catch (err) {
    throw err
  }
}

export const postUnrsvp = async (memberId: string) => {
  try {
    ;
    const response = await axiosInstance.delete<never, AxiosResponse<IServerResponse<null>>, IUnrsvpRequestBody>(
      `/rsvp`,
      { data: { memberId } }
    );
    return response.data;
  } catch (err) {
    throw err
  }
}