import React, {useMemo} from 'react';
import {Pressable, SafeAreaView, StyleSheet, View} from 'react-native';
import {Appbar, IconButton, Text} from 'react-native-paper';
import {navigator} from '../../../helpers';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {deleteAccount} from '../../../stores/actions';
import {useDispatch, useSelector} from 'react-redux';

export const DetailAccountScreen = ({route}) => {
  const {accounts} = useSelector(({account}) => account);
  const dispatch = useDispatch();

  const account = useMemo(() => {
    return accounts.find(acc => acc.id === route.params.id);
  }, [accounts, route.params.id]);

  const theme = useTheme();

  const Header = () => (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <IconButton
        icon="close"
        mode="outlined"
        size={20}
        onPress={() => navigator.goBack()}
      />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Pressable
          onPress={() => navigator.navigate('add-account', account)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 50,
            paddingHorizontal: 16,
            height: 36,
            borderColor: theme.colors.outline,
          }}>
          <Icon name="wallet" color={theme.colors.onSurface} size={16} />
          <Text
            style={{
              marginLeft: 4,
            }}
            variant="labelMedium">
            {account.name}
          </Text>
        </Pressable>
        <IconButton
          icon="trash-can"
          mode="outlined"
          size={20}
          onPress={() => {
            dispatch(deleteAccount(account.id));
            navigator.goBack();
          }}
        />
      </View>
    </View>
  );
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}>
      <Header />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
