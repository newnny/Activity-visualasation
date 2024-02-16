'use client'

import React, { useEffect } from 'react';
import { getActivities } from '@/store/stravaAPI/activitiesAPI';
import { getRefreshToken } from "@/store/stravaAPI/token"
import { WorldMapChart } from '../../components/charts';
import { useAppSelector, useAppDispatch } from '@/store/reduxHooks';
import { callStravaAPI } from '@/app/api/strava/route';
import { getAccessToken } from '@/app/api/strava/route';
import { POST } from '../api/tokens/route';

const currentTime = new Date().valueOf()

const Dashboard = () => {
  const dispatch = useAppDispatch()

  const activities = useAppSelector(state => state.activities.activities)
  const tokenExpiration = useAppSelector(state => state.token.expirationTime)
  const period = {
    before: 1514764800,
    after: 1483228800
  }

  useEffect(() => {
    //dispatch(getActivities(period));
    //dispatch(getRefreshToken());
    const fetchData = async () => {
      try {
        const res = await fetch('api/tokens', {
          method: "POST"
        })
        if (res.ok) {
          const data = await res.json()
          console.log(data, "data")
        } else {
          throw new Error('Failed to fetch data in client');
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [])


  useEffect(() => {
    const updateData = async () => {
      if (currentTime > tokenExpiration) {
        // await dispatch(getRefreshToken())
        //await dispatch(getActivities(period))
      }
    }
    updateData()
  }, [currentTime])


  return (
    <div>
      <h1 className='dashboard_title'>
        Dashboard
      </h1>
      {activities.map(activity =>
        <div>
          <p key={activity.id}>Year: `${activities.length} activities`</p>
          <p key={activity.id}>Year:{activity.start_date}</p>
        </div>
      )}

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