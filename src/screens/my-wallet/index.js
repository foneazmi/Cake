import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Appbar, Text} from 'react-native-paper';
import {navigator} from '../../helpers';
import {useTheme} from 'react-native-paper';

export const MyWalletScreen = () => {
  const theme = useTheme();

  const containerStyle = [
    styles.container,
    {
      backgroundColor: theme.colors.background,
    },
  ];

  return (
    <View style={containerStyle}>
      <Appbar.Header mode="small">
        <Appbar.BackAction
          onPress={() => {
            navigator.goBack();
          }}
        />
        <Appbar.Content title="My Wallet" />
      </Appbar.Header>
      {/* <Text variant="labelMedium">My Wallet</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
