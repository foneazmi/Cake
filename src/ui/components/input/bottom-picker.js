import React from 'react';
import {StyleSheet, View, Modal, Pressable} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {height, width} from '../../../helpers';
import {setDialog} from '../../../stores/actions';

export const BottomPicker = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const visible = true;
  return visible ? (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent>
      <Pressable
        onPress={() => {
          dispatch(setDialog(false));
        }}
        style={styles.container}>
        <View
          style={[
            styles.contentContainer,
            {
              backgroundColor: theme.colors.background,
            },
          ]}>
          <Text variant="titleMedium">Please Select</Text>
          <Text variant="titleSmall">Description</Text>
        </View>
      </Pressable>
    </Modal>
  ) : (
    <></>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000080',
  },
  contentContainer: {
    width,
    height: height / 3,
    padding: 24,
    borderRadius: 10,
  },
});
