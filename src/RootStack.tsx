import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {RootState} from './store';
import {OnboardingScreen1, OnboardingScreen2, OnboardingScreen3} from './onboarding';
import {SignInScreen} from './sign-in/SignInScreen';
import { ForgotPasswordScreen } from './sign-in/ForgotPasswordScreen';
import {FilterScreen} from './filters/FilterScreen';
import {SignUpScreen} from './sign-up/SignUpScreen';
import {MainScreen} from './navigation/MainScreen';
import {HomeScreen} from './home/HomeScreen';
import { ProjectsScreen } from './screens/ProjectsScreen';
import { PriceScreen } from './screens/PriceScreen';
import { ChartScreen } from './screens/ChartScreen';

export type SearchNavigationParams = {
  Search: {
    isAllProducts?: boolean,
    searchParams?: string,
    allFilter?: boolean
  }
}

const Stack = createStackNavigator();

export const RootStack = () => {
  return <AppStack />;
};

const AppStack = () => {
  return (
    <Stack.Navigator
      mode="card"
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
        detachPreviousScreen: false,
        animationEnabled: true,
        ...TransitionPresets.SlideFromRightIOS
      }}
    > 
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Main" component={MainScreen} />
      {/* <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
      {/* <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Projects" component={ProjectsScreen} />
      <Stack.Screen name="Price" component={PriceScreen} />
      <Stack.Screen name="Chart" component={ChartScreen} /> */}
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export const HomeStack = () => {
  return (
    <Stack.Navigator
      mode="card"
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        detachPreviousScreen: false,
        animationEnabled: true,
        ...TransitionPresets.SlideFromRightIOS
      }}
    > 
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Projects" component={ProjectsScreen} />
      <Stack.Screen name="Price" component={PriceScreen} />
      <Stack.Screen name="Chart" component={ChartScreen} />
    </Stack.Navigator>
  );
}

