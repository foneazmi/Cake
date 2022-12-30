import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Pressable,
  Platform,
} from 'react-native';
import {useTheme, IconButton, Text} from 'react-native-paper';
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
import {AccountList} from './account-list';
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

  const [form, setForm] = useState({
    title,
    description,
    amount,
    tag,
    date: date === '' ? Date.now() : date,
  });

  const {activeAccounts} = useSelector(getAccounts);
  const [selectedAccount, setSelectedAccount] = useState(
    idAccount || activeAccounts[0]?.id,
  );

  const [selectedToAccount, setSelectedToAccount] = useState(
    idAccount2 ? idAccount2 : type === 'transfer' ? activeAccounts[1]?.id : '',
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

  const Form = () => {
    const [modal, setModal] = useState({});
    const submitModal = (attribute, value) => {
      if (attribute || value) {
        setForm({...form, [`${attribute}`]: value});
      }
      setModal({});
    };
    return (
      <View style={styles.formContainer}>
        {/* <FormInput
          onPress={() => {
            setModal({
              type: 'tag-list',
              name: 'tag',
              title: 'Tag',
              value: form.tag || '',
              onSubmit: submitModal,
              visible: true,
            });
          }}
          icon="tag-text-outline"
          title={form.title || 'Add Tag'}
        /> */}
        <FormInput
          onPress={() =>
            setModal({
              type: 'date',
              name: 'date',
              title: '',
              value: form.date,
              onSubmit: submitModal,
              visible: true,
            })
          }
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
        <AccountList
          type={type}
          activeAccounts={activeAccounts}
          selectedAccount={selectedAccount}
          selectedToAccount={selectedToAccount}
          onPressAccount={selectedId => {
            if (selectedToAccount === selectedId) {
              setSelectedToAccount('');
            }
            setSelectedAccount(selectedId);
          }}
          onPressToAccount={selectedId => {
            setSelectedToAccount(selectedId);
          }}
        />
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
