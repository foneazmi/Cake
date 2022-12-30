import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Pressable,
  Platform,
} from 'react-native';
import {IconButton, Text, useTheme, SegmentedButtons} from 'react-native-paper';
import {navigator} from '../../../../helpers';
import {useDispatch, useSelector} from 'react-redux';
import {addAccount, setDialog, updateAccount} from '../../../../stores/actions';
import {getFeatures} from '../../../../stores/selector';
import {FormInput, ModalInput} from '../../../components/input';

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
    const {accountType} = useSelector(getFeatures);
    const [modal, setModal] = useState({});
    const submitModal = (attribute, value) => {
      if (attribute || value) {
        setForm({...form, [`${attribute}`]: value});
      }
      setModal({});
    };
    return (
      <View style={styles.formContainer}>
        {accountType && (
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

        <FormInput
          onPress={() => {
            setModal({
              type: 'text',
              name: 'name',
              title: 'Name',
              value: form.name || '',
              onSubmit: submitModal,
              visible: true,
            });
          }}
          icon="card-text"
          title={form.name || 'Add name'}
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
