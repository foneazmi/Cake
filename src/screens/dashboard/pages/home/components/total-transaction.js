import React, {useMemo} from 'react';

import {View, StyleSheet} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {currency} from '../../../../../helpers';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

export const TotalTransaction = () => {
  const theme = useTheme();
  const {transactions} = useSelector(({account}) => account);
  const [income, expense, total] = useMemo(() => {
    let totalIncome = transactions
      .filter(transaction => transaction.type === 'income')
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0,
      );
    let totalExpense = transactions
      .filter(transaction => transaction.type === 'expense')
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0,
      );
    return [totalIncome, totalExpense, totalIncome - totalExpense];
  }, [transactions]);

  return (
    <View style={styles.container}>
      <View>
        <Text variant="headlineSmall">{currency(total)}</Text>
      </View>
      <View style={styles.contentContainer}>
        <View
          style={[
            styles.incomeContainer,
            {
              backgroundColor: theme.colors.surfaceVariant,
            },
          ]}>
          <View style={styles.titleContainer}>
            <Icon
              name="credit-card-plus-outline"
              size={24}
              color={theme.colors.onBackground}
            />
            <Text variant="titleMedium" style={styles.titleStyle}>
              Income
            </Text>
          </View>
          <Text variant="titleSmall" style={styles.subTitleStyle}>
            {currency(income)}
          </Text>
        </View>
        <View
          style={[
            styles.expenseContainer,
            {
              backgroundColor: theme.colors.surfaceVariant,
            },
          ]}>
          <View style={styles.titleContainer}>
            <Icon
              name="credit-card-minus-outline"
              size={24}
              color={theme.colors.onBackground}
            />
            <Text variant="titleMedium" style={styles.titleStyle}>
              Expense
            </Text>
          </View>
          <Text variant="titleSmall" style={styles.subTitleStyle}>
            {currency(expense)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  contentContainer: {
    marginTop: 16,
    flexDirection: 'row',
  },
  incomeContainer: {
    flex: 1,
    borderRadius: 10,
    padding: 16,
    marginRight: 8,
  },
  expenseContainer: {
    flex: 1,
    borderRadius: 10,
    padding: 16,
    marginLeft: 8,
  },
  titleContainer: {flexDirection: 'row', marginBottom: 4},
  titleStyle: {
    marginLeft: 4,
    fontWeight: 'bold',
  },
  subTitleStyle: {
    fontWeight: '400',
  },
});
