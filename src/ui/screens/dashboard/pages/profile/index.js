import React from 'react';
import {View} from 'react-native';
import {Appbar, Text} from 'react-native-paper';
import {navigator} from 'cake/src/helpers';

export const ProfilePage = () => {
  return (
    <View>
      <Appbar.Header mode="center-aligned">
        <Appbar.Content title="Profile" />
        <Appbar.Action
          icon="cog"
          onPress={() => {
            navigator.navigate('setting');
          }}
        />
      </Appbar.Header>
      <Text variant="labelMedium">Profile Page</Text>
    </View>
  );
};
