import PropTypes from "prop-types";

const CalendarDate = ({ className, value }) => {
  return <div className={className}>{value}</div>;
};

CalendarDate.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number,
};

export default CalendarDate;
