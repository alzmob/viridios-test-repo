import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

interface OnBoardingState {
  isOnboardingScreen: boolean;
}

const initialState: OnBoardingState = {isOnboardingScreen: true};

const onboardingSlice = createSlice({
  initialState,
  name: 'onboarding',
  reducers: {
    setIsOnboardingSeen: state => {
      state.isOnboardingScreen = false;
      const setStorage = async () => {
        await AsyncStorage.setItem(
          'cartItems',
          JSON.stringify(state.isOnboardingScreen),
        );
      };
      setStorage();
    },
  },
});

export const {setIsOnboardingSeen} = onboardingSlice.actions;

export default onboardingSlice.reducer;
