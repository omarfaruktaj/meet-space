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
      invalidatesTags: [{ type: "Rooms", id: "LIST" }],
    }),

    getRooms: builder.query<Room[], null>({
      query: () => "/rooms",
      transformResponse: (result: { data: Room[] }) => result.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Rooms" as const, id: _id })),
              { type: "Rooms", id: "LIST" },
            ]
          : [{ type: "Rooms", id: "LIST" }],
    }),
  }),
});

export const { useCreateRoomMutation, useGetRoomsQuery } = roomApi;
