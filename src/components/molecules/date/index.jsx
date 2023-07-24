import PropTypes from "prop-types";
import ProgressBar from "@components/atoms/progress-bar";
import { useEffect, useState } from "react";
const CalendarDate = ({
  className,
  value,
  onValueSelected,
  allocatedTasks = [],
}) => {
  // const progressValue = Math.floor(Math.random() * 100) + 1;
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    const totalDuration =
      allocatedTasks.length > 0
        ? allocatedTasks.reduce((acc, task) => {
            const [hours, minutes] = task.duration.split(":");
            const taskDurationInHours =
              parseInt(hours) + parseFloat(minutes) / 60;
            return acc + taskDurationInHours;
          }, 0)
        : 0;
    if (totalDuration) {
      const allocatedHours = Math.min(totalDuration, 8);
      const allocatedPercentage = (allocatedHours / 8) * 100;
      setPercentage(allocatedPercentage);
    } else {
      setPercentage(0);
    }
  }, []);

  return (
    <div className={className} onClick={() => onValueSelected(value)}>
      {value ? <ProgressBar progress={percentage}>{value}</ProgressBar> : ""}
    </div>
  );
};

CalendarDate.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number,
  onValueSelected: PropTypes.func,
};

export default CalendarDate;
