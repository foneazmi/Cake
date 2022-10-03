import React from 'react';
import {Text, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {navigator} from '../../../helpers';

export const HomePage = () => {
  return (
    <View>
      <Appbar.Header mode="center-aligned">
        <Appbar.Content title="Home" />
        <Appbar.Action
          icon="calendar-cursor"
          onPress={() => {
            navigator.navigate('lorem');
          }}
        />
      </Appbar.Header>
      <Text>HomePage</Text>
    </View>
  );
};
