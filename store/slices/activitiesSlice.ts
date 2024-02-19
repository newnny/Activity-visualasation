import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getActivities } from "../stravaAPI/activitiesAPI";
import { ActivitiesInterface } from "@/types/types";

type activitiesState = {
  loading: boolean;
  activities: ActivitiesInterface[];
  //activities_run: ActivitiesInterface[];
  //activities_walk: ActivitiesInterface[];
  //activities_sail: ActivitiesInterface[];
};

const initialState: activitiesState = {
  loading: false,
  activities: [],
  //activities_run: [],
  //activities_walk: [],
  //activities_sail: [],
};

export const activitySlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    addActivities: (
      state,
      action: PayloadAction<{
        id: number;
        sport_type: string;
        name: string;
        start_date: string;
        distance: number;
        average_speed: number;
        max_speed: number;
        map: {
          id: string;
          summary_polyline: string;
        };
      }>
    ) => {
      Object.assign(state.activities, action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getActivities.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getActivities.fulfilled, (state, action) => {
      if (action.payload) {
        state.activities = action.payload;
        state.loading = false;
      } else {
        console.log("action.payload is null or undefined");
      }
    });
    builder.addCase(getActivities.rejected, (state) => {
      state.loading = false;
      throw new Error("Fetching api failed.");
    });
  },
});


export const { addActivities } = activitySlice.actions;