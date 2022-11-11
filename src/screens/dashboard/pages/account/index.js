import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {statusBarHeight, currency, navigator} from '../../../../helpers';
import {useTheme, Button, FAB} from 'react-native-paper';

export const AccountPage = () => {
  const {accounts} = useSelector(({global}) => global);

  const [scrollY, setScrollY] = useState(0);
  const [showFab, setShowFab] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleLarge">Accounts</Text>
        <Text variant="labelLarge">{`Total : ${currency(10000000)}`}</Text>
      </View>
      <FlatList
        scrollEventThrottle={300}
        onScroll={({nativeEvent}) => {
          setScrollY(nativeEvent.contentOffset.y);
          if (nativeEvent.contentOffset.y <= 0) {
            setShowFab(true);
          } else {
            setShowFab(scrollY > nativeEvent.contentOffset.y);
          }
        }}
        data={accounts}
        keyExtractor={(_, index) => `account-${index}`}
        renderItem={({item}) => <Account {...item} />}
      />

      <FAB
        variant="secondary"
        icon="plus"
        visible={showFab}
        animated
        style={styles.fab}
        onPress={() => navigator.navigate('add-account')}
      />
    </View>
  );
};

const Account = props => {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.colors.surfaceVariant,
        marginHorizontal: 16,
        marginTop: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Button
          labelStyle={{
            fontWeight: 'bold',
          }}
          icon="wallet">
          {props.name}
        </Button>
      </View>
      <Text>
        <Text
          variant="headlineSmall"
          style={{
            textAlign: 'center',
            fontWeight: '600',
          }}>
          {currency(props.amount, {})}
        </Text>
        <Text
          variant="headlineSmall"
          style={{
            textAlign: 'center',
            fontWeight: '300',
          }}>
          {' IDR'}
        </Text>
      </Text>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 8,
          backgroundColor: theme.colors.surface,
          borderRadius: 10,
          padding: 4,
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <Text
            variant="labelMedium"
            style={{textAlign: 'center', fontWeight: 'bold'}}>
            Income This Month
          </Text>
          <Text
            variant="labelSmall"
            style={{textAlign: 'center', fontWeight: '400'}}>
            {currency(10000000)}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <Text
            variant="labelMedium"
            style={{textAlign: 'center', fontWeight: 'bold'}}>
            Expense This Month
          </Text>
          <Text
            variant="labelSmall"
            style={{textAlign: 'center', fontWeight: '400'}}>
            {currency(10000000)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: statusBarHeight,
    flex: 1,
  },
  header: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
