import moment from 'moment';
import React from 'react';
import {
  View,
  StyleSheet,
  // Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text, List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
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
  {
    name: 'Test-1',
    amount: 20000,
  },
  {
    name: 'Test-1',
    amount: 20000,
  },
  {
    name: 'Test-1',
    amount: 20000,
  },
  {
    name: 'Test-1',
    amount: 20000,
  },
  {
    name: 'Test-1',
    amount: 20000,
  },
  {
    name: 'Test-1',
    amount: 20000,
  },
  {
    name: 'Test-1',
    amount: 20000,
  },
  {
    name: 'Test-1',
    amount: 20000,
  },
  {
    name: 'Test-1',
    amount: 20000,
  },
  {
    name: 'Test-1',
    amount: 20000,
  },
];

const ListTransaction = () => {
  //   const {accounts} = useSelector(({global}) => global);
  return (
    <View>
      {TRANSACTION_DATA.map((account, index) => (
        <List.Item
          key={`${index}-transaction`}
          title={account.name}
          titleStyle={{
            fontSize: 12,
          }}
          descriptionStyle={{
            fontWeight: 'bold',
          }}
          description={currency(account.amount)}
          left={props => <List.Icon {...props} icon="folder" />}
          right={props => (
            <View
              style={{
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                Seabank
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  opacity: 0.5,
                }}>
                {moment().format('D-MMM-Y')}
              </Text>
            </View>
          )}
        />
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
    flexDirection: 'row',
    margin: 4,
  },
});
