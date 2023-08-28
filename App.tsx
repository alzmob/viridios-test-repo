import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import './src/i18n/i18';
import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from './src/store';
import { LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-view';
// import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import { RootStack } from './src/RootStack';
// import FlashMessage from 'react-native-flash-message';
// import {ECFlashMessage} from './src/components/ECFlashMessage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const HomeScreen = () => {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
};
export default function App() {
  LogBox.ignoreAllLogs();
  
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <NavigationContainer>
              <RootStack />
            </NavigationContainer>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
