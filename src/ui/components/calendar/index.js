import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {useState} from 'react';
import moment from 'moment';
import {Text, useTheme} from 'react-native-paper';

export const CalendarWeek = ({onDateSelect, markerInWeek}) => {
  const [selectedDate, setSelectedDate] = useState(moment().format('ddd'));
  return (
    <View style={styles.itemContainer}>
      {markerInWeek.map(day => {
        return (
          <CalendarWeekItem
            key={day.dayName}
            isThereTransaction={day.isThereTransaction}
            dayName={day.dayName}
            dayDate={day.dayDate}
            date={day.date}
            isSelected={day.dayName === selectedDate ? true : false}
            onDateSelect={date => {
              setSelectedDate(day.dayName);
              onDateSelect(date);
            }}
          />
        );
      })}
    </View>
  );
};

export const CalendarWeekItem = ({
  isSelected,
  onDateSelect,
  date,
  dayDate,
  dayName,
  isThereTransaction,
}) => {
  const theme = useTheme();

  return (
    <Pressable
      accessible={false}
      style={[
        styles.container,
        isSelected && {
          backgroundColor: theme.colors.primary,
        },
      ]}
      onPress={() => {
        onDateSelect(date);
      }}>
      <View>
        <Text
          style={[
            styles.weekName,
            isSelected && {
              color: theme.colors.onPrimary,
            },
          ]}>
          {dayName}
        </Text>
        <Text
          style={[
            styles.weekday,
            isSelected && {
              color: theme.colors.onPrimary,
            },
          ]}>
          {dayDate}
        </Text>
      </View>
      {isThereTransaction && (
        <View
          style={[
            {
              backgroundColor: theme.colors.primary,
            },
            styles.isThereTransaction,
            isSelected && {
              backgroundColor: theme.colors.onPrimary,
            },
          ]}
        />
      )}
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
    // alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },
  isThereTransaction: {
    height: 6,
    borderRadius: 10,
    marginTop: 4,
    width: 6,
  },
});
