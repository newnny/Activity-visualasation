const clientId: string = process.env.NEXT_PUBLIC_CLIENT_ID as string;
const clicentSecret: string = process.env.NEXT_PUBLIC_CLIENT_SECRET as string;
const refreshToken: string = process.env.NEXT_PUBLIC_REFRESH_TOKEN as string;
const access_token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

const tokenURL = "https://www.strava.com/oauth/token"
const activitiesApiURL =
  "https://www.strava.com/api/v3/athlete/activities?page=5&per_page=100";

export const getTestToken = async () => {
  const res = await fetch(
    `${tokenURL}?client_id=${clientId}&client_secret=${clicentSecret}&grant_type=refresh_token&refresh_token=${refreshToken}`,
    {
      method: "POST",
    }
  );
  return res.json();
};

export const getTestActivities = async () => {
  const res = await fetch(activitiesApiURL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return res.json();
};
