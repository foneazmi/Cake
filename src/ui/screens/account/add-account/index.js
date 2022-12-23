import React, {useState, useMemo} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Pressable,
  Modal,
  Platform,
  TextInput,
} from 'react-native';
import {IconButton, Text, useTheme, SegmentedButtons} from 'react-native-paper';
import {navigator} from '../../../../helpers';
import CurrencyInput from 'react-native-currency-input';
import {useDispatch, useSelector} from 'react-redux';
import {addAccount, setDialog, updateAccount} from '../../../../stores/actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const AddAccountScreen = ({route}) => {
  let {
    id = '',
    name = '',
    description = '',
    type = 'cash',
  } = route?.params || {};

  const theme = useTheme();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    type,
    name,
    description,
  });

  const submit = () => {
    if (form.name === '') {
      dispatch(
        setDialog({
          description: 'Account name cannot empty!',
          actions: [
            {
              title: 'OK',
            },
          ],
        }),
      );
      return;
    } else {
      if (id === '') {
        dispatch(
          addAccount({
            ...form,
            id: Date.now(),
            updatedAt: Date.now(),
          }),
        );
      } else {
        dispatch(
          updateAccount(id, {
            ...form,
            id,
            updatedAt: Date.now(),
          }),
        );
      }
      navigator.goBack();
    }
  };

  const Header = () => (
    <View style={styles.headerContainer}>
      <IconButton
        icon="close"
        mode="outlined"
        size={24}
        onPress={() => navigator.goBack()}
      />
    </View>
  );

  const Form = () => {
    const {features} = useSelector(({account}) => account);
    const [modalFor, setModalFor] = useState('');
    const [modalText, setModalText] = useState('');
    const submitModal = () => {
      setForm({...form, [`${modalFor}`]: modalText});
      setModalFor('');
    };

    const isAccountTypeFeature = useMemo(
      () =>
        features?.find(feature => {
          return feature.name === 'account-type';
        })?.active || false,
      [features],
    );
    return (
      <View style={styles.formContainer}>
        {isAccountTypeFeature && (
          <SegmentedButtons
            value={form.type}
            onValueChange={value => {
              setForm({...form, type: value});
            }}
            buttons={[
              {
                value: 'cash',
                label: 'Cash',
              },
              {
                value: 'invest',
                label: 'Invest',
              },
              {
                value: 'loan',
                label: 'Loan',
              },
            ]}
            style={styles.segmentContainer}
          />
        )}
        <Pressable
          onPress={() => {
            setModalText(form.name || '');
            setModalFor('name');
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
            {form.name || 'Add name'}
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

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalFor.length > 0}>
          <Pressable
            onPress={() => setModalFor('')}
            style={styles.modalContainer}>
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
        onPress={submit}>
        <Text
          style={[
            styles.submitText,
            {
              color: theme.colors.onPrimary,
            },
          ]}>
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
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
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
});
