import React from 'react';
import {View} from 'react-native';
import {Text, Appbar} from 'react-native-paper';
import {navigator} from '../../../helpers';

export const HomePage = () => {
  return (
    <View>
      <Appbar.Header mode="center-aligned">
        <Appbar.Content title="Home" />
        <Appbar.Action
          icon="dots-horizontal"
          onPress={() => {
            navigator.navigate('lorem');
          }}
        />
      </Appbar.Header>
      <Text variant="labelMedium">Home Page</Text>
    </View>
  );
};
