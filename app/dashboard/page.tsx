'use client'
import React, { useEffect, useState } from 'react';
import SimpleBarChart from '@/components/charts/SimpleBarChart';
import { useAppSelector, useAppDispatch } from '@/store/reduxHooks';
import { DatePicker, Dropdown } from '@/components';
import { getAuthActivities, getActivityWithRefreshToken } from '@/store/stravaAPI/activitiesAPI';
import { DateValueType } from 'react-tailwindcss-datepicker';
import { SortedData } from '@/types/types';
import RunnerAnim from '@/components/animations/RunnerAnim';

const currentTime = new Date().valueOf()
const today = new Date();

const Dashboard = () => {
  const activities = useAppSelector(state => state.activities.user_activities.activities)
  const sortedActivities: SortedData = useAppSelector(state => state.activities.sorted_activities)
  const tokenExpiration = useAppSelector(state => state.activities.user_activities.token_expiring_date)
  console.log(tokenExpiration, "tokenExpiration")
  const sportTypes = sortedActivities && Object.keys(sortedActivities)
  const dispatch = useAppDispatch()

  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [selectedType, setSelectedType] = useState("All")
  const [date, setDate] = useState({
    startDate: new Date(new Date().setDate(today.getDate() - 30)),
    endDate: today
  })
  const [refresh, setRefresh] = useState<boolean>(false)

  const period = {
    after: Math.floor(date.startDate.getTime() / 1000.0),
    before: Math.floor(date.endDate.getTime() / 1000.0)
  }

  {/*  
  after initall data fetcing in re-direct page
  data could re-fetch in theses 2 cases
  a) when the access_token has been expired
  b) when the fetching data period has been changed
    b-1) token has been expired, then get refresh token first -> get desired period of data.
    b-2) toekn is sitll valid, just call the getActivity with desired period of date.
  */}


  useEffect(() => {
    if (currentTime > tokenExpiration) {
      dispatch(getActivityWithRefreshToken({
        before: period.before,
        after: period.after
      }))
    }else {
      return;
    }
  }, [tokenExpiration])

  useEffect(() => {
    if (currentTime > tokenExpiration) {
      dispatch(getActivityWithRefreshToken({
        before: period.before,
        after: period.after
      }))
    } else {
      dispatch(getAuthActivities({
        expires_at: tokenExpiration,
        before: period.before,
        after: period.after
      }))
    }
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