import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {MONTHS} from '../constants';

const EventItem = ({date, month, year, description}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>
        Event on {MONTHS[month]} {date}, {year} {description ?? description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    // fontSize: 32,
  },
});

export default EventItem;
