import React from 'react';
import {
  CommonActions,
  StackActions,
  DrawerActions,
  TabActions,
} from '@react-navigation/native';

export const navigationRef = React.createRef();

///CommonActions
const navigate = (...args) => {
  navigationRef.current?.dispatch(CommonActions.navigate(...args));
};
const reset = (...args) => {
  navigationRef.current?.dispatch(CommonActions.reset({...args}));
};
const goBack = () => {
  navigationRef.current?.dispatch(CommonActions.goBack());
};

const setParams = (...args) => {
  navigationRef.current?.dispatch(CommonActions.setParams({...args}));
};

///StackActions
const replace = (...args) => {
  navigationRef.current?.dispatch(StackActions.replace(...args));
};
const push = (...args) => {
  navigationRef.current?.dispatch(StackActions.push(...args));
};
const pop = (count = 1) => {
  navigationRef.current?.dispatch(StackActions.pop(count));
};
const popToTop = () => {
  navigationRef.current?.dispatch(StackActions.popToTop());
};

///DrawerActions
const openDrawer = () => {
  navigationRef.current?.dispatch(DrawerActions.openDrawer());
};
const closeDrawer = () => {
  navigationRef.current?.dispatch(DrawerActions.closeDrawer());
};
const toggleDrawer = () => {
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
};
const drawerJumpTo = () => {
  navigationRef.current?.dispatch(DrawerActions.jumpTo());
};

///TabActions
const jumpTo = (...args) => {
  navigationRef.current?.dispatch(TabActions.jumpTo(...args));
};

///CustomActions
const resetTo = (name, index = 0) => {
  navigationRef.current?.dispatch(
    CommonActions.reset({index, routes: [{name}]}),
  );
};

export const navigator = {
  ///CommonActions
  navigate,
  reset,
  goBack,
  setParams,

  ///StackActions
  replace,
  push,
  pop,
  popToTop,

  ///DrawerActions
  openDrawer,
  closeDrawer,
  toggleDrawer,
  drawerJumpTo,

  ///TabActions
  jumpTo,

  ///CustomActions
  resetTo,
};

export const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
