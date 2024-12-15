import { IReviewQueryParams } from "@/interfaces/queryParams";
import { baseApi } from "../../api/baseApi";
import generateQueryString from "@/utils/generateQueryString";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (payload) => {
        return {
          url: `/reviews/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Reviews"],
    }),
    updateReview: builder.mutation({
      query: ({ payload, id }) => {
        return {
          url: `/reviews/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["Reviews"],
    }),
    deleteReview: builder.mutation({
      query: (id) => {
        return {
          url: `/reviews/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Reviews"],
    }),
    getProductReview: builder.query({
      query: ({ productId }) => ({
        url: `/reviews/product/${productId}`,
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),
    getShopReview: builder.query({
      query: (shopId) => ({
        url: `/reviews/shop/${shopId}`,
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),
    getAllReviews: builder.query({
      query: (query: IReviewQueryParams) => ({
        url: `/reviews?${generateQueryString(query)}`,
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useGetProductReviewQuery,
  useGetShopReviewQuery,
  useGetAllReviewsQuery,
} = reviewApi;
