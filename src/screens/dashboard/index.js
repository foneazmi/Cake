import React from 'react';
import {BottomNavigation} from 'react-native-paper';

import {HomePage} from './home';
import {ProfilePage} from './profile';
import {LoremPage} from './lorem';

export const DashboardScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'home',
      title: 'Home',
      focusedIcon: 'home-circle',
      unfocusedIcon: 'home-circle-outline',
    },
    {
      key: 'lorem',
      title: 'Lorem',
      focusedIcon: 'alien',
      unfocusedIcon: 'alien-outline',
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
    lorem: LoremPage,
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
