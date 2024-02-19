import { createAsyncThunk } from "@reduxjs/toolkit";
import { TokenBody } from "@/types/types";

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
