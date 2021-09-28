const getFirstDayInMonth = (year, month) => {
  return new Date(year, month).getDay();
};

const getDaysInMonth = (year, month) => {
  let day32Month = new Date(year, month, 32).getDate(); // 32nd day after month started

  return 32 - day32Month;
};

export const getCalendarMonth = (year, month) => {
  const Calendar = new Date(year, month % 12);

  const fullYear = Calendar.getFullYear();
  const fullMonth = Calendar.getMonth();

  return {fullYear, fullMonth};
};

export const generateDatesArray = (year, month) => {
  const firstDay = getFirstDayInMonth(year, month);

  const daysInMonth = getDaysInMonth(year, month);

  // REF: generate number array - https://stackoverflow.com/a/38213213/12381908
  // let numArray = [...Array(daysInMonth).keys()].map(i => i + 1);
  let numArray = new Array(firstDay).fill(0);
  numArray.push.apply(
    numArray,
    [...Array(daysInMonth).keys()].map(i => i + 1),
  );

  return numArray;
};
