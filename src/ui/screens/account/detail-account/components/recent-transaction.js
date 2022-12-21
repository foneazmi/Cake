/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {Text, useTheme, IconButton} from 'react-native-paper';
import {currency, navigator} from '../../../../../helpers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import moment from 'moment';

const ListTag = props => {
  const theme = useTheme();
  return (
    <View style={styles.listTagContainer}>
      {props.data.map((tag, index) => (
        <Pressable
          onPress={() => navigator.navigate('detail-account', {id: tag.id})}
          key={`${index}-tag`}
          style={[
            styles.tagContainer,
            {
              backgroundColor: theme.colors.primary,
            },
          ]}>
          <Icon name={tag.icon} size={16} color={theme.colors.onPrimary} />
          <Text
            variant="labelMedium"
            style={[
              styles.tagTitle,
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
      style={[
        styles.transactionContainer,
        {
          backgroundColor: theme.colors.secondaryContainer,
        },
      ]}>
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
                  name: account2?.name,
                  icon: accountByType[account2?.type],
                  id: account2?.id,
                },
              ]
            : []),
        ]}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 4,
          alignItems: 'center',
        }}>
        <View style={{flex: 1, marginRight: 8}}>
          {props.title && (
            <Text
              numberOfLines={1}
              variant="bodyLarge"
              style={[
                styles.titleStyle,
                {
                  color: theme.colors.onSecondaryContainer,
                },
              ]}>
              {props.title}
            </Text>
          )}
          {props.description && (
            <Text
              numberOfLines={1}
              variant="bodyMedium"
              style={[
                styles.descriptionStyle,
                {
                  color: theme.colors.onSecondaryContainer,
                },
              ]}>
              {props.description}
            </Text>
          )}
          <Text variant="labelSmall">
            {moment(props.date).format('D MMM Y')}
          </Text>
        </View>
        <View style={styles.amountContainer}>
          <Icon
            name={transactionByType[props.type] || ''}
            size={16}
            color={theme.colors.onSecondaryContainer}
          />
          <Text
            variant="titleSmall"
            style={[
              styles.amountStyle,
              {
                color: theme.colors.onSecondaryContainer,
              },
            ]}>
            {currency(props.amount)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
export const RecentTransaction = props => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const {transactions} = useSelector(({account}) => account);

  const filteredTransactions = useMemo(
    () =>
      transactions.filter(transaction => {
        if (props.account) {
          return (
            moment(transaction.date).format('y/M') ===
              moment(selectedDate).format('y/M') &&
            (transaction.idAccount === props.account.id ||
              transaction.idAccount2 === props.account.id)
          );
        } else {
          return (
            moment(transaction.date).format('y/M') ===
            moment(selectedDate).format('y/M')
          );
        }
      }),
    [props.account, selectedDate, transactions],
  );

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <IconButton
          icon="arrow-left-bold-circle"
          size={20}
          onPress={() => {
            setSelectedDate(moment(selectedDate).subtract(1, 'M'));
          }}
        />
        <Text variant="titleLarge">{moment(selectedDate).format('MMM Y')}</Text>
        <IconButton
          icon="arrow-right-bold-circle"
          size={20}
          onPress={() => {
            setSelectedDate(moment(selectedDate).add(1, 'M'));
          }}
        />
      </View>
      {filteredTransactions?.length > 0 ? (
        filteredTransactions.map((transaction, index) => (
          <Transaction {...transaction} key={`${index}-transaction-item`} />
        ))
      ) : (
        <View style={styles.noTransactionContainer}>
          <Text style={styles.titleStyle}>No Transaction</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 16,
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    margin: 4,
  },

  transactionContainer: {
    flex: 1,
    marginVertical: 8,
    // marginTop: 8,
    borderRadius: 10,
    padding: 20,
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
    alignItems: 'center',
    flexDirection: 'row',
  },
  noTransactionContainer: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  ///
  listTagContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  tagContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 50,
    marginRight: 8,
  },
  tagTitle: {
    marginLeft: 4,
    fontWeight: 'bold',
  },
  transactionsGroupContainer: {
    marginTop: 12,
  },
});
