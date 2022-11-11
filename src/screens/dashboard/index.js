import React from 'react';
import {BottomNavigation} from 'react-native-paper';

import {HomePage, ProfilePage, AccountPage} from './pages';

export const DashboardScreen = () => {
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    {
      key: 'home',
      title: 'Home',
      focusedIcon: 'home-circle',
      unfocusedIcon: 'home-circle-outline',
    },
    {
      key: 'account',
      title: 'Account',
      focusedIcon: 'wallet',
      unfocusedIcon: 'wallet-outline',
    },
    {
      key: 'profile',
      title: 'Profile',
      focusedIcon: 'account-circle',
      unfocusedIcon: 'account-circle-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomePage,
    account: AccountPage,
    profile: ProfilePage,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};
