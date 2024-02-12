'use client'

import React, { useEffect } from 'react';
import { getActivities } from '@/store/stravaAPI/activitiesAPI';
import { getRefreshToken } from "@/store/stravaAPI/token"
import { WorldMapChart } from './charts';
import { useAppSelector, useAppDispatch } from '@/store/reduxHooks';
import { Token } from '@/app/page';
 
const currentTime = new Date().valueOf()
interface DashboardProps {
  tokenProps: Token;
}

const Dashboard = ({tokenProps}:DashboardProps) => {
  const dispatch = useAppDispatch()
  
  console.log(tokenProps,"tokenProps")

  const activities = useAppSelector(state => state.activities.activities)
  const tokenExpiration = useAppSelector(state => state.token.expirationTime)
  const period = {
    before:1514764800, 
    after:1483228800
  }

  useEffect(() => {
    //dispatch(getActivities(period));
    //dispatch(getRefreshToken());
  }, [])

  useEffect(() => {
    const updateData = async() => {
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