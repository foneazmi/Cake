import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './helpers';
import {HomeScreen, LoremScreen} from './screens';

const Stack = createStackNavigator();

export const AppRouter = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="lorem" component={LoremScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
