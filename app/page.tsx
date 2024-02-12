import { Dashboard } from "@/components";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import axios from 'axios'

const clientId: string = process.env.NEXT_PUBLIC_CLIENT_ID as string;
const clicentSecret: string = process.env.NEXT_PUBLIC_CLIENT_SECRET as string;
const refreshToken: string = process.env.NEXT_PUBLIC_REFRESH_TOKEN as string;
const baseURL = "https://www.strava.com/oauth/token";

export interface Token {
  refresh_token: string;
  expires_at: number;
  access_token: string;
}

export const getTokenProps: GetServerSideProps = async () => {
  // Fetch data from external API
  const response = await axios.post(`${baseURL}?client_id=${clientId}&client_secret=${clicentSecret}&grant_type=refresh_token&refresh_token=${refreshToken}`);

  // Pass data to the page via props
  try {
    const tokenRes: Token = await response.data;
    const reformattingTokenRes: Token = {
      refresh_token: tokenRes.refresh_token,
      expires_at: tokenRes.expires_at * 1000,
      access_token: tokenRes.access_token,
    };
    return { props: { tokenProps: reformattingTokenRes } };
  } catch (error) {
    console.error('Error fetching token props:', error);
    return { props: { tokenProps: null } };
  }
};


export default async function Home({
  tokenProps
}: InferGetServerSidePropsType<typeof getTokenProps>) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Dashboard {...tokenProps} />
    </main>
  );
}
