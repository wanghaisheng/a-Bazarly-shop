import { baseApi } from "../../api/baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateReview: builder.mutation({
      query: (payload) => {
        return {
          url: `/users/update-profile`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["Profile"],
    }),
    getProfile: builder.query({
      query: () => ({
        url: `/users/get-profile`,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateReviewMutation } = profileApi;
