import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, useTheme, IconButton} from 'react-native-paper';
import {currency} from '../../../../../helpers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

const ListTag = props => {
  const theme = useTheme();
  return (
    <View style={{flexDirection: 'row', marginBottom: 4}}>
      {props.data.map((tag, index) => (
        <View
          key={`${index}-tag`}
          style={{
            flexDirection: 'row',
            paddingVertical: 8,
            alignItems: 'center',
            paddingHorizontal: 16,
            borderRadius: 50,
            marginRight: 4,
            backgroundColor: theme.colors.primary,
          }}>
          <Icon name={tag.icon} size={16} color={theme.colors.onTertiary} />
          <Text
            variant="labelMedium"
            style={{
              marginLeft: 4,
              fontWeight: 'bold',
              color: theme.colors.onTertiary,
            }}>
            {tag.name}
          </Text>
        </View>
      ))}
    </View>
  );
};
const Transaction = props => {
  const theme = useTheme();
  const {accounts} = useSelector(({account}) => account);
  const acc = accounts.find(account => account.id === props.idAccount);
  return (
    <View
      style={[
        styles.transactionContainer,
        {
          backgroundColor: theme.colors.surfaceVariant,
        },
      ]}>
      <ListTag
        data={[
          {
            name: acc.name,
            icon: 'wallet',
          },
        ]}
      />
      {props.title && (
        <Text variant="bodyLarge" style={styles.titleStyle}>
          {props.title}
        </Text>
      )}
      {props.description && (
        <Text variant="bodySmall" style={styles.descriptionStyle}>
          {props.description}
        </Text>
      )}

      <View style={styles.amountContainer}>
        <Icon
          name="credit-card-plus-outline"
          size={20}
          color={theme.colors.onSurfaceVariant}
        />
        <Text variant="titleMedium" style={styles.amountStyle}>
          {currency(props.amount)}
        </Text>
      </View>
    </View>
  );
};

const ListTransaction = () => {
  const {transactions} = useSelector(({account}) => account);

  return (
    <View>
      {transactions.map((transaction, index) => (
        <Transaction {...transaction} key={`${index}-transaction-item`} />
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

  transactionContainer: {
    flex: 1,
    marginTop: 8,
    borderRadius: 10,
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  titleStyle: {
    fontWeight: 'bold',
  },
  descriptionStyle: {
    marginVertical: 2,
  },
  amountStyle: {
    fontWeight: '400',
    marginLeft: 8,
  },
  amountContainer: {
    marginTop: 4,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
