import { baseApi } from "../../api/baseApi";

const recentProductsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRecentProduct: builder.mutation({
      query: (payload) => {
        return {
          url: `/recent-viewed-products/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["RecentProducts"],
    }),
    deleteRecentProduct: builder.mutation({
      query: (id) => {
        return {
          url: `/recent-viewed-products/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["RecentProducts"],
    }),
    getRecentProduct: builder.query({
      query: () => ({
        url: `/recent-viewed-products`,
        method: "GET",
      }),
      providesTags: ["RecentProducts"],
    }),
  }),
});

export const {
  useCreateRecentProductMutation,
  useDeleteRecentProductMutation,
  useGetRecentProductQuery,
} = recentProductsApi;
