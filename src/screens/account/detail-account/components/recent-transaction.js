import React, {useMemo} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {currency, navigator} from '../../../../helpers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

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
          },
        ]}
      />
      {props.title && (
        <Text
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
          variant="bodySmall"
          style={[
            styles.descriptionStyle,
            {
              color: theme.colors.onSecondaryContainer,
            },
          ]}>
          {props.description}
        </Text>
      )}

      <View style={styles.amountContainer}>
        <Icon
          name={transactionByType[props.type] || ''}
          size={20}
          color={theme.colors.onSecondaryContainer}
        />
        <Text
          variant="titleMedium"
          style={[
            styles.amountStyle,
            {
              color: theme.colors.onSecondaryContainer,
            },
          ]}>
          {currency(props.amount)}
        </Text>
      </View>
    </Pressable>
  );
};

export const RecentTransaction = props => {
  const {transactions} = useSelector(({account}) => account);
  const filteredTransactions = useMemo(
    () =>
      props.account
        ? transactions.filter(
            transaction => transaction.idAccount === props.account.id,
          )
        : transactions,
    [transactions, props.account],
  );
  return (
    <View style={styles.container}>
      <Text variant="titleMedium">Recent Transaction</Text>

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
    marginTop: 4,
    alignItems: 'center',
    flexDirection: 'row',
  },
  noTransactionContainer: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});