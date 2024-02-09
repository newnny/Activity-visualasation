import { createAsyncThunk } from "@reduxjs/toolkit";
import { ActivitiesInterface } from "@/types";

const access_token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
const apiURL = "https://www.strava.com/api/v3/athlete/activities?page=5&per_page=100";

export const getActivities = createAsyncThunk("activities/fetch", async () => {
  const response = await fetch(apiURL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  try {
    if (!response.ok) {
      throw new Error(`Failed to get activites`);
    } else {
      const jsonRes: ActivitiesInterface[] = await response.json();
      const modifiedRes: ActivitiesInterface[] = jsonRes.map((item) => {
        return {
          id: item.id,
          sport_type: item.sport_type,
          name: item.name,
          start_date: item.start_date,
          distance: item.distance,
          average_speed: item.average_speed,
          max_speed: item.max_speed,
          map: {
            id: item.map.id,
            summary_polyline: item.map.summary_polyline,
          },
        };
      });
      return modifiedRes;
    }
  } catch (error) {
    console.log(error);
  }
});
