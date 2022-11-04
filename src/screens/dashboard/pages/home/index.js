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
        <MyAccount />
        <RecentTransaction />
      </ScrollView>

      <FAB
        icon="plus"
        visible={showFab}
        animated
        mode="flat"
        style={styles.fab}
        onPress={() => navigator.navigate('add-transaction')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
