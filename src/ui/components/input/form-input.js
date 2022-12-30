import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {useTheme, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const FormInput = ({onPress, icon, title}) => {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.formInputContainer,
        {
          backgroundColor: theme.colors.secondaryContainer,
        },
      ]}>
      <Icon name={icon} size={20} color={theme.colors.onSurface} />
      <Text
        style={[
          styles.formText,
          {
            color: theme.colors.onSurface,
          },
        ]}
        variant="labelLarge">
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  formInputContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  formText: {
    marginLeft: 8,
  },
});
