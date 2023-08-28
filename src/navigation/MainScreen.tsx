import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppTheme} from '../theme';
import {SideMenu} from '../side-menu/SideMenu';
import { HomeScreen } from '../home/HomeScreen';
import { ProjectsScreen } from '../screens/ProjectsScreen';
import { PriceScreen } from '../screens/PriceScreen';
import { ChartScreen } from '../screens/ChartScreen';


const Drawer = createDrawerNavigator();

export const MainScreen = () => {
  const {
    colors: {sideMenuBackgroundColor},
  } = useAppTheme();

  const {top} = useSafeAreaInsets();
  
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
        drawerType:"front",
      }}
      drawerContentOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'black',        
      }}
      drawerStyle={[
        styles.drawerStyle,
        {backgroundColor: sideMenuBackgroundColor, paddingTop: top},
      ]}
      drawerContent={() => <SideMenu />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Projects" component={ProjectsScreen} />
      <Drawer.Screen name="Price" component={PriceScreen} />
      <Drawer.Screen name="Chart" component={ChartScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerStyle: {
    width: '64%',
    height: '100%',
  },
});
