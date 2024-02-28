'use client'
import React, { useEffect } from 'react'
import { useSearchParams, useRouter } from "next/navigation";
import { useAppDispatch } from '@/store/reduxHooks';
import { getUserActivities } from '@/store/stravaAPI/activitiesAPI';
import { AuthRequest } from '@/types/types';


const RedirectParams = () => {
  const dispatch = useAppDispatch()
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const today = new Date();

  const period = {
    after: Math.floor((new Date(new Date().setDate(today.getDate() - 30))).getTime() / 1000.0),
    before: Math.floor(today.getTime() / 1000.0)
  }

  //getting initial activity data with auth code.
  //after the initial call, fetching data sill be handled in dashboard page.
  //toekn expiration has to be saved in the token sotre, 
  //so that it can be used later when we compare the token expiration.
  useEffect(() => {
    const authenticate = async () => {
      try {
        if (!code) {
          return router.push('/')
        } else {
          const authRequest: AuthRequest = {
            auth_code: code,
            after: period.after,
            before: period.before
          }
          dispatch(await getUserActivities(authRequest))
          return await router.push('/dashboard')
        }
      } catch (error) {
        console.log(error, "error")
        return router.push('/')
      }
    }
    authenticate()
  }, [])

  return (
    <div>
      <h1>Loading</h1>
    </div>
  )
}

export default RedirectParams;