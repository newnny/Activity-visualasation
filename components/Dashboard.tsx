'use client'

import React, { useEffect, useState } from 'react';
import { getActivities } from '@/store/stravaAPI/activitiesAPI';
import { getRefreshToken } from "@/store/stravaAPI/token"
import { WorldMapChart } from './charts';
import { useAppSelector, useAppDispatch,  } from '@/store/reduxHooks';

const currentTime = new Date().valueOf()

const Dashboard = () => {
  const [showRefreshBtn, setShowRefreshBtn] = useState<boolean>(false)
  const [refreshToken, setRefreshToken] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const activities = useAppSelector(state => state.activities.activities)
  const tokenExpiration = useAppSelector(state => state.token.expirationTime)
  const token = useAppSelector(state => state.token.accessToken)
  console.log(token, "token")

  useEffect(() => {
    dispatch(getActivities());
  }, [])

  useEffect(() => {
    if (currentTime > tokenExpiration) {
      setShowRefreshBtn(true)
    }
  }, [currentTime])

  const handleClickGetRefreshToken = () => {
    dispatch(getRefreshToken())
    setRefreshToken(!refreshToken)
  }

  return (
    <div>
      <h1 className='dashboard_title'>
        Dashboard
      </h1>
      {showRefreshBtn &&
        <div>
          <p>Your token has been expired, please update it with clicking button</p>
          <button onClick={handleClickGetRefreshToken}>
            get refresh token
          </button>
        </div>
      }
      {activities.map(activity => 
      <p>Year: {activity.start_date}</p>
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