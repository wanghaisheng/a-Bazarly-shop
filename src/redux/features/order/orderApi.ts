import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (payload) => {
        return {
          url: `/orders/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Orders"],
    }),
    changeOrderStatus: builder.mutation({
      query: (payload) => {
        return {
          url: `/orders/change-status/${payload.id}`,
          method: "PATCH",
          body: payload.data,
        };
      },
      invalidatesTags: ["Orders"],
    }),
    changePaymentStatus: builder.mutation({
      query: (payload) => {
        return {
          url: `/orders/change-payment-status/${payload.id}`,
          method: "PATCH",
          body: payload.data,
        };
      },
      invalidatesTags: ["Orders"],
    }),
    getSingleOrder: builder.query({
      query: (id) => ({
        url: `/orders/get-single-order/${id}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    getProductOrders: builder.query({
      query: (id) => ({
        url: `/orders/get-product-order/${id}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    getAllOrders: builder.query({
      query: ({
        shop,
        searchTerm,
        limit,
        sortBy,
        sortOrder,
        status,
        paymentStatus,
        paymentType,
      }) => ({
        url: `/orders?shop=${shop}&searchTerm=${searchTerm}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&status=${status}&paymentStatus=${paymentStatus}&paymentType=${paymentType}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `/orders/my-orders`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    getShopOrders: builder.query({
      query: (query: string) => ({
        url: `/orders/shop-orders${query}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useChangeOrderStatusMutation,
  useChangePaymentStatusMutation,
  useGetSingleOrderQuery,
  useGetProductOrdersQuery,
  useGetAllOrdersQuery,
  useGetMyOrdersQuery,
  useGetShopOrdersQuery,
} = orderApi;
