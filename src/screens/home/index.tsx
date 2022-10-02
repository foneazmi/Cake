import React from 'react';
import {View, Text} from 'react-native';
import {Appbar} from 'react-native-paper';
import {navigator} from '../../helpers';
export const HomeScreen = () => {
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Title" />
        <Appbar.Action
          icon="calendar"
          onPress={() => {
            navigator.navigate('lorem');
          }}
        />
      </Appbar.Header>
      <Text>HomeScreen</Text>
    </View>
  );
};
