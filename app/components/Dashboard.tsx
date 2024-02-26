'use client'
import React, { useEffect, useState } from 'react';
import SimpleBarChart from '@/components/charts/SimpleBarChart';
import { useAppSelector, useAppDispatch } from '@/store/reduxHooks';
import { DatePicker, Dropdown } from '@/components';
import { getActivities } from '@/store/stravaAPI/activitiesAPI';
import { DateValueType } from 'react-tailwindcss-datepicker';
import { SortedData } from '@/types/types';
import RunnerAnim from '@/components/animations/RunnerAnim';

const currentTime = new Date().valueOf()
const today = new Date();

const Dashboard = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [date, setDate] = useState({
    startDate: new Date(new Date().setDate(today.getDate() - 30)),
    endDate: today
  })
  const activities = useAppSelector(state => state.activities.user_activities.activities)
  const sortedActivities: SortedData = useAppSelector(state => state.activities.sorted_activities)
  const sportTypes = sortedActivities && Object.keys(sortedActivities)
  const tokenExpiration = useAppSelector(state => state.activities.user_activities.token_expiring_date)
  const dispatch = useAppDispatch()

  const [selectedType, setSelectedType] = useState("All")

  const period = {
    after: Math.floor(date.startDate.getTime() / 1000.0),
    before: Math.floor(date.endDate.getTime() / 1000.0)
  }

  useEffect(() => {
    dispatch(getActivities(period))
  }, [])

  useEffect(() => {
    if (currentTime > tokenExpiration) {
      dispatch(getActivities(period))
    }
  }, [tokenExpiration])

  useEffect(() => {
    dispatch(getActivities(period))
  }, [date.startDate, date.endDate])


  const handleDateChange = (newValue: DateValueType) => {
    //selectedDate's type has to match with DatePicker's newValue type
    if (newValue && newValue.startDate && newValue.endDate) {
      setDate({
        startDate: new Date(newValue.startDate),
        endDate: new Date(newValue.endDate)
      });
    }
    else {
      console.error("Invalid newValue:", newValue);
    }
  }

  const handleTypeChange = (newValue: string) => {
    setSelectedType(newValue)
  }

  return (
    <>
      {!activities || !sortedActivities[selectedType] ?
        <div className='flex justify-center align-middle animate-pulse'>
          <h1 className="text-4xl font-bold underline animate-bounce">
            Just a second please!
          </h1>
        </div> :
        <div className="flex flex-row">
          <div className='flex flex-col'>
            <h1 className='dashboard_title'>
              Dashboard
            </h1>
            <button onClick={() => setShowMenu(!showMenu)} className='text-neutral-400'>
              show menu
            </button>
          <div className={showMenu ? "flex flex-col basis-1/3 w-full justify-center px-5" : "hidden"}>
            <DatePicker
              value={date}
              today={today}
              onChange={handleDateChange}
            />
            <Dropdown
              listOptions={sportTypes}
              onChange={handleTypeChange}
              selected={selectedType}
            />
          </div>
          </div>
          <div className="flex basis-2/3 w-full px-5">
            <div className='flex flex-col'>
              <RunnerAnim data={selectedType ? sortedActivities[selectedType] : activities} />
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
              <div className='flex flex-col'>
                <h3 className='text-purple-400'>
                  {selectedType ? selectedType : "All activities"}
                </h3>
                {activities && activities.length > 0 && sortedActivities[selectedType] && sortedActivities[selectedType].length > 0 ?
                  <SimpleBarChart activityData={selectedType ? sortedActivities[selectedType] : activities} /> :
                  <p>No activities data to display.</p>
                }
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Dashboard