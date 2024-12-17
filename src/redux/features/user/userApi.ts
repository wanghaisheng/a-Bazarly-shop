import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changeUserStatus: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/users/${id}/status`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Users", "Customers", "Admins", "Vendors"],
    }),
    updateProfile: builder.mutation({
      query: (payload) => ({
        url: `/users/update-profile`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Users", "Customers", "Admins", "Vendors"],
    }),
    getProfile: builder.query({
      query: () => ({
        url: `/users/get-profile`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
  }),
});

export const {
  useChangeUserStatusMutation,
  useUpdateProfileMutation,
  useGetProfileQuery,
} = userApi;
