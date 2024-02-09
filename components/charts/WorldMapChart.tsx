"use client"
import React, { useEffect } from 'react';
import { getActivities } from '@/store/stravaAPI/activitiesAPI';
import { useAppSelector } from '@/store/reduxHooks';

export const WorldMapChart = () => {
  const activities = useAppSelector(state => state.activities.activities)
  const loading = useAppSelector(state => state.activities.loading)

  return (
    <>
      {loading ?
        <p>Loading</p> :
        <div>
          chart coming here
        </div>
      }
    </>
  )
}