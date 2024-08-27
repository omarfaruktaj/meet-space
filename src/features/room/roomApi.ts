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
    deleteRoom: builder.mutation<Response<Room>, string>({
      query: (id) => ({
        url: `/rooms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Rooms", id: "LIST" },
        { type: "Rooms", id },
      ],
    }),
    updateRoom: builder.mutation<
      Response<Room>,
      { id: string; data: TRoomFormSchema }
    >({
      query: ({ id, data }) => ({
        url: `/rooms/${id}`,
        method: "PUT",
        body: data,
      }),

      invalidatesTags: (result, error, { id }) => [
        { type: "Rooms", id: "LIST" },
        { type: "Rooms", id },
      ],
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useGetRoomsQuery,
  useDeleteRoomMutation,
  useUpdateRoomMutation,
} = roomApi;
