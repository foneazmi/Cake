import React from 'react';
import {StyleSheet, View, ActivityIndicator, Modal} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

export const Loader = ({isLoading}) => {
  const isFocused = useIsFocused();
  return (
    isFocused && (
      <Modal
        transparent
        visible={isLoading}
        animationType="fade"
        statusBarTranslucent>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="white" />
        </View>
      </Modal>
    )
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
