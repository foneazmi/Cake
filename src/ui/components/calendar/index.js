import React, {useMemo} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {useState} from 'react';
import moment from 'moment';
import {Text, useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {getTransactions} from '../../../stores/selector';

export const CalendarWeek = ({nowDate, onDateSelect}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const transactions = useSelector(getTransactions);

  const week = useMemo(
    () =>
      [...Array(7)].map((_, index) => {
        return new Date(
          nowDate.getFullYear(),
          nowDate.getMonth(),
          nowDate.getDate() +
            index +
            1 -
            (nowDate.getDay() === 0 ? 7 : nowDate.getDay()),
        );
      }),
    [nowDate],
  );
  const transactionInWeek = useMemo(() => {
    const formatWeek = week.map(day => moment(day).format('D/M/y'));
    return transactions.filter(transaction =>
      formatWeek.includes(moment(transaction.date).format('D/M/y')),
    );
  }, [transactions, week]);

  return (
    <View style={styles.itemContainer}>
      {week.map(day => {
        const isThereTransaction = transactionInWeek.findIndex(
          transaction =>
            moment(day).format('D') === moment(transaction.date).format('D'),
        );
        return (
          <CalendarWeekItem
            key={day}
            isThereTransaction={isThereTransaction !== -1}
            weekName={moment(day).format('ddd')}
            day={day}
            isSelected={
              moment(day).format('YYYY-MM-DD') ===
              moment(selectedDate).format('YYYY-MM-DD')
                ? true
                : false
            }
            onDateSelect={day => {
              setSelectedDate(new Date(day));
              onDateSelect(day);
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
  day,
  weekName,
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
        onDateSelect(moment(day).utc().format());
      }}>
      <View>
        <Text
          style={[
            styles.weekName,
            isSelected && {
              color: theme.colors.onPrimary,
            },
          ]}>
          {weekName}
        </Text>
        <Text
          style={[
            styles.weekday,
            isSelected && {
              color: theme.colors.onPrimary,
            },
          ]}>
          {moment(day).format('DD')}
        </Text>
      </View>
      {isThereTransaction && (
        <View
          style={[
            {
              height: 6,
              borderRadius: 10,
              marginTop: 4,
              width: 6,
              backgroundColor: theme.colors.primary,
            },
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
});
