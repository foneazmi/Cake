import React, {useEffect} from 'react';
import {AppRouter} from './router';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persistor} from './stores';
import codePush from 'react-native-code-push';

const App = () => {
  useEffect(() => {
    const codePushStatusDidChange = status => {
      switch (status) {
        case codePush.SyncStatus.CHECKING_FOR_UPDATE:
          console.log('Checking for updates.');
          break;
        case codePush.SyncStatus.DOWNLOADING_PACKAGE:
          console.log('Downloading package.');
          break;
        case codePush.SyncStatus.INSTALLING_UPDATE:
          console.log('Installing update.');
          break;
        case codePush.SyncStatus.UP_TO_DATE:
          console.log('Up-to-date.');
          break;
        case codePush.SyncStatus.UPDATE_INSTALLED:
          console.log('Update installed.');
          break;
      }
    };

    const codePushDownloadDidProgress = progress => {
      console.log(
        progress.receivedBytes + ' of ' + progress.totalBytes + ' received.',
      );
    };
    const syncImmediate = () => {
      console.log('synced');
      codePush.sync(
        {
          checkFrequency: codePush.CheckFrequency.ON_APP_START,
          installMode: codePush.InstallMode.IMMEDIATE,
          updateDialog: {
            appendReleaseDescription: true,
            optionalUpdateMessage: 'Updates here..',
            title: 'New Updates',
            optionalInstallButtonLabel: 'Yes',
            optionalIgnoreButtonLabel: 'No',
          },
        },
        codePushStatusDidChange,
        codePushDownloadDidProgress,
      );
    };
    syncImmediate();
  });

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <AppRouter />
      </PersistGate>
    </Provider>
  );
};

export default codePush(App);
