import {
  Token,
  ActivitiesInterface,
  TokenAndActivities,
  RefreshRequest,
} from "@/types/types";
import { cookies } from "next/headers";
const clientId: string = process.env.NEXT_PUBLIC_CLIENT_ID as string;
const clientSecret: string = process.env.CLIENT_SECRET as string;
const tokenURL = "https://www.strava.com/oauth/token";
const athletesURL = "https://www.strava.com/api/v3/athlete/activities";
const ATHLETES_ENDPOINT = (time_period: string) => {
  return `${athletesURL}?${time_period}&page=1&per_page=100`;
};

const TOKEN_ENDPOINT = (refreshToken: string) => {
  return `${tokenURL}?client_id=${clientId}&client_secret=${clientSecret}&grant_type=refresh_token&refresh_token=${refreshToken}`;
};

//when access_code is expired, get new access code with the user refresh token
export const POST = async (req: Request) => {
  const refreshRequest: RefreshRequest = await req.json();
  const cookieStore = cookies();
  const currentRefreshToken: string | undefined =
    cookieStore.get("refresh_token")?.value;
  try {
    if (currentRefreshToken) {
      const refreshTokens = await fetch(
        TOKEN_ENDPOINT(currentRefreshToken),
        { method: "POST" }
      );

      const refreshTokensRes: Token = await refreshTokens.json();
      if (refreshTokensRes) {
        const accessToken = refreshTokensRes.access_token;
        const time_period = `before=${refreshRequest.before}&after=${refreshRequest.after}`;
        const activityRes = await fetch(ATHLETES_ENDPOINT(time_period), {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!activityRes.ok) {
          throw new Error(`Failed to get activites with current access_token`);
        } else {
          const jsonActivityRes: ActivitiesInterface[] =
            await activityRes.json();
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
              new Date(a.start_date).getTime() -
              new Date(b.start_date).getTime()
          );
          const tokenAndActivities: TokenAndActivities = {
            token_expiring_date: refreshTokensRes.expires_at * 1000,
            activities: sortByDate,
          };
          cookies().set("access_token", refreshTokensRes.access_token);
          cookies().set("refresh_token", refreshTokensRes.refresh_token);
          cookies().set("token_expiration", tokenAndActivities.token_expiring_date.toString());
          return new Response(JSON.stringify(tokenAndActivities));
        }
      } else {
        return new Response(`Failed to receive authorised tokens.`);
      }
    }
  } catch (error) {
    return new Response("Fail to call refresh token endpoint");
  }
};
