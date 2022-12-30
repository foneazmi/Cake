import React, {useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './helpers';
import {TransitionPresets} from '@react-navigation/stack';
import {
  DashboardScreen,
  LoremScreen,
  SettingScreen,
  AddAccountScreen,
  AddTagScreen,
  DetailAccountScreen,
  AddTransactionScreen,
  ArchiveAccountScreen,
} from './ui/screens';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {StatusBar} from 'react-native';
import {darkTheme, lightTheme} from './theme';
import {Overlay} from './ui/components';
const Stack = createStackNavigator();

export const AppRouter = () => {
  const {darkMode} = useSelector(({global}) => global);

  const [theme, barStyle] = useMemo(
    () =>
      darkMode ? [darkTheme, 'light-content'] : [lightTheme, 'dark-content'],
    [darkMode],
  );

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer ref={navigationRef} theme={theme}>
        <StatusBar
          barStyle={barStyle}
          backgroundColor={theme.colors.background}
        />
        <Overlay />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}>
          <Stack.Screen name="dashboard" component={DashboardScreen} />
          <Stack.Screen name="lorem" component={LoremScreen} />
          {/* //? Settings  */}
          <Stack.Screen name="setting" component={SettingScreen} />

          {/* //? Account  */}
          <Stack.Screen name="add-account" component={AddAccountScreen} />
          <Stack.Screen name="add-tag" component={AddTagScreen} />
          {/*  */}
          <Stack.Screen name="detail-account" component={DetailAccountScreen} />
          <Stack.Screen
            name="archive-account"
            component={ArchiveAccountScreen}
          />

          {/* //? Transaction  */}
          <Stack.Screen
            name="add-transaction"
            component={AddTransactionScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};
