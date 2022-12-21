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

const CODE_PUSH_STATUS = {
  [`${CodePush.SyncStatus.AWAITING_USER_ACTION}`]: 'Wait user action.',
  [`${CodePush.SyncStatus.CHECKING_FOR_UPDATE}`]: 'Checking for updates.',
  [`${CodePush.SyncStatus.DOWNLOADING_PACKAGE}`]: 'Downloading package.',
  [`${CodePush.SyncStatus.INSTALLING_UPDATE}`]: 'Installing update.',
  [`${CodePush.SyncStatus.SYNC_IN_PROGRESS}`]: 'Sync in progress.',
  [`${CodePush.SyncStatus.UNKNOWN_ERROR}`]: 'Unknown error.',
  [`${CodePush.SyncStatus.UPDATE_IGNORED}`]: 'Update ignored.',
  [`${CodePush.SyncStatus.UPDATE_INSTALLED}`]: 'Update installed.',
  [`${CodePush.SyncStatus.UP_TO_DATE}`]: 'Current app is updated.',
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
};

const codePushStatusChange = syncStatus => {
  logger(CODE_PUSH_STATUS[syncStatus]);
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
