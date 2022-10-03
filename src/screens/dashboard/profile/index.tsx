import React from 'react';
import {View} from 'react-native';
import {Appbar, Text} from 'react-native-paper';

export const ProfilePage = () => {
  return (
    <View>
      <Appbar.Header mode="center-aligned">
        <Appbar.Content title="Profile" />
      </Appbar.Header>
      <Text variant="labelMedium">Profile Page</Text>
    </View>
  );
};
