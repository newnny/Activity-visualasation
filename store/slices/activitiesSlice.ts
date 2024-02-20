import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getActivities } from "../stravaAPI/activitiesAPI";
import { ActivitiesInterface, TokenAndActivities } from "@/types/types";

type activitiesState = {
  loading: boolean;
  user_activities: TokenAndActivities;
  activities_run: ActivitiesInterface[];
  activities_walk: ActivitiesInterface[];
  activities_ride: ActivitiesInterface[];
  //activities_sail: ActivitiesInterface[];
};

const initialState: activitiesState = {
  loading: false,
  user_activities: {
    token_expiring_date: 0,
    activities: [],
  },
  activities_run: [],
  activities_walk: [],
  activities_ride: [],
  //activities_sail: [],
};

export const activitySlice = createSlice({
  name: "activityData",
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
      action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getActivities.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getActivities.fulfilled, (state, action) => {
      if (action.payload) {
        const all_data: TokenAndActivities = action.payload;
        const activities: ActivitiesInterface[] = all_data.activities;
        state.user_activities = all_data;
        state.loading = false;
        state.activities_run = activities.filter(
          (activity) => activity.sport_type === "Run"
        );
        state.activities_walk = activities.filter(
          (activity) => activity.sport_type === "Walk"
        );
        state.activities_ride = activities.filter(
          (activity) => activity.sport_type === "Ride"
        );
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
