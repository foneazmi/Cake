import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Appbar, Button, TextInput} from 'react-native-paper';
import {navigator} from '../../../helpers';
import {useTheme} from 'react-native-paper';
import CurrencyInput from 'react-native-currency-input';
import {useDispatch} from 'react-redux';
import {addAccount} from '../../../stores/actions';

export const AddAccountScreen = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();

  const submit = () => {
    if (name.length === 0) {
      setError(true);
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
        <Appbar.Content title="Add Account" />
      </Appbar.Header>
      <View style={{padding: 8, flex: 1}}>
        <TextInput
          label="Name Account"
          value={name}
          error={error}
          onFocus={() => setError(false)}
          onChangeText={setName}
          left={<TextInput.Affix text="@ " />}
        />
        <TextInput
          label="Initial Amount"
          value={amount}
          onChangeValue={setAmount}
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

        {/* <CurrencyInput
          value={amount}
          onChangeValue={setAmount}
          prefix="$"
          delimiter=","
          separator="."
          precision={2}
          onChangeText={formattedValue => {
            console.log(formattedValue); // $2,310.46
          }}
        /> */}
      </View>
      <View style={{marginBottom: 32, marginHorizontal: 16}}>
        <Button icon="wallet" mode="contained-tonal" onPress={submit}>
          Save New Account
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
