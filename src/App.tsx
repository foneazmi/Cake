import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {AppRouter} from './router';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persistor} from './stores';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <PaperProvider>
          <AppRouter />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
