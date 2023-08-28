import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, Image} from 'react-native';
import {RootStateOrAny, useSelector} from 'react-redux';
import {MyStatusBar} from '../components/ECStatusBar';
import {useAppTheme} from '../theme';
import {HomeScreen} from '../home/HomeScreen';
import { HomeStack} from '../RootStack';
// import {useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  // const cart = useSelector((state: RootStateOrAny) => state.cart.cartItems);
  // const favorites = useSelector(
  //   (state: RootStateOrAny) => state.favorites.favoritesItems,
  // );

  const {
    colors: {bottomTabsIconColor, backgroundColor, bottomTabsBorderColorl},
  } = useAppTheme();
  
  return (
    <>
      <MyStatusBar />
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused, size}) => {
            let iconName: any
            let rn = route.name;

            if (rn === "Home") {
              iconName = focused ? require('../../assets/images/home.png') : require('../../assets/images/home2.png');
            } else if (rn === "Profile") {
              iconName = focused ? require('../../assets/images/profile.png') : require('../../assets/images/profile-outline.png');
            } else if (rn === "Cart") {
              iconName = focused ? require('../../assets/images/cart.png') : require('../../assets/images/cart-outline.png');
            } else {
              iconName = focused ? require('../../assets/images/menu.png') : require('../../assets/images/menu_outline.png');
            }

            return (
              <Image source={iconName} style={{width: size, height: size, resizeMode: 'stretch'}} />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: bottomTabsIconColor,
          inactiveTintColor: bottomTabsIconColor,
          showLabel: false,
          style: {
            backgroundColor: backgroundColor,
            shadowColor: bottomTabsBorderColorl,
            shadowOffset: {width: 0, height: -5},
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 10,
            height: Platform.OS === 'android' ? 65 : 70,
            paddingTop: 5,
            paddingBottom: Platform.OS === 'android' ? 5 : 15,
          },
          // labelStyle: {
          //   marginTop: -5,
          //   marginBottom: 5,
          //   fontSize: 14,
          //   fontFamily: 'Montserrat-Regular',
          // },
        }}>
        {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
        <Tab.Screen name="Home" component={HomeStack} />
      </Tab.Navigator>
    </>
  );
};
