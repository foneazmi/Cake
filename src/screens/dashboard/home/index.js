/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text, Appbar, useTheme, Card, IconButton} from 'react-native-paper';
import {navigator, greetingByTime} from '../../../helpers';

export const HomePage = () => {
  return (
    <View>
      <AppBarSection />
      <TotalBalanceSection />
    </View>
  );
};
const AppBarSection = () => (
  <Appbar.Header mode="center-aligned">
    <Appbar.Content title={greetingByTime()} />
  </Appbar.Header>
);
const TotalBalanceSection = () => {
  const theme = useTheme();
  return (
    <Card style={{margin: 10, overflow: 'hidden'}} mode="contained">
      <Card.Content>
        <View
          style={{
            position: 'absolute',
            height: 150,
            width: 150,
            borderRadius: 100,
            bottom: -90,
            opacity: 0.4,
            left: -20,
            backgroundColor: theme.colors.onSurfaceVariant,
          }}
        />
        <View
          style={{
            position: 'absolute',
            height: 150,
            width: 150,
            borderRadius: 100,
            top: -20,
            opacity: 0.4,
            right: -70,
            backgroundColor: theme.colors.tertiary,
          }}
        />
        <View
          style={{
            position: 'absolute',
            height: 30,
            width: 30,
            borderRadius: 100,
            bottom: 20,
            left: 130,
            opacity: 0.4,
            backgroundColor: theme.colors.outline,
          }}
        />
        <Text variant="bodySmall">Total Balance</Text>
        <Text variant="headlineLarge">Rp. 100.000.000</Text>
        <TouchableOpacity
          onPress={() => {
            navigator.navigate('my-wallet');
          }}
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text>My Wallet</Text>
          <IconButton icon="arrow-right-bold-circle" size={40} />
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );
};
