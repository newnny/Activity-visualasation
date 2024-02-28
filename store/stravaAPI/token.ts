import { createAsyncThunk } from "@reduxjs/toolkit";

const clientId: string = process.env.NEXT_PUBLIC_CLIENT_ID as string;
const clicentSecret: string = process.env.NEXT_PUBLIC_CLIENT_SECRET as string;
const refreshToken: string = process.env.NEXT_PUBLIC_REFRESH_TOKEN as string;
const baseURL = "https://www.strava.com/oauth/token";

export const getUserRefreshToken =createAsyncThunk(
  "userRefreshTokens/fetch",
  async (tokenRequest: string) => {
    try {
      const res = await fetch("http://localhost:3000/api/userToken", {
        method: "POST",
        body: JSON.stringify(tokenRequest),
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        throw new Error("Failed to fetch data in client");
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export const getAuthExchangeToken = createAsyncThunk(
  "userAuthExchangeTokens/fetch",
  async (tokenRequest: string) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth", {
        method: "POST",
        body: JSON.stringify(tokenRequest),
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        throw new Error("Failed to fetch data in client");
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export const getRefreshToken = createAsyncThunk("token/fetch", async () => {
  const response = await fetch(
    `${baseURL}?client_id=${clientId}&client_secret=${clicentSecret}&grant_type=refresh_token&refresh_token=${refreshToken}`,
    { method: "POST" }
  );

  try {
    if (!response.ok) {
      throw new Error(`Failed to fetch a new token.`);
    } else {
      const tokenRes = await response.json();
      return {
        refreshToken: tokenRes.refresh_token,
        expirationTime: tokenRes.expires_at * 1000,
        accessToken: tokenRes.access_token,
      };
    }
  } catch (error) {
    console.log(error);
  }
});
