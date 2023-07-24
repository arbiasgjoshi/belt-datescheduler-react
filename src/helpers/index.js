import {
  isSameDay,
  format,
  startOfWeek,
  endOfWeek,
  addWeeks,
  addMinutes,
  isWithinInterval,
  differenceInMinutes,
  parse,
} from "date-fns";

export const getFirstDayOfWeek = (year, month) => {
  return new Date(year, month - 1, 0).getDay();
};

export const getLastDayOfWeek = (year, month, daysInMonth) => {
  const lastDay = new Date(year, month - 1, daysInMonth);
  return lastDay.getDay();
};

export const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

export const addInitialDates = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const months = [];

  // Loop through all months
  for (let month = 1; month <= 12; month++) {
    const daysInMonth = getDaysInMonth(currentYear, month);
    const firstDayOfWeek = getFirstDayOfWeek(currentYear, month);
    const lastDayOfWeek = getLastDayOfWeek(currentYear, month, daysInMonth);
    const dates = [];

    // Add empty date placeholders for the days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      const dateObj = {
        year: currentYear,
        month,
        className: "date-picker-date empty",
        key: `date-empty-${i}`,
        value: null,
      };
      dates.push(dateObj);
    }

    // Generate dates for the month
    for (let day = 1; day <= daysInMonth; day++) {
      const thisDate = new Date(currentYear, month - 1, day);
      const isActive = isSameDay(thisDate, currentDate);
      const className = `date-picker-date${isActive ? " active" : ""}`;
      const dateObj = {
        year: currentYear,
        month,
        className,
        key: `date-${day}`,
        value: day,
        allocatedTasks: [],
        formatedDate: format(thisDate, "dd/MM/yyyy"),
      };
      dates.push(dateObj);
    }

    const nextMonth = month + 1;
    const daysInNextMonth = getDaysInMonth(nextMonth, currentYear);

    for (let i = 0; i < 6 - lastDayOfWeek; i++) {
      const date = daysInMonth + i + 1;
      const nextMonthDate =
        date <= daysInNextMonth ? date : date - daysInNextMonth;

      const dateObj = {
        className: "date-picker-date empty",
        key: `date-empty-${nextMonth}-${nextMonthDate}`,
        value: null,
      };
      dates.push(dateObj);
    }

    const monthName = format(new Date(currentYear, month - 1), "MMMM");

    // Add the month and its dates to the result
    const monthObj = {
      month: monthName,
      year: currentYear,
      daysInMonth,
      firstDayOfWeek,
      lastDayOfWeek,
      dates,
    };
    months.push(monthObj);
  }

  return months;
};

export const getWeeklyProgressionTracker = (initialDates) => {
  // Define the start and end dates for this week, next week, and the week after
  const currentDate = new Date();
  const thisWeekStartDate = startOfWeek(currentDate);
  const thisWeekEndDate = endOfWeek(currentDate);
  const nextWeekStartDate = addWeeks(thisWeekStartDate, 1);
  const nextWeekEndDate = addWeeks(thisWeekEndDate, 1);
  const weekAfterStartDate = addWeeks(thisWeekStartDate, 2);
  const weekAfterEndDate = addWeeks(thisWeekEndDate, 2);
  const currentMonth = currentDate.getMonth();
  console.log(currentMonth);

  // Filter the initialDates based on the dates falling within each week
  const thisWeekDates = filterDates(
    initialDates,
    thisWeekStartDate,
    thisWeekEndDate
  );
  const nextWeekDates = filterDates(
    initialDates,
    nextWeekStartDate,
    nextWeekEndDate
  );
  const weekAfterDates = filterDates(
    initialDates,
    weekAfterStartDate,
    weekAfterEndDate
  );

  // Calculate the number of allocated tasks for each week
  const thisWeekProgression = countAllocatedTasks(thisWeekDates);
  const nextWeekProgression = countAllocatedTasks(nextWeekDates);
  const weekAfterProgression = countAllocatedTasks(weekAfterDates);

  function filterDates(dates, startDate, endDate) {
    const filteredDates = [];

    const startMonthIndex = startDate.getMonth();
    const endMonthIndex = endDate.getMonth();

    for (let i = startMonthIndex; i <= endMonthIndex; i++) {
      const month = dates[i];
      if (!month) continue;

      for (const date of month.dates) {
        if (!date.formatedDate) continue;
        const currentDate = parse(date.formatedDate, "dd/MM/yyyy", new Date());
        if (currentDate >= startDate && currentDate <= endDate) {
          filteredDates.push(date);
        }
      }
    }

    return filteredDates;
  }

  // Helper function to count the number of allocated tasks for the given dates
  function countAllocatedTasks(dates) {
    let totalDuration = null;
    for (const date of dates) {
      if (date.allocatedTasks && date.allocatedTasks.length > 0) {
        for (const task of date.allocatedTasks) {
          if (task.duration === "none") {
            // return totalDuration;
            totalDuration += 0;
          } else {
            const [hours, minutes] = task.duration.split(":");
            const durationInMinutes = parseInt(hours) * 60 + parseInt(minutes);

            totalDuration += durationInMinutes;
          }
        }
      }
    }

    // Calculate the percentage of allocated task duration compared to a 40-hour workweek
    const percentage = (totalDuration / (40 * 100)) * 100;
    return percentage;
  }

  return {
    thisWeekProgression,
    nextWeekProgression,
    weekAfterProgression,
  };
};

export const allocatedTimeButtons = [
  {
    value: "00:00",
    label: "None",
  },
  {
    value: "00:15",
    label: "15 min",
  },
  {
    value: "00:30",
    label: "30 min",
  },
  {
    value: "01:00",
    label: "1 hour",
  },
  {
    value: "02:00",
    label: "2 hours",
  },
];

export const allocatedWeekButtons = [
  {
    label: "This week",
    value: "currentWeek",
  },
  {
    label: "Next week",
    value: "nextWeek",
  },
  {
    label: "Week after",
    value: "weekAfter",
  },
];
