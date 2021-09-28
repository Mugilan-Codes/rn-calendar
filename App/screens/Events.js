import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

import {useEvents} from '../contexts/events';

const Item = ({date, month, year, description}) => (
  <View style={styles.item}>
    <Text style={styles.title}>
      {date} / {month} / {year} {description ?? description}
    </Text>
  </View>
);

const EventsScreen = () => {
  const {events} = useEvents();

  const renderItem = ({item, idx}) => (
    <Item
      key={idx}
      date={item.date}
      month={item.month}
      year={item.year}
      description={item.description}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Events</Text>

      <FlatList data={events} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default EventsScreen;
