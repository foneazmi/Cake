import React, {useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef, forFade} from './helpers';
import {DashboardScreen, LoremScreen, SettingScreen} from './screens';

const Stack = createStackNavigator();
import {NavigationContainer} from '@react-navigation/native';

import {
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperLightTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

export const AppRouter = () => {
  const isDarkMode = false;

  const theme = useMemo(
    () => (isDarkMode ? PaperDarkTheme : PaperLightTheme),
    [isDarkMode],
  );

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: forFade,
          }}>
          <Stack.Screen name="dashboard" component={DashboardScreen} />
          <Stack.Screen name="lorem" component={LoremScreen} />
          <Stack.Screen name="setting" component={SettingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};
