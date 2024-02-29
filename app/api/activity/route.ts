import { cookies } from "next/headers";
import {
  ActivitiesInterface,
  TokenAndActivities,
  ActivityRequest
} from "@/types/types";

const athletesURL = "https://www.strava.com/api/v3/athlete/activities";
const ATHLETES_ENDPOINT = (time_period: string) => {
  return `${athletesURL}?${time_period}&page=1&per_page=100`;
};

//initial authentication with the redirect code.
export const POST = async (req: Request) => {
  const activityRequest: ActivityRequest = await req.json();
  const cookieStore = cookies();
  const accessToken: string | undefined =cookieStore.get("access_token")?.value;
  const time_period = `before=${activityRequest.before}&after=${activityRequest.after}`;

  try {
    const activityRes = await fetch(ATHLETES_ENDPOINT(time_period), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!activityRes.ok) {
      throw new Error(`Failed to get activites with current access_token`);
    } else {
      const jsonActivityRes: ActivitiesInterface[] = await activityRes.json();
      const modifiedRes: ActivitiesInterface[] = jsonActivityRes.map((item) => {
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
      const sortByDate = modifiedRes.sort(
        (a, b) =>
          new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
      );
      const tokenAndActivities: TokenAndActivities = {
        token_expiring_date: activityRequest.expires_at,
        activities: sortByDate,
      };
      return new Response(JSON.stringify(tokenAndActivities));
    }
  } catch (error) {
    return new Response(
      "Connecting to token exchange enpoint has been failed."
    );
  }
};
