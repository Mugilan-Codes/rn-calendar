import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

import {useEvents} from '../contexts/events';
import EventItem from '../components/EventItem';
import {useCalendar} from '../contexts/calendar';

const EventsScreen = () => {
  const {events} = useEvents();
  const {calendarYear, calendarMonth} = useCalendar();

  const DATA = [...events];
  DATA.sort(function (a, b) {
    return a.year - b.year || a.month - b.month || a.date - b.date;
  });

  const renderItem = ({item, idx}) => {
    if (item.month !== calendarMonth || item.year !== calendarYear) {
      return;
    }

    return (
      <EventItem
        key={idx}
        date={item.date}
        month={item.month}
        year={item.year}
        description={item.description}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Events</Text>

      <FlatList data={DATA} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  heading: {
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
});

export default EventsScreen;
