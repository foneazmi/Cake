import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import {Appbar, List, Text} from 'react-native-paper';
import {navigator} from 'cake/src/helpers';
import {useTheme} from 'react-native-paper';
import {setDarkMode, backupData, resetAll} from 'cake/src/stores/actions';
import {useDispatch, useSelector} from 'react-redux';
import {getReadableVersion} from 'react-native-device-info';

export const SettingScreen = () => {
  const [{darkMode}, {sync}] = useSelector(({global, account}) => [
    global,
    account,
  ]);
  const dispatch = useDispatch();
  const theme = useTheme();

  const [modalSync, setModalSync] = useState(false);
  const [modalSyncText, setModalSyncText] = useState('');
  const containerStyle = [
    styles.container,
    {
      backgroundColor: theme.colors.background,
    },
  ];

  return (
    <View style={containerStyle}>
      <Appbar.Header mode="small">
        <Appbar.BackAction
          onPress={() => {
            navigator.goBack();
          }}
        />
        <Appbar.Content title="Settings" />
      </Appbar.Header>

      <ScrollView>
        <List.Section>
          <List.Subheader>Themes</List.Subheader>
          <List.Item
            onPress={() => {
              dispatch(setDarkMode(!darkMode));
            }}
            title="Dark Mode"
            description="Press to change mode"
            right={props => (
              <List.Icon
                {...props}
                icon={darkMode ? 'brightness-7' : 'brightness-4'}
              />
            )}
          />
        </List.Section>

        <List.Section>
          <List.Subheader>Sync</List.Subheader>
          <List.Item
            onPress={() => {
              if (sync) {
                dispatch(backupData());
              } else {
                setModalSync(true);
              }
            }}
            title="Sync Data"
            description="Sync Data to server"
            right={props => <List.Icon {...props} icon="code-braces" />}
          />
        </List.Section>
        {__DEV__ && (
          <List.Section>
            <List.Subheader>Developer Mode</List.Subheader>
            <List.Item
              onPress={() => {
                dispatch(resetAll());
              }}
              title="Factory Reset"
              description="Delete All Saved Data"
              right={props => <List.Icon {...props} icon="information-off" />}
            />
            {/* <List.Item
            onPress={() => {
              dispatch(setTemplateData());
            }}
            title="Set Template Data"
            description=""
            right={props => <List.Icon {...props} icon="information-off" />}
          /> */}
          </List.Section>
        )}
        <Text
          variant="labelSmall"
          style={
            styles.versionText
          }>{`App Version ${getReadableVersion()}`}</Text>
      </ScrollView>

      <Modal animationType="fade" transparent={true} visible={modalSync}>
        <Pressable
          onPress={() => setModalSync(false)}
          style={styles.modalContainer}>
          <View
            style={[
              styles.modalContentContainer,
              {
                backgroundColor: theme.colors.background,
              },
            ]}>
            <Text style={styles.modalFormTitle}>Sync code</Text>
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
              onChangeText={e => setModalSyncText(e)}
              value={modalSyncText}
            />
            <Pressable
              style={[
                styles.modalSubmitContainer,
                {
                  backgroundColor: theme.colors.primary,
                },
              ]}
              onPress={() => {
                if (modalSyncText.length > 0) {
                  setModalSync(false);
                  setModalSyncText('');
                  dispatch(backupData(modalSyncText));
                }
              }}>
              <Text
                style={[
                  styles.modalSubmitText,
                  {
                    color: theme.colors.onPrimary,
                  },
                ]}>
                Sync Now
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  versionText: {
    paddingHorizontal: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    fontStyle: 'italic',
  },
});
