import { IShopQueryParams } from "@/interfaces/queryParams";
import { baseApi } from "../../api/baseApi";
import generateQueryString from "@/utils/generateQueryString";

const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createShop: builder.mutation({
      query: (payload) => {
        return {
          url: `/shops/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Shops"],
    }),
    updateShop: builder.mutation({
      query: ({ id, payload }) => {
        return {
          url: `/shops/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["Shops"],
    }),
    changeShopStatus: builder.mutation({
      query: ({ payload, id }) => {
        return {
          url: `/shops/change-status/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["Shops"],
    }),
    deleteShop: builder.mutation({
      query: (id) => {
        return {
          url: `/shops/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Shops"],
    }),
    getSingleShop: builder.query({
      query: (id) => ({
        url: `/shops/${id}`,
        method: "GET",
      }),
      providesTags: ["Shops"],
    }),
    getVendorShops: builder.query({
      query: (vendorId) => ({
        url: `/shops/vendor-shops/${vendorId}`,
        method: "GET",
      }),
      providesTags: ["Shops"],
    }),
    getAllShops: builder.query({
      query: (query: IShopQueryParams) => ({
        url: `/shops?${generateQueryString(query)}`,
        method: "GET",
      }),
      providesTags: ["Shops"],
    }),
  }),
});

export const {
  useCreateShopMutation,
  useUpdateShopMutation,
  useChangeShopStatusMutation,
  useDeleteShopMutation,
  useGetAllShopsQuery,
  useGetSingleShopQuery,
  useGetVendorShopsQuery,
} = shopApi;
