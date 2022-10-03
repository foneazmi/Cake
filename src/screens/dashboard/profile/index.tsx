import React from 'react';
import {Text, View} from 'react-native';
import {Appbar} from 'react-native-paper';

export const ProfilePage = () => {
  return (
    <View>
      <Appbar.Header mode="center-aligned">
        <Appbar.Content title="Profile" />
      </Appbar.Header>
      <Text>ProfilePage</Text>
    </View>
  );
};
