import React from 'react';
import {SafeAreaView} from 'react-native';

import CalendarViewScreen from './screens/CalendarView';
import EventsScreen from './screens/Events';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CalendarViewScreen />
      <EventsScreen />
    </SafeAreaView>
  );
};

export default App;
