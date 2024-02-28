const clientId: string = process.env.NEXT_PUBLIC_CLIENT_ID as string;
const redirectUri: string = process.env.NEXT_PUBLIC_REDIRECT_URI as string;
const scope: string = process.env.NEXT_PUBLIC_SCOPE as string;


export const getAuthPage = async() => {
  window.location.assign(`https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}/exchange_token&approval_prompt=force&scope=${scope}`)
}
