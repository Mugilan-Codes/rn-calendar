import React from 'react';
import {SafeAreaView} from 'react-native';

import CalendarViewScreen from './screens/CalendarView';
import EventsScreen from './screens/Events';
import CalanderProvider from './contexts/calendar';
import EventsProvider from './contexts/events';

const App = () => {
  return (
    <CalanderProvider>
      <EventsProvider>
        <SafeAreaView style={{flex: 1}}>
          <CalendarViewScreen />

          <EventsScreen />
        </SafeAreaView>
      </EventsProvider>
    </CalanderProvider>
  );
};

export default App;
