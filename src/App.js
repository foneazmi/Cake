import React, {useEffect} from 'react';
import {AppRouter} from './router';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persistor} from './stores';
import {logger} from './helpers';
import CodePush from 'react-native-code-push';
import {begin, end, setProgressDescription} from './stores/actions/global';

const codePushOptions = {
  updateDialog: true,
  checkFrequency: CodePush.CheckFrequency.MANUAL,
  installMode: CodePush.InstallMode.IMMEDIATE,
  mandatoryInstallMode: CodePush.InstallMode.ON_NEXT_RESTART,
};

const codePushDownloadProgress = progress => {
  if (progress.receivedBytes !== progress.totalBytes) {
    store.dispatch(begin());
  } else {
    store.dispatch(end());
  }
  store.dispatch(
    setProgressDescription(
      `${Math.floor(
        (progress.receivedBytes * 100) / progress.totalBytes,
      )}% [Update CAKE in progress]`,
    ),
  );
  logger(progress);
};

const codePushStatusChange = syncStatus => {
  switch (syncStatus) {
    case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
      logger('Checking for updates.');
      break;
    case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
      logger('Downloading package.');
      break;
    case CodePush.SyncStatus.INSTALLING_UPDATE:
      logger('Installing update.');
      break;
    case CodePush.SyncStatus.UP_TO_DATE:
      logger('Updated.');
      break;
    case CodePush.SyncStatus.UPDATE_INSTALLED:
      logger('Update installed.');
      break;
  }
};

const App = () => {
  useEffect(() => {
    CodePush.sync(
      codePushOptions,
      codePushStatusChange,
      codePushDownloadProgress,
    );
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <AppRouter />
      </PersistGate>
    </Provider>
  );
};

export default CodePush(codePushOptions)(App);
