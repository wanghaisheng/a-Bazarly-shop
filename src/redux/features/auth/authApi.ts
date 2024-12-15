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
  }),
});

export const {
  useLoginMutation,
  useCustomerSignUpMutation,
  useVendorSignUpMutation,
  useAdminSignUpMutation,
} = authApi;
