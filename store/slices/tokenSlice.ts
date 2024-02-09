import { createSlice } from "@reduxjs/toolkit";
import { getRefreshToken } from "../stravaAPI/token"

type TokenState = {
  loading: boolean;
  refreshToken: string;
  expirationTime: number|undefined;
  accessToken: string;
}

const initialState:TokenState = {
  loading: false,
  refreshToken: "",
  expirationTime: undefined,
  accessToken: "",
}

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {},
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
