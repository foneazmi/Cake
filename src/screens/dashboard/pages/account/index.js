import React, {useState, useMemo} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Pressable,
} from 'react-native';
import {useSelector} from 'react-redux';
import {currency, navigator} from '../../../../helpers';
import {useTheme, FAB, Text, SegmentedButtons} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const AccountPage = () => {
  const {accounts, transactions} = useSelector(({account}) => account);
  const [type, setType] = useState('all');
  const [scrollY, setScrollY] = useState(0);
  const [showFab, setShowFab] = useState(true);

  const total = useMemo(() => {
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
    return totalIncome - totalExpense;
  }, [transactions]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.headerText}>
          Accounts
        </Text>
        <Text variant="titleSmall">{`Total : ${currency(total)}`}</Text>
      </View>
      <FlatList
        ListHeaderComponent={
          <SegmentedButtons
            value={type}
            onValueChange={setType}
            buttons={[
              {
                value: 'all',
                label: 'All',
              },
              {
                value: 'cash',
                label: 'Cash',
              },
              {
                value: 'invest',
                label: 'Invest',
              },
              {
                value: 'loan',
                label: 'Loan',
              },
            ]}
            style={styles.headerSegmentContainer}
          />
        }
        scrollEventThrottle={300}
        onScroll={({nativeEvent}) => {
          setScrollY(nativeEvent.contentOffset.y);
          if (nativeEvent.contentOffset.y <= 0) {
            setShowFab(true);
          } else {
            setShowFab(scrollY > nativeEvent.contentOffset.y);
          }
        }}
        data={
          type === 'all'
            ? accounts
            : accounts.filter(account => account.type === type)
        }
        keyExtractor={(_, index) => `account-${index}`}
        renderItem={({item}) => <Account {...item} />}
      />
      {/* {accounts.length < 6 && ( */}
      <FAB
        variant="secondary"
        icon="plus"
        visible={showFab}
        animated
        style={styles.fab}
        onPress={() => navigator.navigate('add-account')}
      />
      {/* )} */}
    </SafeAreaView>
  );
};

const Account = props => {
  const {transactions} = useSelector(({account}) => account);

  const [
    income,
    // incomeTransaction,
    expense,
    // expenseTransaction,
    total,
  ] = useMemo(() => {
    let totalIncome = transactions.filter(transaction => {
      return (
        (transaction.type === 'income' &&
          transaction.idAccount === props?.id) ||
        (transaction.type === 'transfer' &&
          transaction.idAccount2 === props?.id)
      );
    });
    let amountIncome = totalIncome.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0,
    );
    let totalExpense = transactions.filter(transaction => {
      return (
        (transaction.type === 'expense' &&
          transaction.idAccount === props?.id) ||
        (transaction.type === 'transfer' && transaction.idAccount === props?.id)
      );
    });
    let amountExpense = totalExpense.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0,
    );

    return [
      amountIncome,
      // totalIncome.length,
      amountExpense,
      // totalExpense.length,
      amountIncome - amountExpense,
    ];
  }, [transactions, props.id]);

  const accountByType = {
    cash: ['Income', 'Expense', 'wallet'],
    invest: ['Unrealized', 'Realized', 'chart-areaspline-variant'],
    loan: ['Credit', 'Debt', 'credit-card'],
  };
  const theme = useTheme();
  return (
    <Pressable onPress={() => navigator.navigate('detail-account', props)}>
      <View
        style={[
          styles.accountContainer,
          {
            backgroundColor: theme.colors.secondaryContainer,
          },
        ]}>
        <View style={styles.accountHeaderContainer}>
          <Icon
            name={props.type ? accountByType[props.type][2] : ''}
            size={24}
            color={theme.colors.onSecondaryContainer}
          />
          <View style={styles.accountTextHeaderContainer}>
            <Text
              style={[
                styles.accountTitleHeader,
                {
                  color: theme.colors.onSecondaryContainer,
                },
              ]}
              variant="titleMedium">
              {props.name}
            </Text>
            <Text
              style={[
                {
                  color: theme.colors.onSecondaryContainer,
                },
              ]}
              variant="labelSmall">
              {props.description}
            </Text>
          </View>
        </View>
        <Text
          variant="headlineSmall"
          style={[
            styles.accountAmount,
            {
              color: theme.colors.onSecondaryContainer,
            },
          ]}>
          {currency(total)}
        </Text>
        <View style={styles.accountInnerContainer}>
          <View
            style={[
              styles.accountIncomeContainer,
              {
                backgroundColor: theme.colors.surface,
              },
            ]}>
            <Text
              variant="labelMedium"
              style={[
                styles.accountInnerTitle,
                {
                  color: theme.colors.onSurface,
                },
              ]}>
              {`Total ${props.type ? accountByType[props.type][0] : ''}`}
            </Text>
            <Text
              variant="labelSmall"
              style={[
                styles.accountInnerSubTitle,
                {
                  color: theme.colors.onSurface,
                },
              ]}>
              {currency(income)}
            </Text>
          </View>
          <View
            style={[
              styles.accountExpenseContainer,
              {
                backgroundColor: theme.colors.surface,
              },
            ]}>
            <Text
              variant="labelMedium"
              style={[
                styles.accountInnerTitle,
                {
                  color: theme.colors.onSurface,
                },
              ]}>
              {`Total ${props.type ? accountByType[props.type][1] : ''}`}
            </Text>
            <Text
              variant="labelSmall"
              style={[
                styles.accountInnerSubTitle,
                {
                  color: theme.colors.onSurface,
                },
              ]}>
              {currency(expense)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  headerText: {
    fontWeight: 'bold',
  },
  headerSegmentContainer: {
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  accountTextHeaderContainer: {
    marginLeft: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  //////
  accountContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 10,
  },
  accountHeaderContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  accountTitleHeader: {
    fontWeight: 'bold',
  },
  accountAmount: {
    marginVertical: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  accountInnerContainer: {
    flexDirection: 'row',
  },
  accountIncomeContainer: {
    flex: 1,
    borderRadius: 10,
    padding: 4,
    marginRight: 4,
  },
  accountInnerTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  accountInnerSubTitle: {
    textAlign: 'center',
    fontWeight: '400',
  },
  accountExpenseContainer: {
    flex: 1,
    borderRadius: 10,
    padding: 4,
    marginLeft: 4,
  },
});
