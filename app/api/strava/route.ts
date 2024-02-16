import { TokenBody } from "@/types/types";

const clientId: string = process.env.NEXT_PUBLIC_CLIENT_ID as string;
const clientSecret: string = process.env.NEXT_PUBLIC_CLIENT_SECRET as string;
const refreshToken: string = process.env.NEXT_PUBLIC_REFRESH_TOKEN as string;
const tokenURL = "https://www.strava.com/oauth/token";
const TOKEN_ENDPOINT = `${tokenURL}?client_id=${clientId}&client_secret=${clientSecret}&grant_type=refresh_token&refresh_token=${refreshToken}`;
const ATHLETES_ENDPOINT =
  "https://www.strava.com/api/v3/athlete/activities?page=5&per_page=100";

export const callStravaAPI = async (parmas: TokenBody) => {
  const apiRes = await fetch("api/tokens", {
    method: "POST",
    body: JSON.stringify(parmas),
  });
  return await apiRes;
};

export const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
  });
  return response.json();
};

export const getActivities = async () => {
  const { access_token: accessToken } = await getAccessToken();
  const response = await fetch(`${ATHLETES_ENDPOINT}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const activityRes = await response.json();
  return activityRes;
};
