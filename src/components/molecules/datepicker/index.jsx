import { useState, useEffect } from "react";
import { endOfMonth, subDays, format, isSameDay, getYear } from "date-fns";
import {
  getFirstDayOfWeek,
  getDaysInMonth,
  getLastDayOfWeek,
} from "../../../helpers/index";

import CalendarDate from "../date";

import "./index.scss";

const DatePicker = () => {
  // These two entries will be used for the purpose of variability between different months
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  // This object will be used to loop through monthly data.
  const [dates, setDates] = useState([]);
  const currentMonthLabel = format(new Date(), "MMMM");
  const currentDate = new Date();
  const currentYear = getYear(currentDate);

  useEffect(() => {
    const today = new Date();
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const firstDayOfWeek = getFirstDayOfWeek(selectedYear, selectedMonth);
    const lastDayOfWeek = getLastDayOfWeek(
      selectedYear,
      selectedMonth,
      daysInMonth
    );

    const newDates = [];

    // Add empty date placeholders for the days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      const emptyDate = subDays(
        endOfMonth(subDays(new Date(selectedYear, selectedMonth - 1, 1), 1)),
        firstDayOfWeek - i - 1
      );

      const dateObj = {
        className: "date-picker-date empty",
        key: `date-empty-${i}`,
        // value: emptyDate.getDate(),
        value: "",
      };
      newDates.push(dateObj);
    }

    // Add the actual dates for the selected month
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(selectedYear, selectedMonth - 1, i);
      const isActive = isSameDay(currentDate, today);
      const className = `date-picker-date${isActive ? " active" : ""}`;
      const dateObj = {
        key: `date-${i}`,
        className,
        value: i,
      };
      newDates.push(dateObj);
    }

    const nextMonth = selectedMonth + 1;
    const daysInNextMonth = getDaysInMonth(nextMonth, currentYear);

    for (let i = 0; i < 6 - lastDayOfWeek; i++) {
      const date = daysInMonth + i + 1;
      const nextMonthDate =
        date <= daysInNextMonth ? date : date - daysInNextMonth;

      const dateObj = {
        className: "date-picker-date empty",
        key: `date-empty-${nextMonth}-${nextMonthDate}`,
        value: "",
      };
      newDates.push(dateObj);
    }

    setDates(newDates);

    console.log(newDates);
  }, [selectedMonth, selectedYear]);

  // const handleYearChange = (event) => {
  //   setSelectedYear(Number(event.target.value));
  // };

  // const handleMonthChange = (event) => {
  //   setSelectedMonth(Number(event.target.value));
  // };

  // // Generate arrays for all months and the last 10 years
  // const allMonths = Array.from({ length: 12 }, (_, index) => index + 1);
  // const years = Array.from({ length: 123 }, (_, index) => currentYear - index);

  return (
    <>
      <div className="date-picker">
        <div className="date-picker--details">
          {currentMonthLabel} {currentYear}
        </div>
        <div className="date-picker-labels">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="date-picker-dates">
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
