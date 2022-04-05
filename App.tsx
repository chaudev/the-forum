import React from 'react';
import {LogBox, StatusBar} from 'react-native';
import store from '~/store';
import AppNavigator from '~/navigators';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';

LogBox.ignoreAllLogs();

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar translucent={true} barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
