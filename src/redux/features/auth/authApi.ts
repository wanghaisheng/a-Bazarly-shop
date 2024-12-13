import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (payload) => {
        return {
          url: `/users/create-customer`,
          method: "POST",
          body: payload,
        };
      },
    }),
    login: builder.mutation({
      query: (payload) => {
        return {
          url: `/auth/login`,
          method: "POST",
          body: payload,
        };
      },
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation } = authApi;
