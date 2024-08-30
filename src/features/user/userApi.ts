import { baseApi } from "@/redux/api/baseapi";
import { TLoginFormSchema, TSignupFormSchema } from "./validation-schema";
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
    login: builder.mutation<Response<User>, TLoginFormSchema>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    getMe: builder.query<User, null>({
      query: () => "/auth/me",
      transformResponse: (result: { data: User }) => result.data,
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useGetMeQuery } = userApi;
