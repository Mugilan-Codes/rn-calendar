import React from 'react';
import {
  Alert,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {SCREEN_HEIGHT, WINDOW_WIDTH} from '../utils/Dimensions';
import {WEEKDAYS_SHORT, MONTHS} from '../constants';
import {generateDatesArray} from '../utils/days';
import {useEvents} from '../contexts/events';
import {useCalendar} from '../contexts/calendar';

const CalendarViewScreen = () => {
  const {addEvent, isEvent} = useEvents();
  const {
    currentYear,
    currentMonth,
    today,
    calendarYear,
    setCalendarYear,
    calendarMonth,
    setCalendarMonth,
  } = useCalendar();

  const numArray = generateDatesArray(calendarYear, calendarMonth);

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

  const handleOnPress = ({date, month, year}) => {
    console.log({today, currentMonth, currentYear});
    const DateCheck = new Date(year, month, date);

    if (DateCheck < Date.now()) {
      return;
    }

    return Alert.alert(
      `Are you sure?`,
      `Add Event on ${date}/${month + 1}/${year}`,
      [
        {
          text: 'Yes',
          onPress: () => {
            addEvent({date, month, year});
          },
        },
        {
          text: 'No',
        },
      ],
    );
  };

  const renderItem = ({item, index}) => {
    if (item === 0) {
      return <View style={styles.dateItemView}></View>;
    }

    const isToday =
      item === today &&
      calendarMonth === currentMonth &&
      calendarYear === currentYear;

    const isEventDay = isEvent({
      date: item,
      month: calendarMonth,
      year: calendarYear,
    });

    return (
      <TouchableOpacity
        style={[
          styles.dateItemView,
          isToday && {backgroundColor: 'red'},
          isEventDay && {backgroundColor: 'green'},
          isToday && isEventDay && {backgroundColor: 'blue'},
        ]}
        key={index}
        onPress={() =>
          handleOnPress({date: item, month: calendarMonth, year: calendarYear})
        }>
        <Text style={styles.dateItemText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.monthHeadingView}>
        <TouchableOpacity
          onPress={previousMonth}
          style={{marginLeft: 10, backgroundColor: 'red', padding: 15}}>
          <Text>{`<--`}</Text>
        </TouchableOpacity>

        <View style={{alignItems: 'center'}}>
          <Text style={{textTransform: 'uppercase', fontSize: 20}}>
            {MONTHS[calendarMonth]}
          </Text>

          <Text style={{fontSize: 20}}>{calendarYear}</Text>
        </View>

        <TouchableOpacity
          onPress={nextMonth}
          style={{marginRight: 10, backgroundColor: 'red', padding: 15}}>
          <Text>{`-->`}</Text>
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
    paddingVertical: 10,
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
