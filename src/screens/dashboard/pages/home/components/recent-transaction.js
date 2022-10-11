import React from 'react';
import {
  View,
  StyleSheet,
  // Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'react-native-paper';
// import {useSelector} from 'react-redux';
import {
  currency,
  // navigator
} from '../../../../../helpers';

// const {width} = Dimensions.get('screen');

const TRANSACTION_DATA = [
  {
    name: 'Test-1',
    amount: 20000,
  },
];

const ListTransaction = () => {
  //   const {accounts} = useSelector(({global}) => global);

  return (
    <View>
      {TRANSACTION_DATA.map(account => (
        <TouchableOpacity
          key={`${account.id}`}
          //   onPress={() => navigator.navigate('detail-account', account)}
          style={styles.itemContainer}>
          <Text variant="labelLarge">{account.name}</Text>
          <Text variant="labelSmall">{currency(account.amount)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export const RecentTransaction = () => {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium">Recent Transaction</Text>
      <ListTransaction />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  itemContainer: {
    // margin: 4,
  },
});
