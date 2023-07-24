import { isSameDay, format } from "date-fns";

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

export const allocatedTimeButtons = [
  {
    value: "00:00",
    label: "None",
  },
  {
    value: "15:00",
    label: "15 min",
  },
  {
    value: "30:00",
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
