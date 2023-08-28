import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text, ImageBackground, ScrollView, FlatList, Dimensions} from 'react-native';
import {useAppTheme} from '../theme';
import {Header} from '../components/header/Header';
import { MyStatusBar } from '../components/ECStatusBar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MainHomeScreen } from './MainHomeScreen';

function NotificationsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Top Stories"
	  initialLayout={{ width: Dimensions.get('window').width }}
      screenOptions={({ route }) => ({
				headerShown: false,
				tabBarStyle: {backgroundColor: '#313131'},
				tabBarActiveTintColor: '#fff',
				tabBarInactiveTintColor: '#333',
				tabBarLabel: ({ focused, color }) => (
					<Text style={[(focused ? {fontWeight: "bold"} : {fontWeight: "normal"}), (focused ? {color: 'white'}: {color: '#88ad1f'}), {width: 90}]}>{route.name}</Text>
				),
				tabBarScrollEnabled: false,
				tabStyle: {width: 'auto', marginLeft: 10, alignItems: 'center'},
				tabBarIndicatorStyle: {backgroundColor: '#fff'}
			})}

    >
      <Tab.Screen
        name="Top Stories"
        component={MainHomeScreen}
      />
      <Tab.Screen
        name="News Letter"
        component={NotificationsScreen}
      />
    </Tab.Navigator>
  );
}

export const HomeScreen = () => {

	const {
		colors: {headerBackgroundColor}
	} = useAppTheme();

	return (
		<>
			<MyStatusBar></MyStatusBar>
			
			<View style={styles.container}>
				<Header isCountryFilter={true} isSideMenu={true} />
				<MyTabs />				
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#3b3b3b'
	},
	scrollView: {
	},
	listHeaderImage: {
		height: Dimensions.get('window').height - 140
	},
	listFooterImage: {
		height: Dimensions.get('window').height - 300,
		alignItems: 'center',
		justifyContent: 'center'
	},
	listHeadertext: {
		fontSize: 36,
		color: 'white',
		fontFamily: 'Poppins-Bold',
		alignSelf: 'center',
		marginTop: '15%'
	},
	searchBar: {
		width: '75%',
		height: 56,
		alignItems: 'center',
		alignSelf: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: 'white',
		borderRadius: 4,
		paddingHorizontal: 16,
		marginTop: 40
	},	
	sellerSUBoldtext: {
		fontSize: 16,
		color: 'white',
		fontFamily: 'Poppins-SemiBold',
		alignSelf: 'center',
		width: 110
	},
	sellerSUtext: {
		fontSize: 14,
		color: 'white',
		fontFamily: 'Poppins-Regular',
		width: 186,
		textAlign: 'center',
		marginTop: 16,
	},
	sellerBtntext: {
		fontSize: 14,
		color: '#07733c',
		fontFamily: 'Poppins-Medium',
		alignSelf: 'center',
	},
	sellerSUButton: {
		width: 186,
		height: 45,
		backgroundColor: 'white',
		borderRadius: 4,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 32
	},
	testimonial: {
		margin: 20
	},
	tmText: {
		fontSize: 14,
		color: '#07733c',
		fontFamily: 'Poppins-Medium',
	},
	tmBoldText: {
		fontSize: 16,
		color: '#07733c',
		fontFamily: 'Poppins-SemiBold',
		width: 140
	},
	topSellingCountriestext: {
		fontSize: 14,
		color: '#88ad1f',
	},
	viewMoreText: {
		fontSize: 14,
		color: 'white',
		fontFamily: 'Poppins-Medium',
		alignSelf: 'center',
	},
	viewMoreButton: {
		height: 45,
		backgroundColor: '#07733c',
		borderRadius: 4,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 32,
		marginTop: 16,
		marginHorizontal: 50
	},
	disclaimerarea: {
		display: 'flex',
		flexDirection: 'row',
		gap: 5,
		marginTop: 20,
		marginBottom: 20,
		marginRight: 20,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	// swiper for testimonial
	wrapper: {
	},
	slide: {
		flexDirection: 'row',
		backgroundColor: 'white',
	},	
	tsText: {
		fontSize: 14,
		color: 'grey',
		fontFamily: 'Poppins-Medium',
		paddingHorizontal: 10,
		width: Dimensions.get('window').width - 160 - 40
	},
});