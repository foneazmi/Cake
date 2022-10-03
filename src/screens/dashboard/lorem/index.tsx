import React from 'react';
import {Text, View} from 'react-native';
import {Appbar} from 'react-native-paper';

export const LoremPage = () => {
  return (
    <View>
      <Appbar.Header mode="center-aligned">
        <Appbar.Content title="Lorem" />
      </Appbar.Header>
      <Text>LoremPage</Text>
    </View>
  );
};
