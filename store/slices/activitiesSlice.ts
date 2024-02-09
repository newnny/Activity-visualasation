import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getActivities } from "../stravaAPI/activitiesAPI";

export interface ActivitiesInterface {
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
}

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
      state.activities.push({
        id: action.payload.id,
        sport_type: action.payload.sport_type,
        name: action.payload.name,
        start_date: action.payload.start_date,
        distance: action.payload.distance,
        average_speed: action.payload.average_speed,
        max_speed: action.payload.max_speed,
        map: {
          id: action.payload.map.id,
          summary_polyline: action.payload.map.summary_polyline,
        },
      });
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
