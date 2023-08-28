import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_HAS_LAUNCHED = 'appHasLaunched';

const setAppLaunched = async () => {
  try {
    await AsyncStorage.setItem(APP_HAS_LAUNCHED, 'true');
    return true;
  } catch (error) {
    console.log('The information about app usage could not be saved');
  }
};

export const onboardingService = {
  setAppLaunched,
};
