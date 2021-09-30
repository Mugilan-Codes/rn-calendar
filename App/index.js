import React, {useState} from 'react';
import {SafeAreaView, TouchableOpacity, Text} from 'react-native';

import CalendarViewScreen from './screens/CalendarView';
import EventsScreen from './screens/Events';
import CalanderProvider from './contexts/calendar';
import EventsProvider from './contexts/events';
import WebViewScreen from './screens/WebView';

const App = () => {
  const [webview, setWebview] = useState(false);

  return (
    <CalanderProvider>
      <EventsProvider>
        <SafeAreaView style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => setWebview(!webview)}
            style={{alignItems: 'flex-end', padding: 10}}>
            <Text style={{textTransform: 'uppercase', fontSize: 20}}>
              {webview ? 'Close' : 'Open'}
            </Text>
          </TouchableOpacity>

          {webview ? (
            <WebViewScreen />
          ) : (
            <>
              <CalendarViewScreen />

              <EventsScreen />
            </>
          )}
        </SafeAreaView>
      </EventsProvider>
    </CalanderProvider>
  );
};

export default App;
