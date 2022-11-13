import React, {useMemo} from 'react';
import {Pressable, SafeAreaView, StyleSheet, View} from 'react-native';
import {Appbar, IconButton, Text} from 'react-native-paper';
import {currency, navigator} from '../../../helpers';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {deleteAccount} from '../../../stores/actions';
import {useDispatch, useSelector} from 'react-redux';

export const DetailAccountScreen = ({route}) => {
  const {accounts, transactions} = useSelector(({account}) => account);
  const dispatch = useDispatch();

  const account = useMemo(() => {
    return accounts.find(acc => acc.id === route.params.id);
  }, [accounts, route.params.id]);

  const [income, incomeTransaction, expense, expenseTransaction, total] =
    useMemo(() => {
      let totalIncome = transactions.filter(
        transaction =>
          transaction.type === 'income' && transaction.idAccount === account.id,
      );
      let amountIncome = totalIncome.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0,
      );
      let totalExpense = transactions.filter(
        transaction =>
          transaction.type === 'expense' &&
          transaction.idAccount === account.id,
      );
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
    }, [transactions, account.id]);

  const theme = useTheme();

  const accountByType = {
    cash: ['Income', 'Expense', 'wallet'],
    invest: ['Unrealized', 'Realized', 'chart-areaspline-variant'],
    loan: ['Credit', 'Debt', 'credit-card'],
  };

  // const accountByType = {
  //   cash: 'wallet',
  //   invest: 'chart-areaspline-variant',
  //   loan: 'credit-card',
  // };

  const Header = () => (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <IconButton
        icon="close"
        mode="outlined"
        size={20}
        onPress={() => navigator.goBack()}
      />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Pressable
          onPress={() => navigator.navigate('add-account', account)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 50,
            paddingHorizontal: 16,
            height: 36,
            borderColor: theme.colors.outline,
          }}>
          <Icon
            name="application-edit"
            color={theme.colors.onSurface}
            size={16}
          />
          <Text
            style={{
              marginLeft: 8,
            }}
            variant="labelMedium">
            Edit
          </Text>
        </Pressable>
        <IconButton
          icon="trash-can"
          mode="outlined"
          size={20}
          onPress={() => {
            dispatch(deleteAccount(account.id));
            navigator.goBack();
          }}
        />
      </View>
    </View>
  );

  const AccountDetail = () => (
    <View style={{paddingHorizontal: 32, paddingVertical: 16}}>
      <View
        style={{
          flexDirection: 'row',
          // alignItems: 'center',
        }}>
        <Icon
          name={accountByType[account.type][2] || ''}
          color={theme.colors.onSurface}
          size={24}
        />
        <View
          style={{
            marginLeft: 8,
          }}>
          <Text
            style={[
              {
                fontWeight: 'bold',

                color: theme.colors.onSurfaceVariant,
              },
            ]}
            variant="labelLarge">
            {account.name}
          </Text>

          <Text
            style={[
              {
                color: theme.colors.onSurfaceVariant,
              },
            ]}
            variant="labelSmall">
            {account.description}
          </Text>
        </View>
      </View>
      <Text
        style={{
          marginTop: 8,
        }}
        variant="headlineSmall">
        {currency(total)}
      </Text>
    </View>
  );

  const TransactionsDetail = () => (
    <View style={styles.contentContainer}>
      <View
        style={[
          styles.incomeContainer,
          {
            backgroundColor: theme.colors.surfaceVariant,
          },
        ]}>
        <Text
          variant="titleMedium"
          style={[
            styles.titleStyle,
            {
              color: theme.colors.onSurfaceVariant,
            },
          ]}>
          {accountByType[account.type][0] || ''}
        </Text>
        <Text
          variant="titleSmall"
          style={[
            styles.amountStyle,
            {
              color: theme.colors.onSurfaceVariant,
            },
          ]}>
          {currency(income, {})}
        </Text>
        <Text
          variant="titleSmall"
          style={[
            styles.subTitleStyle,
            {
              color: theme.colors.onSurfaceVariant,
            },
          ]}>
          Indonesian Rupiah
        </Text>

        <Text
          variant="titleSmall"
          style={[
            styles.amountStyle,
            {
              color: theme.colors.onSurfaceVariant,
            },
          ]}>
          {incomeTransaction}
        </Text>
        <Text
          variant="titleSmall"
          style={[
            styles.subTitleStyle,
            {
              color: theme.colors.onSurfaceVariant,
            },
          ]}>
          Transactions
        </Text>
      </View>
      <View
        style={[
          styles.expenseContainer,
          {
            backgroundColor: theme.colors.surfaceVariant,
          },
        ]}>
        <Text
          variant="titleSmall"
          style={[
            styles.titleStyle,
            {
              color: theme.colors.onSurfaceVariant,
            },
          ]}>
          {accountByType[account.type][1] || ''}
        </Text>
        <Text
          variant="titleMedium"
          style={[
            styles.amountStyle,

            {
              color: theme.colors.onSurfaceVariant,
            },
          ]}>
          {currency(expense, {})}
        </Text>
        <Text
          variant="titleSmall"
          style={[
            styles.subTitleStyle,
            {
              color: theme.colors.onSurfaceVariant,
            },
          ]}>
          Indonesian Rupiah
        </Text>

        <Text
          variant="titleSmall"
          style={[
            styles.amountStyle,
            {
              color: theme.colors.onSurfaceVariant,
            },
          ]}>
          {expenseTransaction}
        </Text>
        <Text
          variant="titleSmall"
          style={[
            styles.subTitleStyle,
            {
              color: theme.colors.onSurfaceVariant,
            },
          ]}>
          Transactions
        </Text>
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
      <AccountDetail />
      <TransactionsDetail />
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
});
