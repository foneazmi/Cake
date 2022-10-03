import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Appbar, MD3LightTheme as DefaultTheme} from 'react-native-paper';
import {navigator} from '../../helpers';

export const LoremScreen = () => {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigator.goBack();
          }}
        />
        <Appbar.Content title="Lorem" />
      </Appbar.Header>
      <Text>LoremScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.colors.background,
    flex: 1,
  },
});
