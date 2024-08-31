import { baseApi } from "@/redux/api/baseapi";

export interface IBookingInfo {
  roomId: string;
  totalPrice: number;
  date: string;
  slots: {
    value: string;
    label: string;
  }[];
  userInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation<
      { clientSecret: string },
      { amount: number }
    >({
      query: (amount) => ({
        url: "create-payment-intent",
        method: "POST",
        body: amount,
      }),
    }),
  }),
});

export const { useCreatePaymentIntentMutation } = paymentApi;
