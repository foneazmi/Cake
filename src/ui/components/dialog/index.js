import React from 'react';
import {StyleSheet, View, Modal, Pressable} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {Text, useTheme} from 'react-native-paper';
import {width} from '../../../helpers';
import {useDispatch, useSelector} from 'react-redux';
import {setDialog} from '../../../stores/actions';

export const Dialog = () => {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {dialog} = useSelector(({global}) => global);
  const ACTIONS = dialog?.actions || [];
  return isFocused ? (
    <Modal
      transparent
      visible={dialog ? true : false}
      animationType="fade"
      statusBarTranslucent>
      <Pressable
        onPress={() => {
          dispatch(setDialog(false));
        }}
        style={styles.container}>
        <View
          style={[
            styles.dialogContainer,
            {
              backgroundColor: theme.colors.background,
            },
          ]}>
          <Text style={styles.dialogTitle} variant="titleMedium">
            {dialog?.title}
          </Text>
          <Text variant="titleSmall">{dialog?.description}</Text>
          <View style={styles.dialogActionsContainer}>
            {ACTIONS.map((action, index) => {
              return (
                <Pressable
                  key={`${index}-actions`}
                  onPress={() => {
                    action?.onPress && action?.onPress();
                    dispatch(setDialog(false));
                  }}
                  style={styles.dialogActionContainer}>
                  <Text
                    style={[
                      styles.dialogActionText,
                      {
                        color: theme.colors.primary,
                      },
                    ]}>
                    {action.title}
                  </Text>
                </Pressable>
              );
            })}
          </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080',
  },
  dialogContainer: {
    width: width * 0.85,
    padding: 24,
    borderRadius: 10,
  },
  dialogTitle: {
    marginBottom: 4,
    fontWeight: 'bold',
  },
  dialogActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  dialogActionContainer: {
    padding: 8,
  },
  dialogActionText: {
    minWidth: 40,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
