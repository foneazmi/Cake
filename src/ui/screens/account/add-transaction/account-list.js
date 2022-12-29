import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {navigator} from '../../../../helpers';

export const AccountList = ({
  type,
  activeAccounts,
  selectedAccount,
  selectedToAccount,
  onPressAccount,
  onPressToAccount,
}) => {
  if (type === 'income' || type === 'expense') {
    return (
      <View>
        <Text style={styles.accountListTitle} variant="labelLarge">
          {type === 'income' ? 'Add Money To' : 'Pay With'}
        </Text>
        <FlatList
          contentContainerStyle={styles.accountListContainer}
          data={activeAccounts}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={
            <Button
              icon="wallet-plus"
              mode="contained-tonal"
              style={styles.accountItemContainer}
              onPress={() => navigator.navigate('add-account')}>
              Add Account
            </Button>
          }
          horizontal
          renderItem={({item}) => (
            <Button
              icon="wallet"
              mode={
                selectedAccount === item.id ? 'contained' : 'contained-tonal'
              }
              style={styles.accountItemContainer}
              onPress={() => onPressAccount(item.id)}>
              {item.name}
            </Button>
          )}
        />
      </View>
    );
  } else {
    return (
      <View>
        <Text style={styles.accountListTitle} variant="labelLarge">
          From
        </Text>
        <FlatList
          data={activeAccounts}
          contentContainerStyle={styles.accountListContainer}
          showsHorizontalScrollIndicator={false}
          horizontal
          ListFooterComponent={
            <Button
              icon="wallet-plus"
              mode="contained-tonal"
              style={styles.accountItemContainer}
              onPress={() => navigator.navigate('add-account')}>
              Add Account
            </Button>
          }
          renderItem={({item}) => (
            <Button
              icon="wallet"
              mode={
                selectedAccount === item.id ? 'contained' : 'contained-tonal'
              }
              style={styles.accountItemContainer}
              onPress={() => onPressAccount(item.id)}>
              {item.name}
            </Button>
          )}
        />
        <Text style={styles.accountListTitle} variant="labelLarge">
          To
        </Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={activeAccounts}
          contentContainerStyle={styles.accountListContainer}
          horizontal
          ListFooterComponent={
            <Button
              icon="wallet-plus"
              mode="contained-tonal"
              style={styles.accountItemContainer}
              onPress={() => navigator.navigate('add-account')}>
              Add Account
            </Button>
          }
          renderItem={({item}) => (
            <Button
              disabled={selectedAccount === item.id}
              icon="wallet"
              mode={
                selectedToAccount === item.id ? 'contained' : 'contained-tonal'
              }
              style={styles.accountItemContainer}
              onPress={() => onPressToAccount(item.id)}>
              {item.name}
            </Button>
          )}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  accountListTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 20,
    marginLeft: 16,
  },
  accountListContainer: {
    paddingHorizontal: 16,
  },
  accountItemContainer: {
    marginRight: 8,
  },
});
