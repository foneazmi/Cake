import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {FAB, Text} from 'react-native-paper';
import {greetingByTime, navigator} from '../../../../helpers';
import {TotalTransaction, RecentTransaction} from './components';

export const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showFab, setShowFab] = useState(true);
  const [open, setOpen] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleSmall">{greetingByTime()}</Text>
        <Text variant="titleLarge" style={styles.headerText}>
          Hi, Farkhan
        </Text>
      </View>
      <ScrollView
        scrollEventThrottle={300}
        onScroll={({nativeEvent}) => {
          setScrollY(nativeEvent.contentOffset.y);
          if (nativeEvent.contentOffset.y <= 0) {
            setShowFab(true);
          } else {
            setShowFab(scrollY > nativeEvent.contentOffset.y);
          }
        }}>
        <TotalTransaction />
        <RecentTransaction />
      </ScrollView>

      <FAB.Group
        open={open}
        visible={showFab}
        icon={open ? 'credit-card-fast-outline' : 'plus'}
        actions={[
          {
            icon: 'credit-card-sync-outline',
            label: 'Account Transfer',
            onPress: () =>
              navigator.navigate('add-transaction', {
                type: 'transfer',
              }),
          },
          {
            icon: 'credit-card-minus-outline',
            label: 'Add Expense',
            onPress: () =>
              navigator.navigate('add-transaction', {
                type: 'expense',
              }),
          },
          {
            icon: 'credit-card-plus-outline',
            label: 'Add Income',
            onPress: () =>
              navigator.navigate('add-transaction', {
                type: 'income',
              }),
          },
        ]}
        onStateChange={() => setOpen(!open)}
      />
    </SafeAreaView>
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
  headerText: {fontWeight: 'bold'},
});
