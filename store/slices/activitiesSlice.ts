import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAuthActivities,
  getAuthExchangeTokenAndActivities,
  getActivityWithRefreshToken,
} from "../stravaAPI/activitiesAPI";
import {
  ActivitiesInterface,
  TokenAndActivities,
  SortedData,
} from "@/types/types";

type activitiesState = {
  loading: boolean;
  user_activities: TokenAndActivities;
  sorted_activities: {};
};

const initialState: activitiesState = {
  loading: false,
  user_activities: {
    token_expiring_date: 0,
    activities: [],
  },
  sorted_activities: {},
};

export const activitySlice = createSlice({
  name: "activityData",
  initialState,
  reducers: {
    updateRefreshToken: (
      state,
      action: PayloadAction<{
        refresh_token: string;
      }>
    ) => {
      action.payload;
    },
  },
  extraReducers: (builder) => {
    //getActivityWithRefreshToken
    builder.addCase(getActivityWithRefreshToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getActivityWithRefreshToken.fulfilled, (state, action) => {
      const all_data: TokenAndActivities = action.payload;
      const activities: ActivitiesInterface[] = all_data.activities;
      const sortedData =
        activities &&
        activities.reduce((acc: SortedData, curr) => {
          if (!acc[curr.sport_type]) {
            acc[curr.sport_type] = [];
          }
          acc[curr.sport_type].push(curr);
          return acc;
        }, {});
      if (action.payload) {
        state.user_activities = all_data;
        state.sorted_activities = { All: activities, ...sortedData };
        state.loading = false;
      } else {
        console.log("action.payload is null or undefined");
      }
    });
    builder.addCase(getActivityWithRefreshToken.rejected, (state) => {
      state.loading = false;
      throw new Error("Fetching api failed.");
    });

    //getAuthActivities
    builder.addCase(getAuthActivities.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAuthActivities.fulfilled, (state, action) => {
      const all_data: TokenAndActivities = action.payload;
      const activities: ActivitiesInterface[] = all_data && all_data.activities;
      const sortedData =
        activities &&
        activities.reduce((acc: SortedData, curr) => {
          if (!acc[curr.sport_type]) {
            acc[curr.sport_type] = [];
          }
          acc[curr.sport_type].push(curr);
          return acc;
        }, {});
      if (action.payload) {
        state.user_activities = all_data;
        state.sorted_activities = { All: activities, ...sortedData };
        state.loading = false;
      } else {
        console.log("action.payload is null or undefined");
      }
    });
    builder.addCase(getAuthActivities.rejected, (state) => {
      state.loading = false;
      throw new Error("Fetching api failed.");
    });

    //getAuthExchangeTokenAndActivities
    builder.addCase(getAuthExchangeTokenAndActivities.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAuthExchangeTokenAndActivities.fulfilled,
      (state, action) => {
        const all_data: TokenAndActivities = action.payload;
        const activities: ActivitiesInterface[] = all_data
          ? all_data.activities
          : [];
        const sortedData =
          activities &&
          activities.reduce((acc: SortedData, curr) => {
            if (!acc[curr.sport_type]) {
              acc[curr.sport_type] = [];
            }
            acc[curr.sport_type].push(curr);
            return acc;
          }, {});
        if (action.payload) {
          state.user_activities = all_data;
          state.sorted_activities = { All: activities, ...sortedData };
          state.loading = false;
        } else {
          console.log("action.payload is null or undefined");
        }
      }
    );
    builder.addCase(getAuthExchangeTokenAndActivities.rejected, (state) => {
      state.loading = false;
      throw new Error("Fetching api failed.");
    });
  },
});

export const { updateRefreshToken } = activitySlice.actions;
