import React, {useMemo, useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {currency, height, navigator} from '../../../../helpers';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {setDialog, updateAccount} from '../../../../stores/actions';
import {FlashList} from '@shopify/flash-list';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {Transaction, TransactionsDetail, AccountDetail} from './components';
import {getTransactions} from '../../../../stores/selector';

export const DetailAccountScreen = ({route}) => {
  const dispatch = useDispatch();

  const {accounts, tags} = useSelector(({account}) => account);
  const transactions = useSelector(getTransactions);

  const [selectedDate, setSelectedDate] = useState(moment());

  const account = useMemo(() => {
    return accounts.find(acc => acc.id === route.params.id);
  }, [accounts, route.params.id]);

  const tag = useMemo(() => {
    return tags.find(tg => tg.id === route.params.id);
  }, [tags, route.params.id]);

  const filteredTransactions = useMemo(
    () =>
      transactions.filter(transaction => {
        if (account) {
          return (
            moment(transaction.date).format('y/M') ===
              moment(selectedDate).format('y/M') &&
            (transaction.idAccount === account.id ||
              transaction.idAccount2 === account.id)
          );
        } else if (tag) {
          return (
            moment(transaction.date).format('y/M') ===
              moment(selectedDate).format('y/M') && transaction.tag === tag.id
          );
        } else {
          return (
            moment(transaction.date).format('y/M') ===
            moment(selectedDate).format('y/M')
          );
        }
      }),
    [account, selectedDate, tag, transactions],
  );

  const totalInOneMonth = useMemo(() => {
    let totalAmountIncome = filteredTransactions
      .filter(transaction => {
        if (account) {
          return (
            (transaction.type === 'income' &&
              transaction.idAccount === account?.id) ||
            (transaction.type === 'transfer' &&
              transaction.idAccount2 === account?.id)
          );
        } else if (tag) {
          return (
            (transaction.type === 'income' ||
              transaction.type === 'transfer') &&
            transaction.tag === tag.id
          );
        } else {
          return (
            transaction.type === 'income' || transaction.type === 'transfer'
          );
        }
      })
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0,
      );
    let totalAmountExpense = filteredTransactions
      .filter(transaction => {
        if (account) {
          return (
            (transaction.type === 'expense' &&
              transaction.idAccount === account?.id) ||
            (transaction.type === 'transfer' &&
              transaction.idAccount === account?.id)
          );
        } else if (tag) {
          return (
            (transaction.type === 'expense' ||
              transaction.type === 'transfer') &&
            transaction.tag === tag.id
          );
        } else {
          return (
            transaction.type === 'expense' || transaction.type === 'transfer'
          );
        }
      })
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0,
      );
    return totalAmountIncome - totalAmountExpense;
  }, [account, filteredTransactions, tag]);

  const [
    totalIncome,
    totalIncomeTransaction,
    totalExpense,
    totalExpenseTransaction,
    total,
  ] = useMemo(() => {
    let incomeTransaction = transactions.filter(transaction => {
      if (account) {
        return (
          (transaction.type === 'income' &&
            transaction.idAccount === account?.id) ||
          (transaction.type === 'transfer' &&
            transaction.idAccount2 === account?.id)
        );
      } else if (tag) {
        return (
          (transaction.type === 'income' || transaction.type === 'transfer') &&
          transaction.tag === tag.id
        );
      } else {
        return transaction.type === 'income' || transaction.type === 'transfer';
      }
    });
    let amountIncome = incomeTransaction.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0,
    );
    let expenseTransaction = transactions.filter(transaction => {
      if (account) {
        return (
          (transaction.type === 'expense' &&
            transaction.idAccount === account?.id) ||
          (transaction.type === 'transfer' &&
            transaction.idAccount === account?.id)
        );
      } else if (tag) {
        return (
          (transaction.type === 'expense' || transaction.type === 'transfer') &&
          transaction.tag === tag.id
        );
      } else {
        return (
          transaction.type === 'expense' || transaction.type === 'transfer'
        );
      }
    });
    let amountExpense = expenseTransaction.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0,
    );
    return [
      amountIncome,
      incomeTransaction.length,
      amountExpense,
      expenseTransaction.length,
      amountIncome - amountExpense,
    ];
  }, [transactions, account, tag]);

  const theme = useTheme();

  const archiveAccountDialog = () => {
    let desc = account?.archivedAt ? 'unarchive' : 'archive';
    dispatch(
      setDialog({
        title: 'Archive Account',
        description: `Do you want to ${desc} this account ?`,
        actions: [
          {
            title: 'No',
          },
          {
            title: 'Yes',
            onPress: () => {
              dispatch(
                updateAccount(account.id, {
                  ...account,
                  archivedAt: account?.archivedAt ? false : Date.now(),
                  id: account.id,
                  updatedAt: Date.now(),
                }),
              );
            },
          },
        ],
      }),
    );
  };

  const Header = () => (
    <View style={styles.headerContainer}>
      <IconButton
        icon="close"
        mode="outlined"
        size={20}
        onPress={() => navigator.goBack()}
      />
      {account && (
        <View style={styles.headerActionContainer}>
          {!account?.archivedAt && (
            <Pressable
              onPress={() => navigator.navigate('add-account', account)}
              style={[
                styles.headerActionEditContainer,
                {
                  borderColor: theme.colors.outline,
                },
              ]}>
              <Icon
                name="application-edit"
                color={theme.colors.onSurface}
                size={16}
              />
              <Text style={styles.headerActionEditText} variant="labelMedium">
                Edit
              </Text>
            </Pressable>
          )}
          <IconButton
            icon={account?.archivedAt ? 'archive-off' : 'archive'}
            mode="outlined"
            size={20}
            onPress={archiveAccountDialog}
          />
        </View>
      )}

      {tag && (
        <View style={styles.headerActionContainer}>
          <Pressable
            onPress={() => navigator.navigate('add-tag', tag)}
            style={[
              styles.headerActionEditContainer,
              {
                borderColor: theme.colors.outline,
              },
            ]}>
            <Icon
              name="application-edit"
              color={theme.colors.onSurface}
              size={16}
            />
            <Text style={styles.headerActionEditText} variant="labelMedium">
              Edit
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}>
      <Header />
      <FlashList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <AccountDetail total={total} account={account} tag={tag} />
            <TransactionsDetail
              tag={tag}
              account={account}
              totalIncome={totalIncome}
              totalIncomeTransaction={totalIncomeTransaction}
              totalExpense={totalExpense}
              totalExpenseTransaction={totalExpenseTransaction}
            />
            <View style={styles.headerTransaction}>
              <IconButton
                icon="arrow-left-bold-circle"
                size={20}
                onPress={() => {
                  setSelectedDate(moment(selectedDate).subtract(1, 'M'));
                }}
              />
              <IconButton
                icon="arrow-right-bold-circle"
                size={20}
                onPress={() => {
                  setSelectedDate(moment(selectedDate).add(1, 'M'));
                }}
              />
              <Text style={styles.headerMonthTransaction} variant="titleLarge">
                {moment(selectedDate).format('MMM Y')}
              </Text>
              <Text
                variant="labelMedium"
                style={styles.headerTotalMonthTransaction}>
                {currency(totalInOneMonth)}
              </Text>
            </View>
          </>
        }
        data={filteredTransactions}
        keyExtractor={(_, index) => `${index}-transaction`}
        renderItem={({item}) => <Transaction {...item} />}
        ListEmptyComponent={
          <View style={styles.noTransactionContainer}>
            <Text style={styles.titleStyle}>No Transaction</Text>
          </View>
        }
        estimatedItemSize={height / 2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleStyle: {
    fontWeight: '700',
  },
  ///////
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerActionEditContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 16,
    height: 36,
  },
  headerActionEditText: {
    marginLeft: 8,
  },
  /////
  headerTransaction: {
    marginTop: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerMonthTransaction: {
    flex: 1,
  },
  headerTotalMonthTransaction: {
    fontWeight: 'bold',
  },
  noTransactionContainer: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
