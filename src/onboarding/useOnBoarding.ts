import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useOnboarding = () => {
  const {replace} = useNavigation();

  const ifAppLaunchedFirstTime = async () => {
    let launchedValue = null;
    try {
      const isAppLaunched = await AsyncStorage.getItem('appIsLaunched');
      if (isAppLaunched !== null) {
        replace('Products');
      }
      launchedValue = isAppLaunched;
    } catch (error) {
      console.log('Some error occured!');
    }
    return launchedValue;
  };
  ifAppLaunchedFirstTime();
};
