import React, {useMemo} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {currency, navigator} from '../../../../helpers';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  deleteAccount,
  setDialog,
  updateAccount,
} from '../../../../stores/actions';
import {useDispatch, useSelector} from 'react-redux';
import {RecentTransaction} from './components/recent-transaction';

export const DetailAccountScreen = ({route}) => {
  const {accounts, transactions} = useSelector(({account}) => account);
  const dispatch = useDispatch();

  const account = useMemo(() => {
    return accounts.find(acc => acc.id === route.params.id);
  }, [accounts, route.params.id]);

  const [income, incomeTransaction, expense, expenseTransaction, total] =
    useMemo(() => {
      let totalIncome = transactions.filter(transaction => {
        if (account) {
          return (
            (transaction.type === 'income' &&
              transaction.idAccount === account?.id) ||
            (transaction.type === 'transfer' &&
              transaction.idAccount2 === account?.id)
          );
        } else {
          return (
            transaction.type === 'income' || transaction.type === 'transfer'
          );
        }
      });
      let amountIncome = totalIncome.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0,
      );
      let totalExpense = transactions.filter(transaction => {
        if (account) {
          return (
            (transaction.type === 'expense' &&
              transaction.idAccount === account?.id) ||
            (transaction.type === 'transfer' &&
              transaction.idAccount === account?.id)
          );
        } else {
          return (
            transaction.type === 'expense' || transaction.type === 'transfer'
          );
        }
      });
      let amountExpense = totalExpense.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0,
      );

      return [
        amountIncome,
        totalIncome.length,
        amountExpense,
        totalExpense.length,
        amountIncome - amountExpense,
      ];
    }, [transactions, account]);

  const theme = useTheme();

  const accountByType = {
    cash: ['Income', 'Expense', 'wallet'],
    invest: ['Unrealized', 'Realized', 'chart-areaspline-variant'],
    loan: ['Credit', 'Debt', 'credit-card'],
  };

  const deleteAccountDialog = () => {
    dispatch(
      setDialog({
        title: 'Delete Account',
        description: 'Do you want to delete this account ?',
        actions: [
          {
            title: 'No',
          },
          {
            title: 'Yes',
            onPress: () => {
              dispatch(deleteAccount(account.id));
              navigator.goBack();
            },
          },
        ],
      }),
    );
  };

  const archiveAccountDialog = () => {
    let desc = account?.archiveAt ? 'unarchive' : 'archive';
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
                  archiveAt: account?.archiveAt ? false : Date.now(),
                  id: account.id,
                  updateAt: Date.now(),
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
          <IconButton
            icon={account?.archiveAt ? 'archive-off' : 'archive'}
            mode="outlined"
            size={20}
            onPress={archiveAccountDialog}
          />
          {!account?.archiveAt && (
            <>
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

              <IconButton
                icon="trash-can"
                mode="outlined"
                size={20}
                onPress={deleteAccountDialog}
              />
            </>
          )}
        </View>
      )}
    </View>
  );

  const AccountDetail = () => (
    <View style={styles.accountDetailContainer}>
      <View style={styles.accountDetailHeaderContainer}>
        <Icon
          name={account?.type ? accountByType[account.type][2] : 'credit-card'}
          color={theme.colors.onSurface}
          size={24}
        />
        <View style={styles.accountDetailTextContainer}>
          <Text
            style={[
              styles.accountDetailTitle,
              {
                color: theme.colors.onSecondaryContainer,
              },
            ]}
            variant="labelLarge">
            {account ? account?.name || '' : 'All'}
            {account?.archiveAt ? ' [Archived]' : ''}
          </Text>

          <Text
            style={{
              color: theme.colors.onSecondaryContainer,
            }}
            variant="labelSmall">
            {account ? account?.description || '' : 'All Transaction Account'}
          </Text>
        </View>
      </View>
      <Text variant="headlineSmall">{currency(total)}</Text>
    </View>
  );

  const TransactionDetailItem = ({
    title,
    totalIncome,
    totalTransaction,
    type,
  }) => (
    <>
      <Text
        variant="titleMedium"
        style={[
          styles.titleStyle,
          {
            color: theme.colors.onSecondaryContainer,
          },
        ]}>
        {title}
      </Text>
      <Text
        variant="titleSmall"
        style={[
          styles.amountStyle,
          {
            color: theme.colors.onSecondaryContainer,
          },
        ]}>
        {currency(totalIncome, {})}
      </Text>
      <Text
        variant="titleSmall"
        style={[
          styles.subTitleStyle,
          {
            color: theme.colors.onSecondaryContainer,
          },
        ]}>
        Indonesian Rupiah
      </Text>

      <Text
        variant="titleSmall"
        style={[
          styles.amountStyle,
          {
            color: theme.colors.onSecondaryContainer,
          },
        ]}>
        {totalTransaction}
      </Text>
      <Text
        variant="titleSmall"
        style={[
          styles.subTitleStyle,
          {
            color: theme.colors.onSecondaryContainer,
          },
        ]}>
        Transactions
      </Text>
      {account?.archiveAt ? (
        <></>
      ) : (
        <Pressable
          onPress={() =>
            navigator.navigate('add-transaction', {
              type,
              idAccount: account?.id || '',
            })
          }
          style={[
            {
              backgroundColor: theme.colors.primary,
            },
            styles.buttonStyle,
          ]}>
          <Icon
            name={
              type === 'income'
                ? 'credit-card-plus-outline'
                : 'credit-card-minus-outline'
            }
            size={16}
            color={theme.colors.onPrimary}
          />
          <Text
            variant="labelMedium"
            numberOfLines={1}
            style={[
              styles.buttonText,
              {
                color: theme.colors.onPrimary,
              },
            ]}>
            {`Add ${title}`}
          </Text>
        </Pressable>
      )}
    </>
  );

  const TransactionsDetail = () => (
    <View style={styles.contentContainer}>
      <View
        style={[
          styles.incomeContainer,
          {
            backgroundColor: theme.colors.secondaryContainer,
          },
        ]}>
        <TransactionDetailItem
          title={account?.type ? accountByType[account.type][0] : 'Income'}
          totalIncome={income}
          totalTransaction={incomeTransaction}
          type="income"
        />
      </View>
      <View
        style={[
          styles.expenseContainer,
          {
            backgroundColor: theme.colors.secondaryContainer,
          },
        ]}>
        <TransactionDetailItem
          title={account?.type ? accountByType[account.type][1] : 'Income'}
          totalIncome={expense}
          totalTransaction={expenseTransaction}
          type="expense"
        />
      </View>
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
      <ScrollView>
        <AccountDetail />
        <TransactionsDetail />
        <RecentTransaction account={account} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
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
  titleContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  titleStyle: {
    fontWeight: '700',
  },
  amountStyle: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  subTitleStyle: {
    fontWeight: '300',
  },
  buttonStyle: {
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 16,
    padding: 10,
    flexDirection: 'row',
  },
  buttonText: {
    marginLeft: 8,
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
  ////
  accountDetailContainer: {
    paddingHorizontal: 32,
    paddingTop: 16,
  },
  accountDetailHeaderContainer: {
    flexDirection: 'row',
  },
  accountDetailTextContainer: {
    marginLeft: 8,
  },
  accountDetailTitle: {
    fontWeight: 'bold',
  },
});
