import * as React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {useState} from 'react';
import moment from 'moment';
import {Text, useTheme} from 'react-native-paper';

export const CalendarWeek = props => {
  const weekNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  let days = [];
  const [selectedDate, setSelectedDate] = useState(new Date());
  let num = props.nowDate.getDay();
  if (num === 0) {
    num = 7;
  }

  for (let i = 0; i < 7; i++) {
    let date = new Date(
      props.nowDate.getFullYear(),
      props.nowDate.getMonth(),
      props.nowDate.getDate() + i + (1 - num),
    );
    days.push(date);
  }

  return (
    <View>
      <View accessibilityLabel="CalendarWeek" style={styles.itemContainer}>
        {weekNames.map((item, index) => {
          let eventTypes = [];
          props.weekTypes?.map(weekItem => {
            if (moment(days[index]).format('YYYY-MM-DD') === weekItem.date) {
              eventTypes = weekItem.types;
            }
          });

          return (
            <CalendarWeekItem
              key={item}
              weekName={item}
              day={days[index]}
              isSelected={
                moment(days[index]).format('YYYY-MM-DD') ===
                moment(selectedDate).format('YYYY-MM-DD')
                  ? true
                  : false
              }
              eventTypes={eventTypes}
              onDateSelect={day => {
                setSelectedDate(new Date(day));
                props.onDateSelect(day);
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export const CalendarWeekItem = props => {
  const theme = useTheme();

  return (
    <Pressable
      accessible={false}
      style={[
        styles.container,
        props.isSelected && {
          backgroundColor: theme.colors.primary,
        },
      ]}
      onPress={() => {
        props.onDateSelect(moment(props.day).utc().format());
      }}>
      <View>
        <Text
          style={[
            styles.weekName,
            props.isSelected && {
              color: theme.colors.onPrimary,
            },
          ]}>
          {props.weekName}
        </Text>
        <Text
          style={[
            styles.weekday,
            props.isSelected && {
              color: theme.colors.onPrimary,
            },
          ]}>
          {moment(props.day).format('DD')}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    width: 4,
    height: 4,
    margin: 2,
    borderRadius: 2,
  },
  container: {
    flex: 1,
    backgroundColor: '#00000000',
    alignItems: 'center',
    borderRadius: 8,
    padding: 6,
  },
  weekName: {
    color: 'grey',
    fontSize: 12,
    textAlign: 'center',
  },
  weekday: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 2,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },
});
