import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/v1/api",
    // baseUrl: "https://bazarly-server.vercel.app/api/v1",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;

      if (token) {
        headers.set("authorization", `${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    "Products",
    "Orders",
    "Admins",
    "Vendors",
    "Customers",
    "Payments",
  ],
  endpoints: () => ({}),
});
