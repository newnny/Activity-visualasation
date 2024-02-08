"use client"

import React,{useEffect} from 'react';
import { activitiesAPI } from "@/store/stravaAPI/activitiesAPI"
import { getRefreshToken } from "@/store/stravaAPI/token"

const Dashboard = () => {
useEffect(()=> {
  activitiesAPI();
  //getRefreshToken();
},[])

  return (
    <div>
      <h1 className='dashboard_title'>
        Dashboard
      </h1>

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
    </div>
  )
}

export default Dashboard