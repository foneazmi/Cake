/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, FAB} from 'react-native-paper';
import {navigator, greetingByTime} from '../../../../helpers';
import {MyAccount, RecentTransaction} from './components';

const AppBarSection = () => (
  <Appbar.Header mode="center-aligned">
    <Appbar.Content title={greetingByTime()} />
  </Appbar.Header>
);

// if (
//   lastContentOffset.value > event.contentOffset.y &&
//   isScrolling.value
// ) {
//   translateY.value = 0;
//   console.log('scrolling up');
// } else if (
//   lastContentOffset.value < event.contentOffset.y &&
//   isScrolling.value
// ) {
//   translateY.value = 100;
//   console.log('scrolling down');
// }
// lastContentOffset.value = event.contentOffset.y;

export const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showFab, setShowFab] = useState(true);
  const [open, setOpen] = useState(false);
  return (
    <View style={{flex: 1}}>
      <AppBarSection />
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
        <RecentTransaction />
      </ScrollView>

      <FAB.Group
        open={open}
        variant="secondary"
        visible={showFab}
        icon={open ? 'wallet' : 'plus'}
        actions={[
          {
            icon: 'bank-transfer',
            label: 'Account Transfer',
            onPress: () => console.log('Pressed star'),
          },
          {
            icon: 'bank-transfer-out',
            label: 'Add Expense',
            onPress: () => console.log('Pressed email'),
          },
          {
            icon: 'bank-transfer-in',
            label: 'Add Income',
            onPress: () => console.log('Pressed notifications'),
          },
        ]}
        onStateChange={() => setOpen(!open)}
      />
    </View>
  );
};
