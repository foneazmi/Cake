import React, {useMemo} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {currency, navigator} from '../../../../../helpers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import moment from 'moment';

const ListTag = props => {
  const theme = useTheme();
  return (
    <View style={styles.listTagContainer}>
      {props.data.map((tag, index) => (
        <Pressable
          onPress={() => navigator.navigate('detail-account', {id: tag.id})}
          key={`${index}-tag`}
          style={[
            styles.tagContainer,
            {
              backgroundColor: theme.colors.primary,
            },
          ]}>
          <Icon name={tag.icon} size={16} color={theme.colors.onPrimary} />
          <Text
            variant="labelMedium"
            style={[
              styles.tagTitle,
              {
                color: theme.colors.onPrimary,
              },
            ]}>
            {tag.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};
export const Transaction = props => {
  const theme = useTheme();
  const {accounts, tags} = useSelector(({account}) => account);
  const account = useMemo(
    () => accounts.find(acc => acc.id === props.idAccount),
    [accounts, props.idAccount],
  );

  const account2 = useMemo(
    () => accounts.find(acc => acc.id === props.idAccount2),
    [accounts, props.idAccount2],
  );

  const tag = useMemo(
    () => tags.find(e => e.id === props.tag),
    [tags, props.tag],
  );

  const transactionByType = {
    transfer: 'credit-card-sync-outline',
    income: 'credit-card-plus-outline',
    expense: 'credit-card-minus-outline',
  };
  const accountByType = {
    cash: 'wallet',
    invest: 'chart-areaspline-variant',
    loan: 'credit-card',
  };

  return (
    <Pressable
      onPress={() => navigator.navigate('add-transaction', props)}
      style={[
        styles.transactionContainer,
        {
          backgroundColor: theme.colors.secondaryContainer,
        },
      ]}>
      <ListTag
        data={[
          {
            name: account?.name || '',
            icon: accountByType[account?.type] || '',
            id: account?.id || '',
          },
          ...(account2
            ? [
                {
                  name: account2?.name,
                  icon: accountByType[account2?.type],
                  id: account2?.id,
                },
              ]
            : []),
          ...(tag
            ? [
                {
                  name: tag?.name || '',
                  icon: 'tag-outline',
                  id: tag?.id || '',
                  type: 'tag',
                },
              ]
            : []),
        ]}
      />
      <View style={styles.transactionItemContainer}>
        <View style={styles.transactionItemContentContainer}>
          {props.title && (
            <Text
              numberOfLines={1}
              variant="bodyLarge"
              style={[
                styles.titleStyle,
                {
                  color: theme.colors.onSecondaryContainer,
                },
              ]}>
              {props.title}
            </Text>
          )}
          {props.description && (
            <Text
              numberOfLines={1}
              variant="bodyMedium"
              style={[
                styles.descriptionStyle,
                {
                  color: theme.colors.onSecondaryContainer,
                },
              ]}>
              {props.description}
            </Text>
          )}
          <Text variant="labelSmall">
            {moment(props.date).format('D MMM Y')}
          </Text>
        </View>
        <View style={styles.amountContainer}>
          <Icon
            name={transactionByType[props.type] || ''}
            size={16}
            color={theme.colors.onSecondaryContainer}
          />
          <Text
            variant="titleSmall"
            style={[
              styles.transactionAmountStyle,
              {
                color: theme.colors.onSecondaryContainer,
              },
            ]}>
            {currency(props.amount)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  transactionContainer: {
    marginHorizontal: 16,
    flex: 1,
    marginVertical: 8,
    borderRadius: 10,
    padding: 20,
  },
  titleStyle: {
    fontWeight: 'bold',
  },
  descriptionStyle: {
    marginVertical: 2,
  },
  amountContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  transactionAmountStyle: {
    marginLeft: 4,
    fontWeight: 'bold',
  },
  ///
  listTagContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  tagContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 50,
    marginRight: 8,
  },
  tagTitle: {
    marginLeft: 4,
    fontWeight: 'bold',
  },
  transactionItemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
    alignItems: 'center',
  },
  transactionItemContentContainer: {
    flex: 1,
    marginRight: 8,
  },
});
