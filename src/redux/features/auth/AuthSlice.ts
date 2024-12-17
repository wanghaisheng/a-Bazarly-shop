import { RootState } from "@/redux/store";
import { TAuth } from "@/types/TAuth";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TAuth = {
  accessToken: null,
  refreshToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveToAuth: (state, action) => {
      const { data } = action.payload;
      state.user = data?.user;
      state.accessToken = data?.accessToken;
      state.refreshToken = data?.refreshToken;
    },
    logOut: () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return initialState;
    },
  },
});

export const { saveToAuth, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
