import React from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import {Text} from 'react-native-paper';
import {currency, navigator} from '../../../../../helpers';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const accountByType = {
  cash: ['Income', 'Expense', 'wallet'],
  invest: ['Unrealized', 'Realized', 'chart-areaspline-variant'],
  loan: ['Credit', 'Debt', 'credit-card'],
};

export const AccountDetail = ({account, total, tag}) => {
  const theme = useTheme();

  return (
    <View style={styles.accountDetailContainer}>
      <View style={styles.accountDetailHeaderContainer}>
        <Icon
          name={
            account?.type
              ? accountByType[account.type][2]
              : tag
              ? 'tag-outline'
              : 'credit-card'
          }
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
            {tag ? tag.name : account ? account?.name || '' : 'All'}
            {account?.archivedAt ? ' [Archived]' : ''}
          </Text>

          <Text
            style={{
              color: theme.colors.onSecondaryContainer,
            }}
            variant="labelSmall">
            {account
              ? account?.description || ''
              : tag
              ? 'Transaction By Tag'
              : 'All Transaction Account'}
          </Text>
        </View>
      </View>
      <Text variant="headlineSmall">{currency(total)}</Text>
    </View>
  );
};

export const TransactionsDetail = ({
  account,
  totalIncome,
  totalIncomeTransaction,
  totalExpense,
  totalExpenseTransaction,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.contentContainer}>
      <View
        style={[
          styles.incomeContainer,
          {
            backgroundColor: theme.colors.secondaryContainer,
          },
        ]}>
        <TransactionDetailItem
          isArchived={account?.archivedAt}
          accountId={account?.id || ''}
          title={account?.type ? accountByType[account.type][0] : 'Income'}
          totalIncome={totalIncome}
          totalTransaction={totalIncomeTransaction}
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
          isArchived={account?.archivedAt}
          accountId={account?.id || ''}
          title={account?.type ? accountByType[account.type][1] : 'Expense'}
          totalIncome={totalExpense}
          totalTransaction={totalExpenseTransaction}
          type="expense"
        />
      </View>
    </View>
  );
};

const TransactionDetailItem = ({
  isArchived,
  accountId = '',
  title,
  totalIncome,
  totalTransaction,
  type,
}) => {
  const theme = useTheme();
  return (
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
      {isArchived ? (
        <></>
      ) : (
        <Pressable
          onPress={() =>
            navigator.navigate('add-transaction', {
              type,
              idAccount: accountId,
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
};

const styles = StyleSheet.create({
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
  titleStyle: {
    fontWeight: '700',
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
    height: 40,
  },
  accountDetailTitle: {
    fontWeight: 'bold',
  },
  /////
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
  subTitleStyle: {
    fontWeight: '300',
  },
  amountStyle: {
    marginTop: 8,
    fontWeight: 'bold',
  },
});
