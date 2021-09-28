import React, {createContext, useContext, useState, useMemo} from 'react';

const EventsContext = createContext();

const EventsProvider = ({children}) => {
  const [events, setEvents] = useState([]);

  const addEvent = ({date, month, year, description = ''}) => {
    setEvents([...events, {date, month, year, description}]);
  };

  const isEvent = ({date, month, year}) => {
    const index = events.findIndex(
      item => item.date === date && item.month === month && item.year === year,
    );

    return index !== -1;
  };

  const value = useMemo(
    () => ({events, addEvent, isEvent}),
    [events, addEvent, isEvent],
  );

  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);
export default EventsProvider;
