import React from 'react';

import {View, StyleSheet} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {currency} from '../../../../../helpers';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const TotalTransaction = () => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View>
        <Text variant="headlineSmall">{currency(0)}</Text>
      </View>
      <View style={styles.contentContainer}>
        <View
          style={[
            styles.incomeContainer,
            {
              backgroundColor: theme.colors.surfaceVariant,
            },
          ]}>
          <View style={styles.titleContainer}>
            <Icon
              name="credit-card-plus-outline"
              size={24}
              color={theme.colors.onBackground}
            />
            <Text variant="titleMedium" style={styles.titleStyle}>
              Income
            </Text>
          </View>
          <Text variant="titleSmall" style={styles.subTitleStyle}>
            {currency(0)}
          </Text>
        </View>
        <View
          style={[
            styles.expenseContainer,
            {
              backgroundColor: theme.colors.surfaceVariant,
            },
          ]}>
          <View style={styles.titleContainer}>
            <Icon
              name="credit-card-minus-outline"
              size={24}
              color={theme.colors.onBackground}
            />
            <Text variant="titleMedium" style={styles.titleStyle}>
              Expense
            </Text>
          </View>
          <Text variant="titleSmall" style={styles.subTitleStyle}>
            {currency(0)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  contentContainer: {
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
  titleContainer: {flexDirection: 'row', marginBottom: 4},
  titleStyle: {
    marginLeft: 4,
    fontWeight: 'bold',
  },
  subTitleStyle: {
    fontWeight: '400',
  },
});
