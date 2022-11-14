import React, {useMemo, useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {currency, navigator} from '../../../../../helpers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {CalendarWeek} from '../../../../../components/calendar';
import moment from 'moment';

const ListTag = props => {
  const theme = useTheme();
  return (
    <View style={{flexDirection: 'row', marginBottom: 4}}>
      {props.data.map((tag, index) => (
        <View
          key={`${index}-tag`}
          style={{
            flexDirection: 'row',
            paddingVertical: 8,
            alignItems: 'center',
            paddingHorizontal: 16,
            borderRadius: 50,
            marginRight: 4,
            backgroundColor: theme.colors.primary,
          }}>
          <Icon name={tag.icon} size={16} color={theme.colors.onPrimary} />
          <Text
            variant="labelMedium"
            style={{
              marginLeft: 4,
              fontWeight: 'bold',
              color: theme.colors.onPrimary,
            }}>
            {tag.name}
          </Text>
        </View>
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

  const transactionByType = {
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
          },
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
          moment(transaction.id).format('D/M/Y') ===
          moment(selectedDate).format('D/M/Y'),
      ),
    [transactions, selectedDate],
  );
  return (
    <View style={styles.container}>
      <View
        style={{
          marginBottom: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
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
        <View style={{paddingHorizontal: 16}}>
          <CalendarWeek
            nowDate={nowDate}
            weekTypes={[]}
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
});
