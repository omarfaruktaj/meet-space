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
    deleteBooking: builder.mutation<Response<Booking>, string>({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Bookings", id: "LIST" },
        { type: "Bookings", id },
      ],
    }),
    updateBookingStatus: builder.mutation<
      Booking,
      { id: string; status: "confirmed" | "unconfirmed" | "canceled" }
    >({
      query: ({ id, status }) => ({
        url: `bookings/${id}`,
        method: "PUT",
        body: { isConfirmed: status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Bookings", id: "LIST" },
        { type: "Bookings", id },
      ],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useDeleteBookingMutation,
  useUpdateBookingStatusMutation,
} = bookingApi;
