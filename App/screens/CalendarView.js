import React from 'react';
import {View, Text, FlatList, Dimensions} from 'react-native';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getFirstDayInMonth = (year, month) => {
  return new Date(year, month).getDay();
};

const getDaysInMonth = (year, month) => {
  let day32Month = new Date(year, month, 32).getDate(); // 32nd day after month started

  return 32 - day32Month;
};

const CalendarViewScreen = () => {
  let Calendar = new Date();
  let currentYear = Calendar.getFullYear();
  let currentMonth = Calendar.getMonth();
  let today = Calendar.getDate();
  let weekday = Calendar.getDay();

  let firstDay = getFirstDayInMonth(currentYear, currentMonth);
  console.log(firstDay);

  let daysInMonth = getDaysInMonth(currentYear, currentMonth);

  // REF: generate number array - https://stackoverflow.com/a/38213213/12381908
  let numArray = [...Array(daysInMonth).keys()].map(i => i + 1);
  let numArray2 = [...Array(daysInMonth + firstDay).keys()].map(i => i + 1);
  console.log(numArray2);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <Text style={{flex: 1, textAlign: 'center'}}>Sun</Text>
        <Text style={{flex: 1, textAlign: 'center'}}>Mon</Text>
        <Text style={{flex: 1, textAlign: 'center'}}>Tue</Text>
        <Text style={{flex: 1, textAlign: 'center'}}>Wed</Text>
        <Text style={{flex: 1, textAlign: 'center'}}>Thu</Text>
        <Text style={{flex: 1, textAlign: 'center'}}>Fri</Text>
        <Text style={{flex: 1, textAlign: 'center'}}>Sat</Text>
      </View>

      <View>
        <FlatList
          data={numArray}
          numColumns={7}
          renderItem={({item, index}) => {
            if (index === 0) {
              console.log(DAYS[firstDay]);
            }

            return (
              <View
                style={{
                  width: Dimensions.get('window').width / 7,
                }}
                key={index}>
                <Text style={{textAlign: 'center'}}>{item}</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default CalendarViewScreen;
