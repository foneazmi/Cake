import {Dimensions, Platform, StatusBar} from 'react-native';

export const {height, width} = Dimensions.get('screen');

export const isIphoneWithNotch = () => {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 780 ||
      width === 780 ||
      height === 812 ||
      width === 812 ||
      height === 844 ||
      width === 844 ||
      height === 896 ||
      width === 896 ||
      height === 926 ||
      width === 926)
  );
};

export const statusBarHeight = Platform.select({
  ios: isIphoneWithNotch() ? 44 : 28,
  android: StatusBar.currentHeight + 8,
  default: 0,
});
