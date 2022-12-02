import React, {useMemo, useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {currency, navigator} from 'cake/src/helpers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {CalendarWeek} from 'cake/src/ui/components/calendar';
import moment from 'moment';

const ListTag = props => {
  const theme = useTheme();
  return (
    <View style={styles.tagContainer}>
      {props.data.map((tag, index) => (
        <Pressable
          onPress={() => navigator.navigate('detail-account', {id: tag.id})}
          key={`${index}-tag`}
          style={[
            styles.itemTagContainer,
            {
              backgroundColor: theme.colors.primary,
            },
          ]}>
          <Icon name={tag.icon} size={16} color={theme.colors.onPrimary} />
          <Text
            variant="labelMedium"
            style={[
              styles.tagName,
              {
                color: theme.colors.onPrimary,
              },
            ]}>
            {tag.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};
const Transaction = props => {
  const theme = useTheme();
  const {accounts} = useSelector(({account}) => account);

  const account = useMemo(
    () => accounts.find(acc => acc.id === props.idAccount),
    [accounts, props.idAccount],
  );
  const account2 = useMemo(
    () => accounts.find(acc => acc.id === props.idAccount2),
    [accounts, props.idAccount2],
  );

  const transactionByType = {
    transfer: 'credit-card-sync-outline',
    income: 'credit-card-plus-outline',
    expense: 'credit-card-minus-outline',
  };

  const accountByType = {
    cash: 'wallet',
    invest: 'chart-areaspline-variant',
    loan: 'credit-card',
  };

  return (
    <Pressable
      onPress={() => navigator.navigate('add-transaction', props)}
      style={[styles.transactionContainer]}>
      <ListTag
        data={[
          {
            name: account?.name || '',
            icon: accountByType[account?.type] || '',
            id: account?.id || '',
          },
          ...(account2
            ? [
                {
                  name: account2?.name || '',
                  icon: accountByType[account2?.type] || '',
                  id: account2?.id || '',
                },
              ]
            : []),
        ]}
      />
      {props.title && (
        <Text
          variant="bodyLarge"
          style={[
            styles.titleStyle,
            {
              color: theme.colors.onSurface,
            },
          ]}>
          {props.title}
        </Text>
      )}
      {props.description && (
        <Text
          variant="bodySmall"
          style={[
            styles.descriptionStyle,
            {
              color: theme.colors.onSurface,
            },
          ]}>
          {props.description}
        </Text>
      )}

      <View style={styles.amountContainer}>
        <Icon
          name={transactionByType[props.type] || ''}
          size={20}
          color={theme.colors.onSurfaceVariant}
        />
        <Text
          variant="titleMedium"
          style={[
            styles.amountStyle,
            {
              color: theme.colors.onSurface,
            },
          ]}>
          {currency(props.amount)}
        </Text>
      </View>
    </Pressable>
  );
};

export const RecentTransaction = () => {
  const theme = useTheme();
  const {transactions} = useSelector(({account}) => account);
  const nowDate = new Date();
  const [selectedDate, setSelectedDate] = useState(nowDate);
  const filteredTransactions = useMemo(
    () =>
      transactions.filter(
        transaction =>
          moment(transaction.date).format('D/M/Y') ===
          moment(selectedDate).format('D/M/Y'),
      ),
    [transactions, selectedDate],
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleMedium">Recent Transaction</Text>
        <Pressable
          onPress={() => {
            navigator.navigate('detail-account', {});
          }}>
          <Text variant="titleMedium">Show All</Text>
        </Pressable>
      </View>
      <View
        style={[
          styles.calendarContainer,
          {
            backgroundColor: theme.colors.secondaryContainer,
          },
        ]}>
        <View style={styles.calendarWeekContainer}>
          <CalendarWeek
            nowDate={nowDate}
            onDateSelect={day => {
              setSelectedDate(day);
            }}
          />
        </View>
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction, index) => (
            <Transaction {...transaction} key={`${index}-transaction-item`} />
          ))
        ) : (
          <View style={styles.noTransactionContainer}>
            <Text style={styles.titleStyle}>No Transaction</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    flex: 1,
  },
  header: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calendarWeekContainer: {
    paddingHorizontal: 16,
  },
  calendarContainer: {
    borderRadius: 10,
    paddingVertical: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    margin: 4,
  },

  transactionContainer: {
    flex: 1,
    marginTop: 24,
    paddingHorizontal: 16,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  titleStyle: {
    fontWeight: 'bold',
  },
  descriptionStyle: {
    marginVertical: 2,
  },
  amountStyle: {
    fontWeight: '400',
    marginLeft: 8,
  },
  amountContainer: {
    marginTop: 4,
    alignItems: 'center',
    flexDirection: 'row',
  },
  noTransactionContainer: {
    marginTop: 16,
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  ///
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  itemTagContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 50,
    marginRight: 4,
  },
  tagName: {
    marginLeft: 4,
    fontWeight: 'bold',
  },
});
