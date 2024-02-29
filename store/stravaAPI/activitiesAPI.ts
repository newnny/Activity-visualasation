import { createAsyncThunk } from "@reduxjs/toolkit";
import { ActivityRequest, AuthRequest, RefreshRequest } from "@/types/types";

export const getActivityWithRefreshToken = createAsyncThunk(
  "userRefreshTokens/fetch",
  async (refreshRequest: RefreshRequest) => {
    try {
      const res = await fetch("api/refreshToken", {
        method: "POST",
        body: JSON.stringify(refreshRequest),
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        throw new Error("Failed to fetch data in client");
      }
    } catch (error) {
      console.log("Fail to get Activity with refresh token, Error message:", error);
    }
  }
);

export const getAuthExchangeTokenAndActivities = createAsyncThunk(
  "userAuthExchangeTokens/fetch",
  async (tokenRequest: AuthRequest) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth", {
        method: "POST",
        body: JSON.stringify(tokenRequest),
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        throw new Error("Failed to fetch data in client");
      }
    } catch (error) {
      console.error("Fail to get authorised exchange token, Error message:", error);
    }
  }
);

//initial activity with auth code
export const getAuthActivities = createAsyncThunk(
  "userActivities/fetch",
  async (activityhRequest: ActivityRequest) => {
    try {
      const res = await fetch("http://localhost:3000/api/activity", {
        method: "POST",
        body: JSON.stringify(activityhRequest),
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        throw new Error("Failed to authenticate");
      }
    } catch (error) {
      console.log("Fail to getAuthActivitieis, Error message:", error);
    }
  }
);

export const getActivities = createAsyncThunk(
  "activities/fetch",
  async (activityRequest: ActivityRequest) => {
    try {
      const res = await fetch("api/tokens", {
        method: "POST",
        body: JSON.stringify(activityRequest),
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        throw new Error("Failed to authenticate");
      }
    } catch (error) {
      console.log("Fail to getActivities, Error message:", error);
    }
  }
);
