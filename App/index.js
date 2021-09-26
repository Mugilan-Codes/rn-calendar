import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';

import CalendarViewScreen from './screens/CalendarView';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CalendarViewScreen />
    </SafeAreaView>
  );
};

export default App;
