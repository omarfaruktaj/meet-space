import { baseApi } from "@/redux/api/baseapi";

import { Booking } from "./types";
import { Response } from "@/types";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query<Booking[], null>({
      query: () => "/bookings",
      transformResponse: (result: { data: Booking[] }) => result.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Bookings" as const,
                id: _id,
              })),
              { type: "Bookings", id: "LIST" },
            ]
          : [{ type: "Bookings", id: "LIST" }],
    }),
    myBookings: builder.query<Booking[], null>({
      query: () => "/my-bookings",
      transformResponse: (result: { data: Booking[] }) => result.data,
    }),

    deleteBooking: builder.mutation<Response<Booking>, string>({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [
        { type: "Bookings", id: "LIST" },
        { type: "Bookings", id },
      ],
    }),
    updateBookingStatus: builder.mutation<
      Booking,
      { id: string; status: "confirmed" | "unconfirmed" | "canceled" }
    >({
      query: ({ id, status }) => ({
        url: `/bookings/${id}`,
        method: "PUT",
        body: { isConfirmed: status },
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "Bookings", id: "LIST" },
        { type: "Bookings", id },
      ],
    }),
    createBooking: builder.mutation({
      query: (data) => ({
        url: `/bookings`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "Bookings", id: "LIST" },
        { type: "Bookings", id },
      ],
    }),
  }),
});

export const {
  useMyBookingsQuery,
  useGetBookingsQuery,
  useDeleteBookingMutation,
  useUpdateBookingStatusMutation,
  useCreateBookingMutation,
} = bookingApi;
