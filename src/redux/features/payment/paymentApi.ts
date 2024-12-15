import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (payload) => {
        return {
          url: `/payments/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Payments"],
    }),
    getSinglePayment: builder.query({
      query: (id) => ({
        url: `/payments/${id}`,
        method: "GET",
      }),
      providesTags: ["Payments"],
    }),
  }),
});

export const { useCreatePaymentMutation, useGetSinglePaymentQuery } =
  paymentApi;
