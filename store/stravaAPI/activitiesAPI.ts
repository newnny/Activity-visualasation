import { createAsyncThunk } from "@reduxjs/toolkit";
import { TokenBody, AuthRequest } from "@/types/types";

export const getUserActivities = createAsyncThunk(
  "userActivities/fetch",
  async (authRequest: AuthRequest) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth", {
        method: "POST",
        body: JSON.stringify(authRequest),
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        throw new Error("Failed to fetch data in client");
      }
    } catch (error) {
      console.error(error);
    }
  }
);


{/*local testing codes with personal tokens */}
export const getActivities = createAsyncThunk(
  "activities/fetch",
  async (period: TokenBody) => {
    try {
      const res = await fetch("api/tokens", {
        method: "POST",
        body: JSON.stringify(period),
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        throw new Error("Failed to fetch data in client");
      }
    } catch (error) {
      console.error(error);
    }
  }
);

