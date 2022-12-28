import React from 'react';
import {StyleSheet, View, ActivityIndicator, Modal} from 'react-native';
import {Text} from 'react-native-paper';
import {useSelector} from 'react-redux';

export const Loader = () => {
  const {loading, progressDescription} = useSelector(({global}) => global);
  return loading ? (
    <Modal
      transparent
      visible={loading}
      animationType="fade"
      statusBarTranslucent>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
        <Text variant="labelSmall">{progressDescription}</Text>
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
