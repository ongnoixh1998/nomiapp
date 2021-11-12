import * as React from 'react';
import Routes from "./routes/routes";
import Toast from 'react-native-toast-message';
import { NativeBaseProvider, Box } from 'native-base';

export default function App() {
  return (
      <NativeBaseProvider>
          <Routes/>
          <Toast />
      </NativeBaseProvider>

  );
}
