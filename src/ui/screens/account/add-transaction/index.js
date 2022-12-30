import React, {useState, useMemo} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Pressable,
  Platform,
} from 'react-native';
import {useTheme, IconButton, Text, Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  addTransaction,
  deleteTransaction,
  setDialog,
  updateTransaction,
} from '../../../../stores/actions';
import {currency, navigator} from '../../../../helpers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {registerTranslation, en} from 'react-native-paper-dates';
import moment from 'moment';
import {getAccounts} from '../../../../stores/selector';
import {FormInput, ModalInput} from '../../../components/input';

registerTranslation('en', en);

export const AddTransactionScreen = ({route}) => {
  const {
    id = '',

    title = '',
    description = '',
    tag = '',
    date = '',
    amount = '',
    idAccount = '',
    idAccount2 = '',

    type,
  } = route?.params || {};
  const theme = useTheme();
  const dispatch = useDispatch();

  const {activeAccounts} = useSelector(getAccounts);
  const {tags} = useSelector(({account}) => account);

  const [form, setForm] = useState({
    idAccount: idAccount
      ? idAccount
      : activeAccounts.length > 0
      ? activeAccounts[0].id
      : '',
    idAccount2,
    title,
    description,
    amount,
    tag,
    date: date === '' ? Date.now() : date,
  });

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
      form.idAccount === '' ||
      (type === 'transfer' && form.idAccount2 === '')
    ) {
      dispatch(
        setDialog({
          description: 'Account cannot be empty!',
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

  const Form = () => {
    const [modal, setModal] = useState({});
    const submitModal = (attribute, value) => {
      if (attribute || value) {
        if (
          type === 'transfer' &&
          attribute === 'idAccount' &&
          value === form.idAccount2
        ) {
          setForm({...form, [`${attribute}`]: value, idAccount2: ''});
        } else {
          setForm({...form, [`${attribute}`]: value});
        }
      }
      setModal({});
    };
    const selectedTag = useMemo(() => tags.find(e => e.id === form.tag), []);

    const selectedAccount = useMemo(
      () => activeAccounts.find(account => account.id === form.idAccount),
      [],
    );
    const selectedAccount2 = useMemo(
      () => activeAccounts.find(account => account.id === form.idAccount2),
      [],
    );

    return (
      <View style={styles.formContainer}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  marginBottom: 8,
                }}
                variant="labelLarge">
                {type === 'transfer'
                  ? 'From'
                  : type === 'income'
                  ? 'Add Money To'
                  : 'Pay with'}
              </Text>
              <Button
                icon="wallet-outline"
                mode={selectedAccount?.id ? 'contained' : 'contained-tonal'}
                style={{
                  marginRight: 8,
                }}
                onPress={() => {
                  setModal({
                    type: 'account-select',
                    name: 'idAccount',
                    title: 'Select Account',
                    value: form.idAccount || '',
                    onSubmit: submitModal,
                    visible: true,
                  });
                }}>
                {selectedAccount?.name || 'Select Account'}
              </Button>
            </View>
          </View>
          {type === 'transfer' && (
            <View style={{flexDirection: 'row', flex: 1}}>
              <View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    marginBottom: 8,
                  }}
                  variant="labelLarge">
                  To
                </Text>
                <Button
                  icon="wallet-outline"
                  mode={selectedAccount2?.id ? 'contained' : 'contained-tonal'}
                  style={{
                    marginRight: 8,
                  }}
                  onPress={() => {
                    setModal({
                      type: 'account-select',
                      name: 'idAccount2',
                      title: 'Select Account',
                      value: form.idAccount2 || '',
                      onSubmit: submitModal,
                      disableItem: form.idAccount || '',
                      visible: true,
                    });
                  }}>
                  {selectedAccount2?.name || 'Select Account'}
                </Button>
              </View>
            </View>
          )}
        </View>
        <View style={{flexDirection: 'row', marginVertical: 16}}>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                marginBottom: 8,
              }}
              variant="labelLarge">
              Add Tag
            </Text>
            <Button
              icon="tag-outline"
              mode={selectedTag?.id ? 'contained' : 'contained-tonal'}
              style={{
                marginRight: 8,
              }}
              onPress={() => {
                setModal({
                  type: 'tag-select',
                  name: 'tag',
                  title: 'Select Tag',
                  value: form.tag || '',
                  onSubmit: submitModal,
                  visible: true,
                });
              }}>
              {selectedTag?.name || 'Select Tag'}
            </Button>
          </View>
        </View>
        <FormInput
          onPress={() => {
            setModal({
              type: 'date',
              name: 'date',
              title: '',
              value: form.date,
              onSubmit: submitModal,
              visible: true,
            });
          }}
          icon="calendar"
          title={moment(form.date).format('D MMM Y') || 'Add description'}
        />
        <FormInput
          onPress={() => {
            setModal({
              type: 'text',
              name: 'title',
              title: 'Title',
              value: form.title || '',
              onSubmit: submitModal,
              visible: true,
            });
          }}
          icon="card-text"
          title={form.title || 'Add title'}
        />
        <FormInput
          onPress={() => {
            setModal({
              type: 'text',
              name: 'description',
              title: 'Description',
              value: form.description || '',
              onSubmit: submitModal,
              visible: true,
            });
          }}
          icon="card-text-outline"
          title={form.description || 'Add description'}
        />
        <FormInput
          onPress={() => {
            setModal({
              type: 'currency',
              name: 'amount',
              title: 'Amount',
              value: form.amount || '',
              onSubmit: submitModal,
              visible: true,
            });
          }}
          icon="sort-numeric-variant"
          title={form.amount ? currency(form.amount) : 'Add amount'}
        />
        <ModalInput {...modal} />
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
  //////
  submitContainer: {
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: Platform.OS === 'ios' ? 0 : 32,
    padding: 16,
  },
  submitText: {
    textAlign: 'center',
  },
});
