import { baseApi } from "@/redux/api/baseapi";
import { Room } from "./types";
import { TRoomFormSchema } from "./validation-schema";
import { Response } from "@/types";

const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRoom: builder.mutation<Response<Room>, TRoomFormSchema>({
      query: (data) => ({
        url: "/rooms",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateRoomMutation } = roomApi;
