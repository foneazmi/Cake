import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {AppRouter} from './router';

export default function App() {
  return (
    <PaperProvider>
      <AppRouter />
    </PaperProvider>
  );
}
