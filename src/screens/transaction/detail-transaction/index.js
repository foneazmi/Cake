import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {navigator} from '../../../helpers';
import {useTheme} from 'react-native-paper';

export const DetailTransactionScreen = ({route}) => {
  const account = route.params;
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}>
      <Appbar.Header mode="small">
        <Appbar.BackAction
          onPress={() => {
            navigator.goBack();
          }}
        />
        <Appbar.Content title={account.name} />
      </Appbar.Header>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
