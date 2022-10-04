import React, {useMemo} from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef, forFade} from './helpers';
import {DashboardScreen, LoremScreen, SettingScreen} from './screens';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();
import {NavigationContainer} from '@react-navigation/native';

import {
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperLightTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {StatusBar} from 'react-native';

export const AppRouter = () => {
  const {darkMode} = useSelector(state => state.settings);
  const [theme, barStyle] = useMemo(
    () =>
      darkMode
        ? [PaperDarkTheme, 'light-content']
        : [PaperLightTheme, 'dark-content'],
    [darkMode],
  );

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar
          barStyle={barStyle}
          backgroundColor={theme.colors.background}
        />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            // cardStyleInterpolator: forFade,
          }}>
          <Stack.Screen name="dashboard" component={DashboardScreen} />
          <Stack.Screen name="lorem" component={LoremScreen} />
          <Stack.Screen name="setting" component={SettingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};
