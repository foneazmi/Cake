import React, {useEffect} from 'react';
import {BottomNavigation} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {backupData} from 'cake/src/stores/actions';

import {HomePage, ProfilePage, AccountPage} from './pages';

export const DashboardScreen = () => {
  const [index, setIndex] = React.useState(0);
  const dispatch = useDispatch();
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
  useEffect(() => {
    dispatch(backupData());
  }, [dispatch]);

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};
