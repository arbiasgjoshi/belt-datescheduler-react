import DatePicker from "@components/molecules/datepicker";
import "./index.scss";

const Calendar = ({ dates = [], onSelectedDate }) => {
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
                onValueSelected={(val) => onSelectedDate(val)}
              />
            </>
          );
        })}
    </div>
  );
};

export default Calendar;
