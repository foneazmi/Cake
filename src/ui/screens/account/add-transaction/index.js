import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Pressable,
  Modal,
  TextInput,
  Platform,
} from 'react-native';
import {Button, useTheme, IconButton, Text} from 'react-native-paper';
import CurrencyInput from 'react-native-currency-input';
import {useDispatch, useSelector} from 'react-redux';
import {
  addTransaction,
  deleteTransaction,
  setDialog,
  updateTransaction,
} from '../../../../stores/actions';
import {currency, navigator} from '../../../../helpers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  DatePickerModal,
  registerTranslation,
  en,
} from 'react-native-paper-dates';
import moment from 'moment';
import {FlashList} from '@shopify/flash-list';

registerTranslation('en', en);
export const AddTransactionScreen = ({route}) => {
  const {
    amount = '',
    description = '',
    id = '',
    idAccount = '',
    idAccount2 = '',
    title = '',
    date = '',
    type,
  } = route?.params || {};
  const theme = useTheme();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title,
    description,
    amount,
    date: date === '' ? Date.now() : date,
  });

  const {accounts} = useSelector(({account}) => account);
  const [selectedAccount, setSelectedAccount] = useState(
    idAccount || accounts[0]?.id,
  );

  const [selectedToAccount, setSelectedToAccount] = useState(
    idAccount2 || type === 'transfer' ? accounts[1]?.id : '',
  );

  const typeDescription = {
    income: 'Add Income',
    expense: 'Add Expense',
    transfer: 'Transfer Account',
  };

  const submitTransaction = () => {
    if (form.amount === '') {
      dispatch(
        setDialog({
          description: 'Amount cannot empty!',
          actions: [
            {
              title: 'OK',
            },
          ],
        }),
      );
      return;
    } else if (
      selectedAccount === '' ||
      selectedAccount === undefined ||
      (type === 'transfer' && selectedToAccount === '')
    ) {
      dispatch(
        setDialog({
          description: 'Please select account first!',
          actions: [
            {
              title: 'OK',
            },
          ],
        }),
      );
      return;
    } else {
      const payload = {
        ...form,
        type,
        id,
        updatedAt: Date.now(),
        idAccount: selectedAccount,
        idAccount2: selectedToAccount,
      };
      if (id === '') {
        dispatch(addTransaction(payload));
      } else {
        dispatch(updateTransaction(id, payload));
      }
      navigator.goBack();
    }
  };

  const deleteTransactionDialog = () => {
    dispatch(
      setDialog({
        title: 'Delete Transaction',
        description: 'Do you want to delete this transaction ?',
        actions: [
          {
            title: 'No',
          },
          {
            title: 'Yes',
            onPress: () => {
              dispatch(deleteTransaction(id));
              navigator.goBack();
            },
          },
        ],
      }),
    );
  };

  const Header = () => (
    <View style={styles.headerContainer}>
      <IconButton
        icon="close"
        mode="outlined"
        size={20}
        onPress={() => navigator.goBack()}
      />
      <View style={styles.headerActionContainer}>
        <View
          style={[
            styles.headerActionEditContainer,
            {
              borderColor: theme.colors.outline,
            },
          ]}>
          <Icon
            name="credit-card-edit"
            color={theme.colors.onSurface}
            size={16}
          />
          <Text style={styles.headerActionEditText} variant="labelMedium">
            {typeDescription[type] || ''}
          </Text>
        </View>
        {id && (
          <IconButton
            icon="trash-can"
            mode="outlined"
            size={20}
            onPress={deleteTransactionDialog}
          />
        )}
      </View>
    </View>
  );

  const AccountList = () => {
    if (type === 'income' || type === 'expense') {
      return (
        <View>
          <Text style={styles.accountListTitle} variant="labelLarge">
            {type === 'income' ? 'Add Money To' : 'Pay With'}
          </Text>
          <FlashList
            estimatedItemSize={100}
            contentContainerStyle={styles.accountListContainer}
            data={accounts.filter(account => !account.archivedAt)}
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={
              <Button
                icon="wallet-plus"
                mode="contained-tonal"
                style={styles.accountItemContainer}
                onPress={() => navigator.navigate('add-account')}>
                Add Account
              </Button>
            }
            horizontal
            renderItem={({item}) => (
              <Button
                icon="wallet"
                mode={
                  selectedAccount === item.id ? 'contained' : 'contained-tonal'
                }
                style={styles.accountItemContainer}
                onPress={() => setSelectedAccount(item.id)}>
                {item.name}
              </Button>
            )}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.accountListTitle} variant="labelLarge">
            From
          </Text>
          <FlashList
            estimatedItemSize={100}
            data={accounts}
            contentContainerStyle={styles.accountListContainer}
            showsHorizontalScrollIndicator={false}
            horizontal
            ListFooterComponent={
              <Button
                icon="wallet-plus"
                mode="contained-tonal"
                style={styles.accountItemContainer}
                onPress={() => navigator.navigate('add-account')}>
                Add Account
              </Button>
            }
            renderItem={({item}) => (
              <Button
                icon="wallet"
                mode={
                  selectedAccount === item.id ? 'contained' : 'contained-tonal'
                }
                style={styles.accountItemContainer}
                onPress={() => {
                  if (selectedToAccount === item.id) {
                    setSelectedToAccount('');
                  }
                  setSelectedAccount(item.id);
                }}>
                {item.name}
              </Button>
            )}
          />
          <Text style={styles.accountListTitle} variant="labelLarge">
            To
          </Text>
          <FlashList
            estimatedItemSize={100}
            showsHorizontalScrollIndicator={false}
            data={accounts}
            contentContainerStyle={styles.accountListContainer}
            horizontal
            ListFooterComponent={
              <Button
                icon="wallet-plus"
                mode="contained-tonal"
                style={styles.accountItemContainer}
                onPress={() => navigator.navigate('add-account')}>
                Add Account
              </Button>
            }
            renderItem={({item}) => (
              <Button
                disabled={selectedAccount === item.id}
                icon="wallet"
                mode={
                  selectedToAccount === item.id
                    ? 'contained'
                    : 'contained-tonal'
                }
                style={styles.accountItemContainer}
                onPress={() => setSelectedToAccount(item.id)}>
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
    const [open, setOpen] = React.useState(false);

    const submitModal = () => {
      setForm({...form, [`${modalFor}`]: modalText});
      setModalFor('');
    };

    const onConfirmSingle = React.useCallback(
      params => {
        setOpen(false);
        setForm({...form, date: moment(params.date).valueOf()});
      },
      [setOpen],
    );

    return (
      <View style={styles.formContainer}>
        <Pressable
          onPress={() => {
            setOpen(true);
            // setModalText(form.description || '');
            // setModalFor('description');
          }}
          style={[
            styles.formInputContainer,
            {
              backgroundColor: theme.colors.secondaryContainer,
            },
          ]}>
          <Icon name="calendar" size={20} color={theme.colors.onSurface} />
          <Text
            style={[
              styles.formText,
              {
                color: theme.colors.onSurface,
              },
            ]}
            variant="labelLarge">
            {moment(form.date).format('D MMM Y') || 'Add description'}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setModalText(form.title || '');
            setModalFor('title');
          }}
          style={[
            styles.formInputContainer,
            {
              backgroundColor: theme.colors.secondaryContainer,
            },
          ]}>
          <Icon
            name="tag-text-outline"
            size={20}
            color={theme.colors.onSurface}
          />
          <Text
            style={[
              styles.formText,
              {
                color: theme.colors.onSurface,
              },
            ]}
            variant="labelLarge">
            {form.title || 'Add title'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setModalText(form.description || '');
            setModalFor('description');
          }}
          style={[
            styles.formInputContainer,
            {
              backgroundColor: theme.colors.secondaryContainer,
            },
          ]}>
          <Icon name="text" size={20} color={theme.colors.onSurface} />
          <Text
            style={[
              styles.formText,
              {
                color: theme.colors.onSurface,
              },
            ]}
            variant="labelLarge">
            {form.description || 'Add description'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setModalText(form.amount || '');
            setModalFor('amount');
          }}
          style={[
            styles.formInputContainer,
            {
              backgroundColor: theme.colors.secondaryContainer,
            },
          ]}>
          <Icon
            name="sort-numeric-variant"
            size={20}
            color={theme.colors.onSurface}
          />
          <Text
            style={[
              styles.formText,
              {
                color: theme.colors.onSurface,
              },
            ]}
            variant="labelLarge">
            {form.amount ? currency(form.amount) : 'Add amount'}
          </Text>
        </Pressable>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalFor.length > 0}>
          <Pressable onPress={submitModal} style={styles.modalContainer}>
            <View
              style={[
                styles.modalContentContainer,
                {
                  backgroundColor: theme.colors.background,
                },
              ]}>
              <Text style={styles.modalFormTitle}>
                {modalFor.toUpperCase()}
              </Text>
              {modalFor === 'amount' ? (
                <CurrencyInput
                  placeholderTextColor={theme.colors.onBackground}
                  autoFocus
                  prefix="IDR "
                  placeholder="Input Here"
                  style={[
                    styles.modalFormInput,
                    {
                      color: theme.colors.onBackground,
                    },
                  ]}
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
                  style={[
                    styles.modalFormInput,
                    {
                      color: theme.colors.onBackground,
                    },
                  ]}
                  onChangeText={e => setModalText(e)}
                  value={modalText}
                />
              )}

              <Pressable
                style={[
                  styles.modalSubmitContainer,
                  {
                    backgroundColor: theme.colors.primary,
                  },
                ]}
                onPress={submitModal}>
                <Text
                  style={[
                    styles.modalSubmitText,
                    {
                      color: theme.colors.onPrimary,
                    },
                  ]}>
                  Save
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>

        <DatePickerModal
          locale="en"
          mode="single"
          visible={open}
          onDismiss={() => setOpen(false)}
          date={new Date(form.date)}
          onConfirm={onConfirmSingle}
          validRange={{
            startDate: new Date(2021, 1, 2),
            endDate: new Date(),
          }}
        />
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
      <View style={styles.container}>
        <AccountList />
        <Form />
      </View>
      <Pressable
        style={[
          styles.submitContainer,
          {
            backgroundColor: theme.colors.primary,
          },
        ]}
        onPress={submitTransaction}>
        <Text
          style={[
            styles.submitText,
            {
              color: theme.colors.onPrimary,
            },
          ]}>
          {id === '' ? 'Add Transaction' : 'Update Transaction'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ///////
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerActionEditContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 16,
    height: 36,
  },
  headerActionEditText: {
    marginLeft: 8,
  },
  /////
  formContainer: {
    padding: 16,
  },
  segmentContainer: {
    alignSelf: 'center',
  },
  formInputContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  formText: {
    marginLeft: 8,
  },
  //////
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000080',
  },
  modalContentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  modalFormTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalFormInput: {
    marginBottom: 32,
    fontSize: 20,
  },
  modalSubmitContainer: {
    borderRadius: 10,
    padding: 16,
  },
  modalSubmitText: {
    textAlign: 'center',
  },
  ///
  submitContainer: {
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: Platform.OS === 'ios' ? 0 : 32,
    padding: 16,
  },
  submitText: {
    textAlign: 'center',
  },
  ////
  accountListTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 20,
    marginLeft: 16,
  },
  accountListContainer: {
    paddingHorizontal: 16,
  },
  accountItemContainer: {
    marginRight: 8,
  },
});
