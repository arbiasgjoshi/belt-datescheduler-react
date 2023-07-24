import PropTypes from "prop-types";
import ProgressBar from "@components/atoms/progress-bar";
const CalendarDate = ({ className, value }) => {
  const progressValue = Math.floor(Math.random() * 100) + 1;

  return (
    <div className={className}>
      {value ? <ProgressBar progress={progressValue}>{value}</ProgressBar> : ""}
    </div>
  );
};

CalendarDate.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number,
};

export default CalendarDate;
