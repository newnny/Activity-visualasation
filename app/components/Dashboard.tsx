'use client'

import React, { useEffect } from 'react';
import { WorldMapChart } from '../../components/charts';
import { useAppSelector, useAppDispatch } from '@/store/reduxHooks';
import { addActivities } from '@/store/slices/activitiesSlice';
import { getRefreshToken } from '@/store/stravaAPI/token';

const currentTime = new Date().valueOf()

const Dashboard = () => {
  const dispatch = useAppDispatch()

  const activities = useAppSelector(state => state.activities.activities)
  const tokenExpiration = useAppSelector(state => state.token.expirationTime)

  {/*
  var date = new Date();
var timestamp = date.getTime();

The getTime() function returns timestamp in milliseconds. 
We can get current unix timestamp in seconds using below code.
*/}

  var date = new Date();
  var timestamp = Math.floor(date.getTime() / 1000.0);
  const period = {
    after: 1483228800,
    before: 1514764799
  }

  useEffect(() => {dispatch(getRefreshToken())
    const fetchData = async () => {
      try {
        const res = await fetch('api/tokens', {
          method: "POST",
          body: JSON.stringify(period)
        })
        if (res.ok) {
          const data = await res.json()
          await dispatch(addActivities(data));
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
        <div key={activity.id}>
          <p>Year: {`${activities.length} activities`}</p>
          <p>Year:{activity.start_date}</p>
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