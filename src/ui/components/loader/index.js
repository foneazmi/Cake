import React from 'react';
import {StyleSheet, View, ActivityIndicator, Modal} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {Text} from 'react-native-paper';

export const Loader = ({isLoading, description = ''}) => {
  const isFocused = useIsFocused();
  return isFocused && isLoading ? (
    <Modal
      transparent
      visible={isLoading}
      animationType="fade"
      statusBarTranslucent>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
        <Text variant="labelSmall">{description}</Text>
      </View>
    </Modal>
  ) : (
    <></>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080',
  },
});
