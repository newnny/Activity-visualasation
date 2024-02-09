"use client"

import React, { useEffect } from 'react';
import { getActivities } from '@/store/stravaAPI/activitiesAPI';
import { getRefreshToken } from "@/store/stravaAPI/token"
import { WorldMapChart } from './charts';
import { useAppSelector } from '@/store/reduxHooks';

const Dashboard = () => {

  useEffect(() => {
    getActivities();
    getRefreshToken();
  }, [])

  const activities = useAppSelector(state => state.activities.activities)
  const tokenExpiration = useAppSelector(state => state.token.expirationTime)
  const token = useAppSelector(state => state.token)

  console.log(activities, "activities")
  console.log(tokenExpiration, "tokenExpiration")
  console.log(token, "token")



  return (
    <div>
      <h1 className='dashboard_title'>
        Dashboard
      </h1>

      <p className='text-blue-500'>
        colour scheme:
      </p>
      <p className='text-red-400'>
        colour scheme
      </p>
      <p className='text-yellow-200'>
        colour scheme
      </p>
      <p className='text-purple-400'>
        colour scheme
      </p>

      <WorldMapChart />
    </div>
  )
}

export default Dashboard