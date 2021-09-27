import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

import {SCREEN_HEIGHT, WINDOW_WIDTH} from '../utils/Dimensions';
import {WEEKDAYS_SHORT, MONTHS} from '../constants';
import {getCalendarMonth, generateDatesArray} from '../utils/days';

// TODO: add events - store year, month, date
const CalendarViewScreen = () => {
  const [calendarYear, setCalendarYear] = useState();
  const [calendarMonth, setCalendarMonth] = useState();

  let todayCalendar = new Date();
  const currentYear = todayCalendar.getFullYear();
  const currentMonth = todayCalendar.getMonth();
  const today = todayCalendar.getDate();
  const weekday = todayCalendar.getDay();

  useEffect(() => {
    const {fullMonth, fullYear} = getCalendarMonth();

    setCalendarMonth(fullMonth);
    setCalendarYear(fullYear);
  }, []);

  let numArray = generateDatesArray(calendarYear, calendarMonth);

  const nextMonth = () => {
    let nextYearTemp = calendarYear;
    nextYearTemp = calendarMonth === 11 ? nextYearTemp + 1 : nextYearTemp;

    let nextMonthTemp = (calendarMonth + 1) % 12;
    setCalendarMonth(nextMonthTemp);
    setCalendarYear(nextYearTemp);
  };
  const previousMonth = () => {
    let previousYearTemp =
      calendarMonth === 0 ? calendarYear - 1 : calendarYear;

    let previousMonthTemp = calendarMonth === 0 ? 11 : calendarMonth - 1;

    setCalendarMonth(previousMonthTemp);
    setCalendarYear(previousYearTemp);
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={[
          styles.dateItemView,
          {
            backgroundColor:
              item === today &&
              calendarMonth === currentMonth &&
              calendarYear === currentYear &&
              'red',
          },
        ]}
        key={index}>
        <Text style={styles.dateItemText}>{item !== 0 && item}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.monthHeadingView}>
        <TouchableOpacity onPress={previousMonth}>
          <Text>Prev</Text>
        </TouchableOpacity>

        <View style={{alignItems: 'center'}}>
          <Text>{MONTHS[calendarMonth]}</Text>

          <Text>{calendarYear}</Text>
        </View>

        <TouchableOpacity onPress={nextMonth}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dayHeadingView}>
        {WEEKDAYS_SHORT.map((day, idx) => (
          <Text key={idx} style={styles.dayHeadingText}>
            {day}
          </Text>
        ))}
      </View>

      <View>
        <FlatList
          data={numArray}
          numColumns={7}
          extraData={today}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  monthHeadingView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayHeadingView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dayHeadingText: {
    flex: 1,
    textAlign: 'center',
  },
  dateItemView: {
    width: WINDOW_WIDTH / 7,
    height: SCREEN_HEIGHT / 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateItemText: {
    textAlign: 'center',
  },
});

export default CalendarViewScreen;
