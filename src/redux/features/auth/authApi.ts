import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => {
        return {
          url: `/auth/login`,
          method: "POST",
          body: payload,
        };
      },
    }),
    customerSignUp: builder.mutation({
      query: (payload) => {
        return {
          url: `/users/create-customer`,
          method: "POST",
          body: payload,
        };
      },
    }),
    vendorSignUp: builder.mutation({
      query: (payload) => {
        return {
          url: `/users/create-vendor`,
          method: "POST",
          body: payload,
        };
      },
    }),
    adminSignUp: builder.mutation({
      query: (payload) => {
        return {
          url: `/users/create-admin`,
          method: "POST",
          body: payload,
        };
      },
    }),
    forgotPassword: builder.mutation({
      query: (payload) => {
        return {
          url: `/auth/forgot-password`,
          method: "POST",
          body: payload,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: ({ token, payload }) => {
        console.log(token);
        return {
          url: `/auth/reset-password?token=${token}`,
          method: "POST",
          body: payload,
        };
      },
    }),
    changePassword: builder.mutation({
      query: (payload) => {
        return {
          url: `/auth/change-password`,
          method: "POST",
          body: payload,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useCustomerSignUpMutation,
  useVendorSignUpMutation,
  useAdminSignUpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;
