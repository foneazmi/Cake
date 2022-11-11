import React, {useState, useMemo} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Pressable,
} from 'react-native';
import {useSelector} from 'react-redux';
import {currency, navigator} from '../../../../helpers';
import {useTheme, FAB, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const AccountPage = () => {
  const {accounts} = useSelector(({account}) => account);
  const totalAmount = useMemo(() => {
    return accounts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0,
    );
  }, [accounts]);
  const [scrollY, setScrollY] = useState(0);
  const [showFab, setShowFab] = useState(true);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleLarge" style={{fontWeight: 'bold'}}>
          Accounts
        </Text>
        <Text variant="titleSmall">{`Total : ${currency(totalAmount)}`}</Text>
      </View>
      <FlatList
        scrollEventThrottle={300}
        onScroll={({nativeEvent}) => {
          setScrollY(nativeEvent.contentOffset.y);
          if (nativeEvent.contentOffset.y <= 0) {
            setShowFab(true);
          } else {
            setShowFab(scrollY > nativeEvent.contentOffset.y);
          }
        }}
        data={accounts}
        keyExtractor={(_, index) => `account-${index}`}
        renderItem={({item}) => <Account {...item} />}
      />
      {accounts.length < 6 && (
        <FAB
          variant="secondary"
          icon="plus"
          visible={showFab}
          animated
          style={styles.fab}
          onPress={() => navigator.navigate('add-account')}
        />
      )}
    </SafeAreaView>
  );
};

const Account = props => {
  const theme = useTheme();
  return (
    <Pressable onPress={() => navigator.navigate('detail-account', props)}>
      <View
        style={[
          styles.accountContainer,
          {
            backgroundColor: theme.colors.surfaceVariant,
          },
        ]}>
        <View style={styles.accountHeaderContainer}>
          <Icon name="wallet" size={24} color={theme.colors.onBackground} />
          <Text style={styles.accountTitleHeader} variant="titleMedium">
            {props.name}
          </Text>
        </View>
        <Text variant="headlineSmall" style={styles.accountAmount}>
          {currency(props.amount)}
        </Text>
        <View style={styles.accountInnerContainer}>
          <View
            style={[
              styles.accountIncomeContainer,
              {
                backgroundColor: theme.colors.surface,
              },
            ]}>
            <Text variant="labelMedium" style={styles.accountInnerTitle}>
              Income This Month
            </Text>
            <Text variant="labelSmall" style={styles.accountInnerSubTitle}>
              {currency(0)}
            </Text>
          </View>
          <View
            style={[
              styles.accountExpenseContainer,
              {
                backgroundColor: theme.colors.surface,
              },
            ]}>
            <Text variant="labelMedium" style={styles.accountInnerTitle}>
              Expense This Month
            </Text>
            <Text variant="labelSmall" style={styles.accountInnerSubTitle}>
              {currency(0)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  //////
  accountContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 10,
  },
  accountHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountTitleHeader: {
    marginLeft: 4,
    fontWeight: 'bold',
  },
  accountAmount: {
    marginVertical: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  accountInnerContainer: {
    flexDirection: 'row',
  },
  accountIncomeContainer: {
    flex: 1,
    borderRadius: 10,
    padding: 4,
    marginRight: 4,
  },
  accountInnerTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  accountInnerSubTitle: {
    textAlign: 'center',
    fontWeight: '400',
  },
  accountExpenseContainer: {
    flex: 1,
    borderRadius: 10,
    padding: 4,
    marginLeft: 4,
  },
});
