import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Pressable, Modal, TextInput} from 'react-native';
import {useTheme, Text} from 'react-native-paper';
import CurrencyInput from 'react-native-currency-input';
import {
  DatePickerModal,
  registerTranslation,
  en,
} from 'react-native-paper-dates';
import moment from 'moment';
import {height, width, navigator} from '../../../helpers';
import {FlashList} from '@shopify/flash-list';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

registerTranslation('en', en);

export const ModalInput = ({
  type = '',
  name = '',
  title = '',
  value = '',
  onSubmit = () => {},
  visible = false,
}) => {
  const [valueForm, setValueForm] = useState('');
  const [query, setQuery] = useState('');
  const {tags} = useSelector(({account}) => account);

  useEffect(() => {
    setValueForm(value);
  }, [value]);

  const theme = useTheme();
  switch (type) {
    case 'text':
      return (
        <Modal animationType="fade" transparent={true} visible={visible}>
          <Pressable
            onPress={() => {
              onSubmit(name, valueForm);
              setValueForm('');
            }}
            style={styles.modalContainer}>
            <View
              style={[
                styles.modalContentContainer,
                {
                  backgroundColor: theme.colors.background,
                },
              ]}>
              <Text style={styles.modalFormTitle}>{title}</Text>
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
                onChangeText={val => setValueForm(val)}
                value={valueForm}
              />

              <Pressable
                style={[
                  styles.modalSubmitContainer,
                  {
                    backgroundColor: theme.colors.primary,
                  },
                ]}
                onPress={() => {
                  onSubmit(name, valueForm);
                  setValueForm('');
                }}>
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
      );

    case 'currency':
      return (
        <Modal animationType="fade" transparent={true} visible={visible}>
          <Pressable
            onPress={() => {
              onSubmit(name, valueForm);
              setValueForm('');
            }}
            style={styles.modalContainer}>
            <View
              style={[
                styles.modalContentContainer,
                {
                  backgroundColor: theme.colors.background,
                },
              ]}>
              <Text style={styles.modalFormTitle}>{title}</Text>

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
                onChangeValue={e => setValueForm(e ? Math.abs(e) : '')}
                value={valueForm}
                delimiter=","
                separator="."
                precision={0}
              />

              <Pressable
                style={[
                  styles.modalSubmitContainer,
                  {
                    backgroundColor: theme.colors.primary,
                  },
                ]}
                onPress={() => {
                  onSubmit(name, valueForm);
                  setValueForm('');
                }}>
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
      );

    case 'date':
      return (
        <DatePickerModal
          locale="en"
          mode="single"
          visible={visible}
          onDismiss={() => onSubmit()}
          date={new Date(value)}
          onConfirm={params => {
            onSubmit(name, moment(params.date).valueOf());
          }}
        />
      );

    case 'tag-select':
      return (
        <Modal
          transparent
          visible={visible}
          animationType="fade"
          statusBarTranslucent>
          <Pressable
            onPress={() => onSubmit()}
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              backgroundColor: '#00000080',
            }}>
            <View
              style={{
                width,
                height: height / 2,
                padding: 24,
                borderRadius: 10,
                backgroundColor: theme.colors.background,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                }}
                variant="titleMedium">
                {title}
              </Text>

              <TextInput
                placeholder="Search here"
                onChangeText={setQuery}
                value={query}
                placeholderTextColor={theme.colors.secondaryContainer}
                style={{
                  paddingVertical: 16,
                  paddingHorizontal: 24,
                  marginTop: 12,
                  borderColor: theme.colors.onSecondaryContainer,
                  borderWidth: 1,
                  borderRadius: 10,
                  color: theme.colors.onBackground,
                }}
              />

              <FlashList
                estimatedItemSize={20}
                showsVerticalScrollIndicator={false}
                data={
                  query ? tags.filter(tag => tag.name.includes(query)) : tags
                }
                keyExtractor={(_, index) => `tag-${index}`}
                ListFooterComponent={
                  <Pressable
                    onPress={() => {
                      onSubmit();
                      navigator.navigate('add-tag');
                    }}
                    style={{
                      backgroundColor: theme.colors.secondaryContainer,
                      flexDirection: 'row',
                      borderRadius: 10,
                      marginTop: 12,
                      paddingVertical: 16,
                      paddingHorizontal: 24,
                    }}>
                    <Icon
                      name="tag-plus"
                      size={20}
                      color={theme.colors.onSurface}
                    />

                    <Text
                      style={{
                        marginLeft: 8,
                        color: theme.colors.onSurface,
                      }}
                      variant="labelLarge">
                      Add new tag
                    </Text>
                  </Pressable>
                }
                renderItem={({item}) => (
                  <Pressable
                    onPress={() => {
                      onSubmit(name, item.id);
                    }}
                    style={[
                      {
                        backgroundColor: theme.colors.secondaryContainer,
                        flexDirection: 'row',
                        borderRadius: 10,
                        marginTop: 12,
                        paddingVertical: 16,
                        paddingHorizontal: 24,
                      },
                      value === item.id && {
                        backgroundColor: theme.colors.primary,
                      },
                    ]}>
                    <Icon
                      name="tag-outline"
                      size={20}
                      color={
                        value === item.id
                          ? theme.colors.onPrimary
                          : theme.colors.onSecondaryContainer
                      }
                    />
                    <Text
                      style={[
                        {
                          marginLeft: 8,
                          color: theme.colors.onSurface,
                        },

                        value === item.id && {
                          color: theme.colors.onPrimary,
                        },
                      ]}
                      variant="labelLarge">
                      {item.name}
                    </Text>
                  </Pressable>
                )}
              />
            </View>
          </Pressable>
        </Modal>
      );

    default:
      return <></>;
  }
};

const styles = StyleSheet.create({
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
});