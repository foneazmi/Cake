import React, {useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './helpers';
import {TransitionPresets} from '@react-navigation/stack';
import {
  DashboardScreen,
  LoremScreen,
  SettingScreen,
  AddAccountScreen,
  DetailAccountScreen,
} from './screens';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import {
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperLightTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {StatusBar} from 'react-native';

const Stack = createStackNavigator();

export const AppRouter = () => {
  const {darkMode} = useSelector(({global}) => global);
  const [theme, barStyle] = useMemo(
    () =>
      darkMode
        ? [PaperDarkTheme, 'light-content']
        : [PaperLightTheme, 'dark-content'],
    [darkMode],
  );

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer ref={navigationRef} theme={theme}>
        <StatusBar
          barStyle={barStyle}
          backgroundColor={theme.colors.background}
        />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}>
          <Stack.Screen name="dashboard" component={DashboardScreen} />
          <Stack.Screen name="lorem" component={LoremScreen} />
          <Stack.Screen name="setting" component={SettingScreen} />
          <Stack.Screen name="add-account" component={AddAccountScreen} />
          <Stack.Screen name="detail-account" component={DetailAccountScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};
