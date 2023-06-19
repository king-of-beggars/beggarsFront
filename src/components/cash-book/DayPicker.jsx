import React, { useState } from "react";
import "react-dates/initialize";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

function DayPicker({selectDate, setSelectDate, focused, setFocused}) {
  const onDateChange = (date) => {
    setSelectDate(moment(date));
  };
  const onFocusChange = ({ focused }) => {
    setFocused(focused);
  };

  return (
    <>
      <style>{`.DateInput_input__focused { border-bottom: none; background-color: transparent;}, .DateInput_input { background-color: transparent; }`}</style>
      <SingleDatePicker
        numberOfMonths={1}
        date={selectDate}
        onDateChange={onDateChange}
        focused={focused}
        onFocusChange={onFocusChange}
        id="your_unique_id"
        displayFormat="YYYY-MM-DD"
        keepOpenOnDateSelect={false}
        noBorder
        // verticalSpacing={0}
      />
    </>
  );
}

export default DayPicker;
