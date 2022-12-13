import React, {useEffect} from 'react';
import {AppRouter} from './router';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persistor} from './stores';
import {logger} from './helpers';
import codePush from 'react-native-code-push';

const App = () => {
  useEffect(() => {
    const codePushStatusDidChange = status => {
      switch (status) {
        case codePush.SyncStatus.CHECKING_FOR_UPDATE:
          logger('Checking for updates.');
          break;
        case codePush.SyncStatus.DOWNLOADING_PACKAGE:
          logger('Downloading package.');
          break;
        case codePush.SyncStatus.INSTALLING_UPDATE:
          logger('Installing update.');
          break;
        case codePush.SyncStatus.UP_TO_DATE:
          logger('Up-to-date.');
          break;
        case codePush.SyncStatus.UPDATE_INSTALLED:
          logger('Update installed.');
          break;
      }
    };

    const codePushDownloadDidProgress = progress => {
      logger(
        progress.receivedBytes + ' of ' + progress.totalBytes + ' received.',
      );
    };
    const syncImmediate = () => {
      logger('synced');
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
