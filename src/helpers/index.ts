export const getFirstDayOfWeek = (year: number, month: number) => {
  return new Date(year, month - 1, 1).getDay();
};

export const getLastDayOfWeek = (
  year: number,
  month: number,
  daysInMonth: number
) => {
  const lastDay = new Date(year, month - 1, daysInMonth);
  return lastDay.getDay();
};

export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};
