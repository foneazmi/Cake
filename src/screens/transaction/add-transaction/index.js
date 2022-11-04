import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Appbar, Button, TextInput} from 'react-native-paper';
import {navigator} from '../../../helpers';
import {useTheme} from 'react-native-paper';
import CurrencyInput from 'react-native-currency-input';
import {useDispatch} from 'react-redux';
import {addAccount} from '../../../stores/actions';

export const AddTransactionScreen = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorAmount, setErrorAmount] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const submit = () => {
    if (name.length === 0) {
      setErrorName(true);
    } else {
      navigator.goBack();
      const data = {
        name,
        amount: amount || 0,
        id: Date.now(),
      };
      dispatch(addAccount(data));
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}>
      <Appbar.Header mode="small">
        <Appbar.BackAction
          onPress={() => {
            navigator.goBack();
          }}
        />
        <Appbar.Content title="Add Transaction" />
      </Appbar.Header>
      <View style={{padding: 8, flex: 1}}>
        <TextInput
          label="Name"
          value={name}
          error={errorName}
          onFocus={() => setErrorName(false)}
          onChangeText={setName}
        />
        <TextInput
          label="Amount"
          value={amount}
          onChangeValue={setAmount}
          error={errorAmount}
          onFocus={() => setErrorAmount(false)}
          left={<TextInput.Affix text="Rp." />}
          render={props => (
            <CurrencyInput
              {...props}
              delimiter=","
              separator="."
              precision={0}
            />
          )}
        />
      </View>
      <View style={{marginBottom: 32, marginHorizontal: 16}}>
        <Button icon="wallet" mode="contained-tonal" onPress={submit}>
          Add New Transaction
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
