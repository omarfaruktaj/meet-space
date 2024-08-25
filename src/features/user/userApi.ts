import { baseApi } from "@/redux/api/baseapi";
import { TSignupFormSchema } from "./validation-schema";
import { Response } from "@/types";
import { User } from "./types";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<Response<User>, TSignupFormSchema>({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignupMutation } = userApi;
