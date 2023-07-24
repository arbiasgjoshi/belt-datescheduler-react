/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { format } from "date-fns";
import CalendarDate from "@components/molecules/date";

import "./index.scss";

const DatePicker = ({ dates = [], month, currentYear, onValueSelected }) => {
  const ref = useRef();
  const currentMonth = format(new Date(), "MMMM");

  const scrollToElement = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (month === currentMonth) {
      scrollToElement();
    }
  }, []);

  return (
    <>
      <div className="date-picker" ref={ref}>
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
            dates.map(({ className, key, value, allocatedTasks }) => (
              <CalendarDate
                key={key}
                className={className}
                value={value}
                allocatedTasks={allocatedTasks}
                onValueSelected={(val) => onValueSelected(val)}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default DatePicker;
