import generateQueryString from "@/utils/generateQueryString";
import { baseApi } from "../../api/baseApi";
import { ICouponQueryParams } from "@/interfaces/queryParams";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCoupon: builder.mutation({
      query: (payload) => {
        return {
          url: `/coupons/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Coupons"],
    }),
    applyCoupon: builder.mutation({
      query: (payload) => {
        return {
          url: `/coupons/apply-coupon`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Coupons"],
    }),
    updateCoupon: builder.mutation({
      query: ({ id, payload }) => {
        return {
          url: `/coupons/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["Coupons"],
    }),
    deleteCoupon: builder.mutation({
      query: (id) => {
        return {
          url: `/coupons/${id}`,
          method: "POST",
        };
      },
      invalidatesTags: ["Coupons"],
    }),
    getAllCoupons: builder.query({
      query: (query: ICouponQueryParams) => ({
        url: `/coupons?${generateQueryString(query)}`,
        method: "GET",
      }),
      providesTags: ["Coupons"],
    }),
  }),
});

export const {
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  useGetAllCouponsQuery,
  useApplyCouponMutation,
} = couponApi;
