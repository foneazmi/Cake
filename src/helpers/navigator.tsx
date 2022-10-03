import React from 'react';
import {
  CommonActions,
  StackActions,
  DrawerActions,
  TabActions,
} from '@react-navigation/native';

export const navigationRef: any = React.createRef();

///CommonActions
const navigate = (...args: any) => {
  // @ts-ignore
  navigationRef.current?.dispatch(CommonActions.navigate(...args));
};
const reset = (...args: any) => {
  navigationRef.current?.dispatch(CommonActions.reset({...args}));
};
const goBack = () => {
  navigationRef.current?.dispatch(CommonActions.goBack());
};

const setParams = (...args: any) => {
  navigationRef.current?.dispatch(CommonActions.setParams({...args}));
};

///StackActions
const replace = (...args: any) => {
  // @ts-ignore
  navigationRef.current?.dispatch(StackActions.replace(...args));
};
const push = (...args: any) => {
  // @ts-ignore
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

///TabActions
const jumpTo = (...args: any) => {
  // @ts-ignore
  navigationRef.current?.dispatch(TabActions.jumpTo(...args));
};

///CustomActions
const resetTo = (name: string, index = 0) => {
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

  ///TabActions
  jumpTo,

  ///CustomActions
  resetTo,
};

///
// animation

export const forFade = ({current}: any) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
