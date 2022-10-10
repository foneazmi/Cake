import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {currency} from '../../../../helpers';

const {width} = Dimensions.get('screen');

const MY_ACCOUNT = [
  {
    account_name: 'Seabank',
    amount: 12000000,
  },
  {
    account_name: 'Maybank',
    amount: 100000,
  },
  {
    account_name: 'BCA',
    amount: 100000,
  },
  {
    account_name: 'Bank Jago',
    amount: 0,
  },
  {
    account_name: 'Bank Jago',
    amount: 0,
  },
];

const ListAccount = () => {
  const theme = useTheme();
  return (
    <View style={styles.listContainer}>
      {MY_ACCOUNT.map((account, index) =>
        index <= 5 ? (
          <View
            key={`${index}-my-account`}
            style={[
              styles.itemContainer,
              {
                backgroundColor: theme.colors.primaryContainer,
              },
            ]}>
            <Text variant="labelLarge">{account.account_name}</Text>
            <Text variant="labelSmall">{currency(account.amount)}</Text>
          </View>
        ) : (
          <></>
        ),
      )}
      {MY_ACCOUNT.length < 6 && (
        <View
          style={[
            styles.itemContainer,
            {
              backgroundColor: theme.colors.primaryContainer,
            },
          ]}>
          <Text variant="labelLarge">+</Text>
          <Text variant="labelSmall">Add Account</Text>
        </View>
      )}
    </View>
  );
};

export const MyAccount = () => {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium">My Account</Text>
      <ListAccount />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  itemContainer: {
    width: (width - 48) / 3,
    padding: 8,
    borderRadius: 4,
    margin: 4,
  },
});
