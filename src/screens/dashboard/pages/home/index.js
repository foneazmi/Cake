/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Text, Appbar, useTheme, Card, IconButton} from 'react-native-paper';
import {navigator, greetingByTime} from '../../../../helpers';
import {MyAccount, RecentTransaction} from './components';

const AppBarSection = () => (
  <Appbar.Header mode="center-aligned">
    <Appbar.Content title={greetingByTime()} />
  </Appbar.Header>
);

export const HomePage = () => {
  return (
    <View style={{flex: 1}}>
      <AppBarSection />
      <ScrollView>
        <MyAccount />
        <RecentTransaction />
      </ScrollView>
    </View>
  );
};
