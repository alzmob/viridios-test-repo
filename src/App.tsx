
import 'react-native-gesture-handler';
import React from 'react';
import { LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-view';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import { RootStack } from './RootStack';
import FlashMessage from 'react-native-flash-message';
import {ECFlashMessage} from './components/ECFlashMessage';

export default function App() {
  LogBox.ignoreAllLogs();

  React.useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
        <FlashMessage
          position={'top'}
          MessageComponent={props => <ECFlashMessage {...props} />}
        />
      </SafeAreaProvider>
    </>
    
  )
}

