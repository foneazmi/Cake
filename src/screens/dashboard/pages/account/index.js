import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSelector} from 'react-redux';
import {currency, navigator} from '../../../../helpers';
import {useTheme, FAB, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const AccountPage = () => {
  const {accounts} = useSelector(({global}) => global);

  const [scrollY, setScrollY] = useState(0);
  const [showFab, setShowFab] = useState(true);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleLarge" style={{fontWeight: 'bold'}}>
          Accounts
        </Text>
        <Text variant="titleSmall">{`Total : ${currency(10000000)}`}</Text>
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
      {accounts.length < 6 && (
        <FAB
          variant="secondary"
          icon="plus"
          visible={showFab}
          animated
          style={styles.fab}
          onPress={() => navigator.navigate('add-account')}
        />
      )}
    </SafeAreaView>
  );
};

const Account = props => {
  const theme = useTheme();
  return (
    <TouchableWithoutFeedback
      onPress={() => navigator.navigate('detail-account', props)}>
      <View
        style={{
          backgroundColor: theme.colors.surfaceVariant,
          marginHorizontal: 16,
          marginTop: 16,
          padding: 16,
          borderRadius: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="wallet" size={24} color={theme.colors.onBackground} />
          <Text
            style={{marginLeft: 4, fontWeight: 'bold'}}
            variant="titleMedium">
            {props.name}
          </Text>
        </View>
        <Text
          variant="headlineSmall"
          style={{
            marginVertical: 12,
            textAlign: 'center',
            fontWeight: '600',
          }}>
          {currency(props.amount)}
        </Text>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: theme.colors.surface,
              borderRadius: 10,
              padding: 4,
              marginRight: 4,
            }}>
            <Text
              variant="labelMedium"
              style={{textAlign: 'center', fontWeight: 'bold'}}>
              Income This Month
            </Text>
            <Text
              variant="labelSmall"
              style={{textAlign: 'center', fontWeight: '400'}}>
              {currency(0)}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              borderRadius: 10,
              padding: 4,
              marginLeft: 4,
              backgroundColor: theme.colors.surface,
            }}>
            <Text
              variant="labelMedium"
              style={{textAlign: 'center', fontWeight: 'bold'}}>
              Expense This Month
            </Text>
            <Text
              variant="labelSmall"
              style={{textAlign: 'center', fontWeight: '400'}}>
              {currency(0)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
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
