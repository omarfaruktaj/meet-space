import { baseApi } from "@/redux/api/baseapi";
import { Response } from "@/types";
import { Slot } from "./types";
import { TSlotFormSchema } from "./validation-schema";
import { format } from "date-fns";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSlot: builder.mutation<Response<Slot>, TSlotFormSchema>({
      query: (data) => {
        const formatedData = {
          ...data,
          date: format(data.date, "yyyy-MM-dd"),
        };

        return {
          url: "/slots",
          method: "POST",
          body: formatedData,
        };
      },
      invalidatesTags: [{ type: "Slots", id: "LIST" }],
    }),

    getSlots: builder.query<Slot[], null>({
      query: () => "/slots",
      transformResponse: (result: { data: Slot[] }) => result.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Slots" as const, id: _id })),
              { type: "Slots", id: "LIST" },
            ]
          : [{ type: "Slots", id: "LIST" }],
    }),
    getAvailabilSlots: builder.query<Slot[], { date: string; roomId: string }>({
      query: ({ date, roomId }) =>
        `/slots/availability?date=${date}&roomId=${roomId}`,
      transformResponse: (result: { data: Slot[] }) => result.data,
    }),
    deleteSlots: builder.mutation<Response<Slot>, string>({
      query: (id) => ({
        url: `/slots/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Slots", id: "LIST" },
        { type: "Slots", id },
      ],
    }),
    updateSlots: builder.mutation<
      Response<Slot>,
      { id: string; data: TSlotFormSchema }
    >({
      query: ({ id, data }) => {
        const formatedData = {
          ...data,
          date: format(data.date, "yyyy-MM-dd"),
        };
        return {
          url: `/slots/${id}`,
          method: "PUT",
          body: formatedData,
        };
      },

      invalidatesTags: (result, error, { id }) => [
        { type: "Slots", id: "LIST" },
        { type: "Slots", id },
      ],
    }),
  }),
});

export const {
  useCreateSlotMutation,
  useGetSlotsQuery,
  useGetAvailabilSlotsQuery,
  useUpdateSlotsMutation,
  useDeleteSlotsMutation,
} = slotApi;
