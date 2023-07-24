import { useState, useEffect } from "react";
import DatePicker from "@components/molecules/datepicker";

const Calendar = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  console.log(currentYear);
  return (
    <div className="calendar-wrapper">
      <DatePicker currentYear={currentYear} />
    </div>
  );
};

export default Calendar;
