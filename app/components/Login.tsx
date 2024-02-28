'use client'

import { getAuthPage } from "@/app/utils/auth"

const Login = () => {
  const handleCallStravaAuth = async () => {
    await getAuthPage()
  }
  
  return (
    <div>
      <button onClick={handleCallStravaAuth}>
        Connect with the Strava.
      </button>
    </div>
  )
}

export default Login