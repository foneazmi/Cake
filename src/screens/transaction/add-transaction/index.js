import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
  Modal,
  TextInput,
  Platform,
} from 'react-native';
import {Button, useTheme, IconButton, Text} from 'react-native-paper';
import CurrencyInput from 'react-native-currency-input';
import {useDispatch, useSelector} from 'react-redux';
import {addTransaction} from '../../../stores/actions';
import {currency, navigator} from '../../../helpers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const AddTransactionScreen = ({route}) => {
  const {type} = route.params;
  const theme = useTheme();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: '',
    description: '',
    amount: '',
  });

  const {accounts} = useSelector(({account}) => account);
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]?.id || '');

  const typeDescription = {
    income: 'Add Income',
    expense: 'Add Expense',
    transfer: 'Transfer Account',
  };

  const submitTransaction = () => {
    if (form.amount === '' || selectedAccount === '') {
      return;
    } else {
      dispatch(
        addTransaction({
          ...form,
          type,
          id: Date.now(),
          idAccount: selectedAccount,
        }),
      );
      navigator.goBack();
    }
  };
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
        size={24}
        onPress={() => navigator.goBack()}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderRadius: 50,
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderColor: theme.colors.outline,
        }}>
        <Icon
          name="credit-card-edit"
          color={theme.colors.onSurface}
          size={16}
        />
        <Text
          style={{
            marginLeft: 4,
          }}
          variant="labelLarge">
          {typeDescription[type] || ''}
        </Text>
      </View>
    </View>
  );

  const AccountList = () => {
    if (type === 'income' || type === 'expense') {
      return (
        <View
          style={{
            marginTop: 16,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              marginBottom: 12,
              marginLeft: 16,
            }}
            variant="labelLarge">
            {type === 'income' ? 'Add Money To' : 'Pay With'}
          </Text>
          <FlatList
            style={{paddingHorizontal: 16}}
            data={accounts}
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={
              accounts.length < 6 && (
                <Button
                  icon="wallet-plus"
                  mode="contained-tonal"
                  style={{marginRight: 8}}
                  onPress={() => navigator.navigate('add-account')}>
                  Add Account
                </Button>
              )
            }
            horizontal
            renderItem={({item}) => (
              <Button
                icon="wallet"
                mode={
                  selectedAccount === item.id ? 'contained' : 'contained-tonal'
                }
                style={{marginRight: 8}}
                onPress={() => setSelectedAccount(item.id)}>
                {item.name}
              </Button>
            )}
          />
        </View>
      );
    } else {
      return (
        <View
          style={{
            marginTop: 16,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              marginBottom: 12,
              marginLeft: 16,
            }}
            variant="labelLarge">
            From
          </Text>
          <FlatList
            data={accounts}
            style={{paddingHorizontal: 16}}
            showsHorizontalScrollIndicator={false}
            horizontal
            ListFooterComponent={
              accounts.length < 6 && (
                <Button
                  icon="wallet-plus"
                  mode="contained-tonal"
                  style={{marginRight: 8}}
                  onPress={() => navigator.navigate('add-account')}>
                  Add Account
                </Button>
              )
            }
            renderItem={({item}) => (
              <Button
                icon="wallet"
                mode={
                  selectedAccount === item.id ? 'contained' : 'contained-tonal'
                }
                style={{marginRight: 8}}
                onPress={() => setSelectedAccount(item.id)}>
                {item.name}
              </Button>
            )}
          />
          <Text
            style={{
              marginTop: 24,
              fontWeight: 'bold',
              marginBottom: 12,
            }}
            variant="labelLarge">
            To
          </Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={accounts}
            horizontal
            ListFooterComponent={
              accounts.length < 6 && (
                <Button
                  icon="wallet-plus"
                  mode="contained-tonal"
                  style={{marginRight: 8}}
                  onPress={() => navigator.navigate('add-account')}>
                  Add Account
                </Button>
              )
            }
            renderItem={({item}) => (
              <Button
                icon="wallet"
                mode={
                  selectedAccount === item.id ? 'contained' : 'contained-tonal'
                }
                style={{marginRight: 8}}
                onPress={() => setSelectedAccount(item.id)}>
                {item.name}
              </Button>
            )}
          />
        </View>
      );
    }
  };
  const Form = () => {
    const [modalFor, setModalFor] = useState('');
    const [modalText, setModalText] = useState('');
    const submitModal = () => {
      setForm({...form, [`${modalFor}`]: modalText});
      setModalFor('');
    };
    return (
      <View style={{padding: 16}}>
        <Pressable
          onPress={() => {
            setModalText(form.title || '');
            setModalFor('title');
          }}
          style={{
            flexDirection: 'row',
            borderRadius: 10,
            marginTop: 12,
            backgroundColor: theme.colors.secondaryContainer,
            paddingVertical: 16,
            paddingHorizontal: 24,
          }}>
          <Icon
            name="tag-text-outline"
            size={20}
            color={theme.colors.onSurface}
          />
          <Text
            style={{
              marginLeft: 8,
            }}
            variant="labelLarge">
            {form.title || 'Add title'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setModalText(form.description || '');
            setModalFor('description');
          }}
          style={{
            flexDirection: 'row',
            borderRadius: 10,
            marginTop: 12,
            backgroundColor: theme.colors.secondaryContainer,
            paddingVertical: 16,
            paddingHorizontal: 24,
          }}>
          <Icon name="text" size={20} color={theme.colors.onSurface} />
          <Text
            style={{
              marginLeft: 8,
            }}
            variant="labelLarge">
            {form.description || 'Add description'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setModalText(form.amount || '');
            setModalFor('amount');
          }}
          style={{
            flexDirection: 'row',
            borderRadius: 10,
            marginTop: 12,
            backgroundColor: theme.colors.secondaryContainer,
            paddingVertical: 16,
            paddingHorizontal: 24,
          }}>
          <Icon
            name="sort-numeric-variant"
            size={20}
            color={theme.colors.onSurface}
          />
          <Text
            style={{
              marginLeft: 8,
            }}
            variant="labelLarge">
            {form.amount ? currency(form.amount) : 'Add amount'}
          </Text>
        </Pressable>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalFor.length > 0}>
          <Pressable
            onPress={() => setModalFor('')}
            style={{
              flex: 1,
              backgroundColor: '#00000080',
            }}>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: theme.colors.secondaryContainer,
                paddingHorizontal: 16,
                paddingVertical: 32,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  marginBottom: 8,
                }}>
                {modalFor.toUpperCase()}
              </Text>
              {modalFor === 'amount' ? (
                <CurrencyInput
                  placeholderTextColor={theme.colors.onSecondaryContainer}
                  autoFocus
                  prefix="IDR "
                  placeholder="Input Here"
                  style={{
                    marginBottom: 32,
                    fontSize: 20,
                    color: theme.colors.onSecondaryContainer,
                  }}
                  onChangeValue={e => setModalText(e ? Math.abs(e) : '')}
                  value={modalText}
                  delimiter=","
                  separator="."
                  precision={0}
                />
              ) : (
                <TextInput
                  placeholderTextColor={theme.colors.onSecondaryContainer}
                  autoFocus
                  placeholder="Input Here"
                  style={{
                    marginBottom: 32,
                    fontSize: 20,
                    color: theme.colors.onSecondaryContainer,
                  }}
                  onChangeText={e => setModalText(e)}
                  value={modalText}
                />
              )}

              <Pressable
                style={{
                  borderRadius: 10,
                  padding: 16,
                  backgroundColor: theme.colors.primary,
                }}
                onPress={submitModal}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: theme.colors.onPrimary,
                  }}>
                  Save
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}>
      <Header />
      <View style={{flex: 1}}>
        <AccountList />
        <Form />
      </View>
      <Pressable
        style={{
          borderRadius: 10,
          marginHorizontal: 16,
          marginBottom: Platform.OS === 'ios' ? 0 : 16,
          padding: 16,
          backgroundColor: theme.colors.primary,
        }}
        onPress={submitTransaction}>
        <Text
          style={{
            textAlign: 'center',
            color: theme.colors.onPrimary,
          }}>
          Add Transaction
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
