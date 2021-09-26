import {MONTHS} from '../constants';

export const getFirstDayInMonth = (year, month) => {
  return new Date(year, month).getDay();
};

export const getDaysInMonth = (year, month) => {
  let day32Month = new Date(year, month, 32).getDate(); // 32nd day after month started

  return 32 - day32Month;
};

export const getCalendarMonth = (
  year = new Date().getFullYear(),
  month = new Date().getMonth(),
) => {
  let cal = new Date(year, month % 12);
  let fullYear = cal.getFullYear();
  let fullMonth = cal.getMonth();
  console.log(fullYear, MONTHS[fullMonth]);
};
