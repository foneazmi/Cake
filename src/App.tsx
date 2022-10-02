import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {AppRouter} from './AppRouter';

export default function App() {
  return (
    <PaperProvider>
      <AppRouter />
    </PaperProvider>
  );
}
