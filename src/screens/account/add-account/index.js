import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Pressable,
  Modal,
  Platform,
  TextInput,
} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {navigator} from '../../../helpers';
import {useTheme} from 'react-native-paper';
import CurrencyInput from 'react-native-currency-input';
import {useDispatch} from 'react-redux';
import {addAccount, updateAccount} from '../../../stores/actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const AddAccountScreen = ({route}) => {
  console.log(route.params);
  let {id = '', name = '', description = ''} = route.params;
  const theme = useTheme();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name,
    description,
  });

  const submit = () => {
    if (form.title === '') {
      return;
    } else {
      if (id === '') {
        dispatch(
          addAccount({
            ...form,
            id: Date.now(),
          }),
        );
      } else {
        dispatch(
          updateAccount(id, {
            ...form,
            id,
          }),
        );
      }
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
    </View>
  );

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
            setModalText(form.name || '');
            setModalFor('name');
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
            {form.name || 'Add name'}
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

        {/* <Pressable
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
        </Pressable> */}

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
                backgroundColor: theme.colors.background,
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
                  placeholderTextColor={theme.colors.onBackground}
                  autoFocus
                  prefix="IDR "
                  placeholder="Input Here"
                  style={{
                    marginBottom: 32,
                    fontSize: 20,
                    color: theme.colors.onBackground,
                  }}
                  onChangeValue={e => setModalText(e ? Math.abs(e) : '')}
                  value={modalText}
                  delimiter=","
                  separator="."
                  precision={0}
                />
              ) : (
                <TextInput
                  placeholderTextColor={theme.colors.onBackground}
                  autoFocus
                  placeholder="Input Here"
                  style={{
                    marginBottom: 32,
                    fontSize: 20,
                    color: theme.colors.onBackground,
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
        <Form />
      </View>
      <Pressable
        style={{
          borderRadius: 10,
          marginHorizontal: 16,
          marginBottom: Platform.OS === 'ios' ? 0 : 32,
          padding: 16,
          backgroundColor: theme.colors.primary,
        }}
        onPress={submit}>
        <Text
          style={{
            textAlign: 'center',
            color: theme.colors.onPrimary,
          }}>
          {id === '' ? 'Add Account' : 'Update Account'}
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
