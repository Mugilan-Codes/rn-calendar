import React from 'react';
import {View, Text, FlatList} from 'react-native';

import {SCREEN_HEIGHT, WINDOW_WIDTH} from '../utils/Dimensions';
import {WEEKDAYS_SHORT, MONTHS} from '../constants';
import {
  getFirstDayInMonth,
  getDaysInMonth,
  getCalendarMonth,
} from '../utils/days';

const CalendarViewScreen = () => {
  let Calendar = new Date();
  let currentYear = Calendar.getFullYear();
  let currentMonth = Calendar.getMonth();
  let today = Calendar.getDate();
  let weekday = Calendar.getDay();

  getCalendarMonth(2020, 3);
  let firstDay = getFirstDayInMonth(currentYear, currentMonth);

  let daysInMonth = getDaysInMonth(currentYear, currentMonth);

  // REF: generate number array - https://stackoverflow.com/a/38213213/12381908
  // let numArray = [...Array(daysInMonth).keys()].map(i => i + 1);
  let numArray = new Array(firstDay).fill(0);
  numArray.push.apply(
    numArray,
    [...Array(daysInMonth).keys()].map(i => i + 1),
  );

  // let displayArray = [...WEEKDAYS_SHORT].concat(numArray);
  // console.log(displayArray);

  return (
    <View>
      <View style={{alignItems: 'center'}}>
        <Text>{'<--'}</Text>

        <Text>{MONTHS[currentMonth]}</Text>

        <Text>{currentYear}</Text>

        <Text>{'-->'}</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        {WEEKDAYS_SHORT.map((day, idx) => (
          <Text key={idx} style={{flex: 1, textAlign: 'center'}}>
            {day}
          </Text>
        ))}
      </View>

      <View>
        <FlatList
          data={numArray}
          numColumns={7}
          extraData={today}
          renderItem={({item, index}) => {
            if (item == today) {
              console.log(`Today is ${today} (${WEEKDAYS_SHORT[weekday]})`);
            }

            return (
              <View
                style={{
                  width: WINDOW_WIDTH / 7,
                  height: SCREEN_HEIGHT / 14,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: item === today && 'red',
                }}
                key={index}>
                <Text style={{textAlign: 'center'}}>{item !== 0 && item}</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default CalendarViewScreen;
