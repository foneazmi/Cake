import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Appbar, List} from 'react-native-paper';
import {navigator} from '../../helpers';
import {useTheme} from 'react-native-paper';
import {setDarkMode, resetAll} from '../../stores/actions';
import {useDispatch, useSelector} from 'react-redux';
export const SettingScreen = () => {
  const {darkMode} = useSelector(({global}) => global);

  const dispatch = useDispatch();
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
        <Appbar.Content title="Settings" />
      </Appbar.Header>

      <List.Section>
        <List.Subheader>Themes</List.Subheader>
        <List.Item
          onPress={() => {
            dispatch(setDarkMode(!darkMode));
          }}
          title="Dark Mode"
          description="Press to change mode"
          right={props => (
            <List.Icon
              {...props}
              icon={darkMode ? 'brightness-7' : 'brightness-4'}
            />
          )}
        />
      </List.Section>
      {__DEV__ && (
        <List.Section>
          <List.Subheader>Developer Mode</List.Subheader>
          <List.Item
            onPress={() => {
              dispatch(resetAll());
            }}
            title="Factory Reset"
            description="Delete All Saved Data"
            right={props => <List.Icon {...props} icon={'backup-restore'} />}
          />
        </List.Section>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
