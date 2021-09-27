import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

import {SCREEN_HEIGHT, WINDOW_WIDTH} from '../utils/Dimensions';
import {WEEKDAYS_SHORT, MONTHS} from '../constants';
import {getCalendarMonth, generateDatesArray} from '../utils/days';

// TODO: Maintain today's date
// TODO: add events
const CalendarViewScreen = () => {
  const [current, setCurrent] = useState({
    month: null,
    year: null,
    today: null,
    weekday: null,
  });
  const [calendarYear, setCalendarYear] = useState();
  const [calendarMonth, setCalendarMonth] = useState();

  let todayCalendar = new Date();
  const currentYear = todayCalendar.getFullYear();
  const currentMonth = todayCalendar.getMonth();
  const today = todayCalendar.getDate();
  const weekday = todayCalendar.getDay();

  useEffect(() => {
    let Cal = new Date();
    const {fullMonth, fullYear} = getCalendarMonth();

    setCalendarMonth(fullMonth);
    setCalendarYear(fullYear);

    setCurrent({
      month: fullMonth,
      year: fullYear,
      today: Cal.getDate(),
      weekday: Cal.getDay(),
    });
  }, []);

  // let displayArray = [...WEEKDAYS_SHORT].concat(numArray);
  // console.log(displayArray);

  let numArray = generateDatesArray(current.year, current.month);
  console.log(current.today);

  const nextMonth = () => {
    let nextYearTemp = current.year;
    nextYearTemp = current.month === 11 ? nextYearTemp + 1 : nextYearTemp;

    let nextMonthTemp = (current.month + 1) % 12;

    setCurrent({year: nextYearTemp, month: nextMonthTemp});
    setCalendarMonth(nextMonthTemp);
    setCalendarYear(nextYearTemp);
  };
  const previousMonth = () => {
    let previousYearTemp =
      current.month === 0 ? current.year - 1 : current.year;

    let previousMonthTemp = current.month === 0 ? 11 : current.month - 1;

    setCurrent({year: previousYearTemp, month: previousMonthTemp});
    setCalendarMonth(previousMonthTemp);
    setCalendarYear(previousYearTemp);
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={[
          styles.dateItemView,
          {backgroundColor: item === current.today && 'red'},
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
          <Text>{MONTHS[current.month]}</Text>

          <Text>{current.year}</Text>
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
          extraData={current.today}
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
