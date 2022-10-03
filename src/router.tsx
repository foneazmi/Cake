import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef, forFade} from './helpers';
import {DashboardScreen, LoremScreen} from './screens';

const Stack = createStackNavigator();

export const AppRouter = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: forFade,
        }}>
        <Stack.Screen name="dashboard" component={DashboardScreen} />
        <Stack.Screen name="lorem" component={LoremScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
