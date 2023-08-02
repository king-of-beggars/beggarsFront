import React, { useState } from "react";
import "react-dates/initialize";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "styles/css/dayPicker.css";

function DayPicker({selectDate, setSelectDate, focused, setFocused}) {

  const onDateChange = (date) => {
    setSelectDate(moment(date));
  };
  const onFocusChange = ({ focused }) => {
    setFocused(focused);
  };

  // const  isBeforeDay = (a, b) => {
  //   if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
  
  //   const aYear = a.year();
  //   const aMonth = a.month();
  
  //   const bYear = b.year();
  //   const bMonth = b.month();
  
  //   const isSameYear = aYear === bYear;
  //   const isSameMonth = aMonth === bMonth;
  
  //   if (isSameYear && isSameMonth) return a.date() < b.date();
  //   if (isSameYear) return aMonth < bMonth;
  //   return aYear < bYear;
  // }

  // const isInclusivelyAfterDay = (a, b) => {
  //   if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
  //   return !isBeforeDay(a, b);
  // }

  return (
    <>
      {/* <style>{`
      .DateInput_input__focused { 
        border-bottom: none; 
        background-color: transparent;
      },
      .DateInput_input, .SingleDatePickerInput, .DateInput  { 
        background-color: transparent;
      },
      `}</style> */}
      <SingleDatePicker
        numberOfMonths={1}
        date={selectDate}
        onDateChange={onDateChange}
        focused={focused}
        onFocusChange={onFocusChange}
        id="your_unique_id"
        displayFormat="YYYY-MM-DD"
        keepOpenOnDateSelect={false}
        // isOutsideRange={()=>false}
        isOutsideRange={day => day.isAfter(moment())}
        autoFocus
        noBorder
        // verticalSpacing={0}
      />
    </>
  );
}

export default DayPicker;
