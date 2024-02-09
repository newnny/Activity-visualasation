import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRefreshToken } from "../stravaAPI/token";

type TokenState = {
  loading: boolean;
  refreshToken: string;
  expirationTime: number;
  accessToken: string;
};

const initialState: TokenState = {
  loading: false,
  refreshToken: "",
  expirationTime: new Date().valueOf(),
  accessToken: "",
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    updateToken: (
      state,
      action: PayloadAction<{
        new_expirationTime: number;
        new_accessToken: string;
      }>
    ) => {
      (state.expirationTime = action.payload.new_expirationTime),
        (state.accessToken = action.payload.new_accessToken);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRefreshToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRefreshToken.fulfilled, (state, action) => {
      if (action.payload) {
        state.refreshToken = action.payload.refreshToken;
        state.expirationTime = action.payload.expirationTime;
        state.accessToken = action.payload.accessToken;
        state.loading = false;
      } else {
        console.log("action.payload is null or undefined");
      }
    });
    builder.addCase(getRefreshToken.rejected, (state) => {
      state.loading = false;
      throw new Error("Fetching api failed.");
    });
  },
});

export const { updateToken } = tokenSlice.actions;
