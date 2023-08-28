import React, {useState, FunctionComponent, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text, FlatList } from 'react-native';
import {useAppTheme} from '../../theme';
import {useNavigationState, DrawerActions, useNavigation} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface HeaderProps {
	isCountryFilter?: boolean;
	isSideMenu?: boolean;
}

export const Header: FunctionComponent<HeaderProps> = ({
	isCountryFilter, isSideMenu
}) => {
	const {
		colors: {headerBackgroundColor}
	} = useAppTheme();

	const navigation = useNavigation();
	const {navigate} = useNavigation();

	const useGetCurrentRoute = () => {
		const state = useNavigationState((state) => state);
		const getCurrentRoute = () => {
		  const currentRoute = state.routes[state.index];
		  return currentRoute.name;
		};
		return getCurrentRoute;
	};
	const getCurrentRoute = useGetCurrentRoute();
	const currentRoute = getCurrentRoute();

	return (
		<>
			<View style={[styles.container, {backgroundColor: headerBackgroundColor}]}>
				<View style={styles.topheader}>
					<TouchableOpacity onPress={() => navigate('Home')}>
						<Image source={require('../../../assets/images/viridios_logo.png')} resizeMode="contain" style={styles.headericon}/>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigate('Projects')}>
						{currentRoute == 'Projects' ? (
							<Image source={require('../../../assets/images/projects.png')} resizeMode="contain" style={styles.headericon2}/>
							): (
							<Image source={require('../../../assets/images/projects_inactive.png')} resizeMode="contain" style={styles.headericon2}/>
						)}
					</TouchableOpacity>
					<TouchableOpacity onPress={() =>  navigate('Price')}>
						{currentRoute == 'Price' ? (
							<Image source={require('../../../assets/images/pricer_active.png')} resizeMode="contain" style={styles.headericon2}/>
							): (
							<Image source={require('../../../assets/images/pricer.png')} resizeMode="contain" style={styles.headericon2}/>
						)}
					</TouchableOpacity>
					<TouchableOpacity onPress={() =>  navigate('Chart')}>
						<FontAwesome name={'line-chart'} color={currentRoute == 'Chart'? '#88ad1f': '#ddd'} size={22} />
					</TouchableOpacity>
				</View>
				{isSideMenu && <TouchableOpacity onPress={()=> navigation.dispatch(DrawerActions.openDrawer)}>
					<FontAwesome name={'navicon'} color={'#fff'} size={22} />
				</TouchableOpacity>	
				}	
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: '100%',
		height: 50,
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#1A1A1A',
		paddingHorizontal: 16
	},
	headericon: {
		width: 30,
		height: 30
	},
	headericon2: {
		width: 24,
		height: 24
	},
	topheader: {
		display: 'flex',
		flexDirection: 'row',
		gap: 20,
		alignItems: 'center'
	},
	logo: {
		height: '50%',
		width: 80
	},
	menu: {
		width: 24,
		height: '50%'
	}
});