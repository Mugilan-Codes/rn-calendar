import React from 'react';
import {SafeAreaView} from 'react-native';

import CalendarViewScreen from './screens/CalendarView';
import EventsScreen from './screens/Events';
import EventsProvider from './contexts/events';

const App = () => {
  return (
    <EventsProvider>
      <SafeAreaView style={{flex: 1}}>
        <CalendarViewScreen />
        <EventsScreen />
      </SafeAreaView>
    </EventsProvider>
  );
};

export default App;
