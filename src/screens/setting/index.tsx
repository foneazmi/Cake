import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Appbar, List, Switch} from 'react-native-paper';
import {navigator} from '../../helpers';
import {useTheme} from 'react-native-paper';
import {setDarkMode} from '../../stores/actions';
import {useDispatch, useSelector} from 'react-redux';
export const SettingScreen = () => {
  const settings = useSelector((state: any) => state.settings);
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
      <Appbar.Header>
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
          title="Dark Mode"
          description="Set manual dark mode"
          right={() => (
            <View style={styles.switchContainer}>
              <Switch
                value={settings.darkMode}
                onValueChange={value => {
                  console.log('value', value);
                  dispatch(setDarkMode(!value));
                }}
              />
            </View>
          )}
          left={props => <List.Icon {...props} icon="brightness-4" />}
        />
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  switchContainer: {justifyContent: 'center'},
});
