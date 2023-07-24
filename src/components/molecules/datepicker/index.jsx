/* eslint-disable react/prop-types */
import { useRef } from "react";
import CalendarDate from "@components/molecules/date";

import "./index.scss";

const DatePicker = ({ dates = [], month, currentYear, key }) => {
  console.log(month);
  const ref = useRef(null);

  return (
    <>
      <div className="date-picker">
        <div className="date-picker--month-details">
          <h4>
            {month} {currentYear}
          </h4>
        </div>
        <div className="date-picker--day-labels">
          <h4>M</h4>
          <h4>T</h4>
          <h4>W</h4>
          <h4>T</h4>
          <h4>F</h4>
          <h4>S</h4>
          <h4>S</h4>
        </div>
        <div className="date-picker--dates">
          {dates &&
            dates.map(({ className, key, value }) => (
              <CalendarDate key={key} className={className} value={value} />
            ))}
        </div>
      </div>
    </>
  );
};

export default DatePicker;
