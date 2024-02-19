'use client'
import React, { useEffect, useState } from 'react';
import { WorldMapChart } from '../../components/charts';
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
  const tokenExpiration = useAppSelector(state => state.activities.user_activities.token_expiring_date)
  //console.log(activities, "activities")

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
    <div>
      <h1 className='dashboard_title'>
        Dashboard
      </h1>
      <DatePicker
        value={date}
        today={today}
        onChange={handleValueChange}
      />
      {/*activities.map(activity =>
        <div key={activity.id}>
          <p>Year: {`${activities.length} activities`}</p>
          <p>Year:{activity.start_date}</p>
        </div>
      )*/}

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