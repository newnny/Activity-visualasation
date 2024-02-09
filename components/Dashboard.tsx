'use client'

import React, { useEffect } from 'react';
import { getActivities } from '@/store/stravaAPI/activitiesAPI';
import { getRefreshToken } from "@/store/stravaAPI/token"
import { WorldMapChart } from './charts';
import { useAppSelector, useAppDispatch,  } from '@/store/reduxHooks';

const currentTime = new Date().valueOf()

const Dashboard = () => {
  const dispatch = useAppDispatch()

  const activities = useAppSelector(state => state.activities.activities)
  const tokenExpiration = useAppSelector(state => state.token.expirationTime)

  useEffect(() => {
    dispatch(getActivities());
    dispatch(getRefreshToken());
  }, [])

  useEffect(() => {
    const updateData = async() => {
      if (currentTime > tokenExpiration) {
      await dispatch(getRefreshToken())
      await dispatch(getActivities())
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
      <p key={activity.id}>Year: {activity.start_date}</p>
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