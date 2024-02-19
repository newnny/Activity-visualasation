'use client'
import React from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker"

interface DatepickerProps {
  onChange: (newValue: DateValueType) => void; // require form of date: yyyy-MM-dd
  today: Date;
  value:{
    startDate: Date;
    endDate: Date;
  };
}
export const DatePicker:React.FC<DatepickerProps> = ({
  onChange,
  value,
  today
}) => {

  return (
    <Datepicker
      value={value}
      onChange={onChange}
      startFrom={new Date(new Date().setDate(today.getDate() - 30))}
      showShortcuts={true}
      showFooter={true}
      //useRange={false} 
    />

  )
}