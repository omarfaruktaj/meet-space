import { baseApi } from "@/redux/api/baseapi";
import { Room } from "./types";
import { TRoomFormSchema } from "./validation-schema";
import { Pagination, Response } from "@/types";

export interface QueryString {
  searchTerm?: string;
  page?: number;
  sort?: string;
  limit?: number;
  fields?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const buildQueryString = (params: QueryString) => {
  const queryString = new URLSearchParams();

  for (const key in params) {
    if (params[key] !== undefined) {
      queryString.append(key, String(params[key]));
    }
  }

  return queryString.toString();
};

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
    getARoom: builder.query<Room, string>({
      query: (param) => ({
        url: `/rooms/${param}`,
      }),
      transformResponse: (result: { data: Room }) => result.data,
      providesTags: (_, __, id) => [{ type: "Rooms", id }],
    }),

    getRooms: builder.query<
      { data: Room[]; pagination: Pagination },
      QueryString
    >({
      query: (params) => {
        const {
          page = 1,
          limit = 10,
          searchTerm = "",
          minPrice,
          maxPrice,
          minCapacity,
          maxCapacity,
          sort,
        } = params;

        const queryParams: QueryString = {
          page,
          limit,
          searchTerm,
          sort,
        };

        if (minPrice) queryParams["pricePerSlot[gte]"] = minPrice;
        if (maxPrice) queryParams["pricePerSlot[lte]"] = maxPrice;
        if (minCapacity) queryParams["capacity[gte]"] = minCapacity;
        if (maxCapacity) queryParams["capacity[lte]"] = maxCapacity;

        const queryString = buildQueryString(queryParams);

        return {
          url: `/rooms?${queryString}`,
        };
      },
      transformResponse: (result: {
        data: Room[];
        pagination: Pagination;
      }) => ({
        data: result.data,
        pagination: result.pagination,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: "Rooms" as const,
                id: _id,
              })),
              { type: "Rooms", id: "LIST" },
            ]
          : [{ type: "Rooms", id: "LIST" }],
    }),

    deleteRoom: builder.mutation<Response<Room>, string>({
      query: (id) => ({
        url: `/rooms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [
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

      invalidatesTags: (_, __, { id }) => [
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
  useGetARoomQuery,
} = roomApi;
