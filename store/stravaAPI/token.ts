const clientId: string = process.env.NEXT_PUBLIC_CLIENT_ID as string;
const clicentSecret: string = process.env.NEXT_PUBLIC_CLIENT_SECRET as string;
const refreshToken: string = process.env.NEXT_PUBLIC_REFRESH_TOKEN as string;

export const getRefreshToken = async () => {
  let response = await fetch(
    `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clicentSecret}&grant_type=refresh_token&refresh_token=${refreshToken}`,
    {
      method: "POST",
    }
  );

  try {
    if (!response.ok) {
      throw new Error(`Failed to fetch a new token.`);
    } else {
      const jsonRes = await response.json();
      return {
        refreshToken: await jsonRes.refresh_token,
        expirationTime: await jsonRes.expires_at,
        accessToken: await jsonRes.acess_token,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
