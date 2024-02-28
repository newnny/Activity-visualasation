import { Token } from "@/types/types";

const clientId: string = process.env.NEXT_PUBLIC_CLIENT_ID as string;
const clientSecret: string = process.env.NEXT_PUBLIC_CLIENT_SECRET as string;
const tokenURL = "https://www.strava.com/oauth/token";

const TOKEN_ENDPOINT = (refreshToken: string) => {
  return `${tokenURL}?client_id=${clientId}&client_secret=${clientSecret}&grant_type=refresh_token&refresh_token=${refreshToken}`;
};

//refresh token

export const POST = async (req: Request) => {
  const tokenRequest = await req.json();

  try {
    const refreshTokens = await fetch(TOKEN_ENDPOINT(tokenRequest), {
      method: "POST",
    });

    const refreshTokensRes: Token = await refreshTokens.json();
    const reformattingTokenRes: Token = {
      expires_at: refreshTokensRes.expires_at * 1000,
      refresh_token: refreshTokensRes.refresh_token,
      access_token: refreshTokensRes.access_token,
    };
    return new Response(JSON.stringify(reformattingTokenRes));
  } catch (error) {
    return new Response("Fail to call refresh token endpoint");
  }
};
