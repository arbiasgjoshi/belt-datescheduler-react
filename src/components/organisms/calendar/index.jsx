import DatePicker from "@components/molecules/datepicker";
import "./index.scss";

const Calendar = ({ dates = [] }) => {
  return (
    <div className="calendar-wrapper">
      {dates.length > 0 &&
        dates.map((date, index) => {
          return (
            <>
              <DatePicker
                key={index}
                dates={date.dates}
                month={date.month}
                currentYear={date.year}
              />
            </>
          );
        })}
    </div>
  );
};

export default Calendar;
