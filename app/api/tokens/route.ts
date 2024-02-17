import { Token, TokenBody, ActivitiesInterface } from "@/types/types";

const clientId: string = process.env.NEXT_PUBLIC_CLIENT_ID as string;
const clientSecret: string = process.env.NEXT_PUBLIC_CLIENT_SECRET as string;
const refreshToken: string = process.env.NEXT_PUBLIC_REFRESH_TOKEN as string;
const tokenURL = "https://www.strava.com/oauth/token";
const TOKEN_ENDPOINT = `${tokenURL}?client_id=${clientId}&client_secret=${clientSecret}&grant_type=refresh_token&refresh_token=${refreshToken}`;
const ATHLETES_ENDPOINT = (time_period: string) => `https://www.strava.com/api/v3/athlete/activities?${time_period}&page=5&per_page=100`;

export const POST = async (req: Request) => {
  const params:TokenBody = await req.json()
  var before = params.before
  var after = params.after

  try {
   const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
    });
    const tokenRes: Token = await response.json();
    const reformattingTokenRes: Token = {
      expires_at: tokenRes.expires_at * 1000,
      refresh_token: tokenRes.refresh_token,
      access_token: tokenRes.access_token,
    };
    if (reformattingTokenRes) {
      const accessToken = reformattingTokenRes.access_token;
      const activityRes = await fetch(ATHLETES_ENDPOINT(`before=${before}&after=${after}`), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!activityRes.ok) {
        throw new Error(`Failed to get activites with current access_token`);
      } else {
        const jsonRes: ActivitiesInterface[] = await activityRes.json();
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
        return new Response(JSON.stringify(modifiedRes));
      }
    }
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: `Internal server error: ${err}` }));
  }
};
