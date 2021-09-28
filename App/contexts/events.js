import React, {createContext, useContext, useState, useMemo} from 'react';

const EventsContext = createContext();

const EventsProvider = ({children}) => {
  const [events, setEvents] = useState([
    {date: 27, year: 2021, month: 3, description: 'Test'},
    {date: 15, year: 2016, month: 5},
    {date: 29, year: 2020, month: 2},
    {date: 3, year: 2021, month: 8},
    {date: 19, year: 2018, month: 4},
  ]);

  const addEvent = (day, month, year, description) => {
    setEvents([...events, {day, month, year, description}]);
  };

  const value = useMemo(
    () => ({events, setEvents, addEvent}),
    [events, setEvents, addEvent],
  );

  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);
export default EventsProvider;
