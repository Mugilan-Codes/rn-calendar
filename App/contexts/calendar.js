import React, {createContext, useContext, useState, useMemo} from 'react';

const CalendarContext = createContext();

const CalanderProvider = ({children}) => {
  const todayCalendar = new Date();
  const currentYear = todayCalendar.getFullYear();
  const currentMonth = todayCalendar.getMonth();

  const [calendarYear, setCalendarYear] = useState(currentYear);
  const [calendarMonth, setCalendarMonth] = useState(currentMonth);

  const today = todayCalendar.getDate();
  const weekday = todayCalendar.getDay();

  const value = useMemo(
    () => ({
      currentYear,
      currentMonth,
      calendarYear,
      setCalendarYear,
      calendarMonth,
      setCalendarMonth,
      today,
      weekday,
    }),
    [
      currentYear,
      currentMonth,
      calendarYear,
      setCalendarYear,
      calendarMonth,
      setCalendarMonth,
      today,
      weekday,
    ],
  );

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => useContext(CalendarContext);
export default CalanderProvider;
