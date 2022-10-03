import React from 'react';
import {View} from 'react-native';
import {Text, Appbar} from 'react-native-paper';

export const LoremPage = () => {
  return (
    <View>
      <Appbar.Header mode="center-aligned">
        <Appbar.Content title="Lorem" />
      </Appbar.Header>
      <Text variant="labelMedium">Lorem Page</Text>
    </View>
  );
};
