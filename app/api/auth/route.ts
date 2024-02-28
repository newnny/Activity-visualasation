const clientId: string = process.env.NEXT_PUBLIC_CLIENT_ID as string;
const clientSecret: string = process.env.NEXT_PUBLIC_CLIENT_SECRET as string;
const tokenURL = "https://www.strava.com/oauth/token";
const athletesURL = "https://www.strava.com/api/v3/athlete/activities";
const ATHLETES_ENDPOINT = (time_period: string) => {
  return `${athletesURL}?${time_period}&page=1&per_page=100`;
};
const TOKEN_EXCHANGE_ENDPOINT = (authTok: string) => {
  return `${tokenURL}?client_id=${clientId}&client_secret=${clientSecret}&code=${authTok}&grant_type=authorization_code`;
};

import {
  AuthRequest,
  ActivitiesInterface,
  TokenAndActivities,
  TokenExchangeRes,
} from "@/types/types";

export const POST = async (req: Request) => {
  const authRequest: AuthRequest = await req.json();

  try {
    const response = await fetch(
      TOKEN_EXCHANGE_ENDPOINT(authRequest.auth_code),
      {
        method: "POST",
      }
    );
    const authRes: TokenExchangeRes = await response.json();

    if (authRes) {
      const accessToken = authRes.access_token;
      const time_period = `before=${authRequest.before}&after=${authRequest.after}`;
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
        const modifiedRes: ActivitiesInterface[] = jsonActivityRes.map(
          (item) => {
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
          }
        );
        const sortByDate = modifiedRes.sort(
          (a, b) =>
            new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
        );
        const tokenAndActivities: TokenAndActivities = {
          token_expiring_date: authRes.expires_at * 1000,
          activities: sortByDate,
        };
        return new Response(JSON.stringify(tokenAndActivities));
      }
    } else {
      return new Response(`Failed to receive authorised tokens.`);
    }
  } catch (error) {
    return new Response(
      "Connecting to token exchange enpoint has been failed."
    );
  }
};