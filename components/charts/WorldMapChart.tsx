"use client"
import React, { useEffect } from 'react';
import { getActivities } from '@/store/stravaAPI/activitiesAPI';
import { useAppSelector } from '@/store/reduxHooks';

export const WorldMapChart = () => {
  const activities = useAppSelector(state => state.activities.sorted_activities)
  const loading = useAppSelector(state => state.activities.loading)
//chart ideas
  //make a category dropdown:run, sailing, etc based on the user activites
  //from the selected category activities
  //select a sub category: longest activity, shortest time etc
  //sorting data based on the sub category
  //place the data in a racing chart 
  //over the year, when new record is coming it takes the new rank of the chart
  //data label example:  08.feb.2024

  
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