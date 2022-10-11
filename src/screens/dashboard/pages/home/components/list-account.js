import React from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {currency, navigator} from '../../../../../helpers';

const {width} = Dimensions.get('screen');

const ListAccount = () => {
  const theme = useTheme();
  const {accounts} = useSelector(({global}) => global);

  return (
    <View style={styles.listContainer}>
      {accounts.map((account, index) =>
        index <= 5 ? (
          <TouchableOpacity
            key={`${account.id}`}
            onPress={() => navigator.navigate('detail-account', account)}
            style={[
              styles.itemContainer,
              {
                backgroundColor: theme.colors.primaryContainer,
              },
            ]}>
            <Text variant="labelLarge">{account.name}</Text>
            <Text variant="labelSmall">{currency(account.amount)}</Text>
          </TouchableOpacity>
        ) : (
          <></>
        ),
      )}
      {accounts.length < 6 && (
        <TouchableOpacity
          onPress={() => navigator.navigate('add-account')}
          style={[
            styles.itemContainer,
            {
              backgroundColor: theme.colors.primaryContainer,
            },
          ]}>
          <Text variant="labelLarge">+</Text>
          <Text variant="labelSmall">Add Account</Text>
        </TouchableOpacity>
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
    marginBottom: 16,
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
