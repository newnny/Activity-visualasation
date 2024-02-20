'use client'
import React, { useEffect, useState } from 'react';
import { SimpleBarChar } from '@/components/charts/BarChart';
import { useAppSelector, useAppDispatch } from '@/store/reduxHooks';
import { DatePicker } from '@/components/DatePicker';
import { getActivities } from '@/store/stravaAPI/activitiesAPI';
import { DateValueType } from 'react-tailwindcss-datepicker';

const currentTime = new Date().valueOf()
const today = new Date();

const Dashboard = () => {
  const [date, setDate] = useState({
    startDate: new Date(new Date().setDate(today.getDate() - 30)),
    endDate: today
  })

  const activities = useAppSelector(state => state.activities.user_activities.activities)
  const run = useAppSelector(state => state.activities.activities_run)
  const walk = useAppSelector(state => state.activities.activities_walk)
  const tokenExpiration = useAppSelector(state => state.activities.user_activities.token_expiring_date)
  const dispatch = useAppDispatch()

  const period = {
    after: Math.floor(date.startDate.getTime() / 1000.0),
    before: Math.floor(date.endDate.getTime() / 1000.0)
  }

  useEffect(() => {
    dispatch(getActivities(period))
  }, [])

  useEffect(() => {
    const updateData = async () => {
      if (currentTime > tokenExpiration) {
        await dispatch(getActivities(period))
      }
    }
    updateData()
  }, [currentTime, date.endDate, date.startDate])

  useEffect(() => {
    const updateData = async () => {
      await dispatch(getActivities(period))
    }
    updateData()
  }, [date.endDate, date.startDate])

  const handleValueChange = (newValue: DateValueType) => {
    //selectedDate's type has to match with DatePicker's newValue type
    if (newValue && newValue.startDate && newValue.endDate) {
      console.log("newValue:", newValue);
      setDate({
        startDate: new Date(newValue.startDate),
        endDate: new Date(newValue.endDate)
      });
    }
    else {
      console.error("Invalid newValue:", newValue);
    }
  }

  return (
    <div className="flex flex-row">
      <div className="flex basis-1/3 w-full justify-center px-5">
        <h1 className='dashboard_title'>
          Dashboard
        </h1>
        <DatePicker
          value={date}
          today={today}
          onChange={handleValueChange}
        />
      </div>
      <div className="flex basis-2/3 w-full px-5">
        <div className='flex flex-col'>
          {/*<div className='flex'>
            <p className='text-blue-500'>
              colour scheme:
            </p>
            <p className='text-red-400'>
              colour scheme
            </p>
            <p className='text-yellow-200'>
              colour scheme
            </p>
  </div>
  */}
          <div className='flex'>
            <h3 className='text-purple-400'>
              All activities
            </h3>
            {activities && activities.length > 0 ?
              <SimpleBarChar activityData={activities} /> :
              <p>No activities data to display.</p>
            }
          </div>
          <div className='flex'>
            <h3 className='text-purple-400'>
              RUN
            </h3>
            {run && run.length > 0 ?
              <SimpleBarChar activityData={run} /> :
              <p>No running data to display.</p>
            }
          </div>
          <div className='flex'>
            <h3 className='text-purple-400'>
              WALK
            </h3>
            {walk && walk.length > 0 ?
              <SimpleBarChar activityData={walk} /> :
              <p>No walking data to display.</p>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard