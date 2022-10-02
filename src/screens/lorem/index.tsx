import React from 'react';
import {Text, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {navigator} from '../../helpers';

export const LoremScreen = () => {
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigator.goBack();
          }}
        />
        <Appbar.Content title="Lorem" />
        <Appbar.Action icon="calendar" onPress={() => {}} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      <Text>LoremScreen</Text>
    </View>
  );
};
