import React from 'react';
import {StyleSheet, TouchableOpacity, FlatList, Text, View, Image} from 'react-native'
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ECText} from '../components/ECText';
import {SideMenuItem} from './SideMenuItem';

export const SideMenu = () => {
    const navigation = useNavigation();
	const menu_data = [
		{
			title: "Clients",
			navi_url: "",
			isTitle: true
		},
		{
			title: "Bank",
			navi_url: "",
		},
		{
			title: "Assets Managers",
			navi_url: "",
		},
		{
			title: "Brokers",
			navi_url: "",
		},
		{
			title: "Traders",
			navi_url: "",
		},
		{
			title: "Coperates",
			navi_url: "",
		},
		{
			title: "Projects Developers",
			navi_url: "",
		},
		{
			title: "Account Firms",
			navi_url: "",
		},
		{
			title: "Advisors And Consultants",
			navi_url: "",
		},
		{
			title: "Solutions",
			navi_url: "",
			isTitle: true
		},
		{
			title: "Use Cases",
			navi_url: "",
		},
		{
			title: "Prices",
			navi_url: "",
		},
		{
			title: "Projects",
			navi_url: "",
		},
		{
			title: "Valuation",
			navi_url: "",
		},
		{
			title: "Markets",
			navi_url: "",
		},
		{
			title: "News",
			navi_url: "",
		},
		{
			title: "Company",
			navi_url: "",
			isTitle: true
		},
		{
			title: "Our Mission",
			navi_url: "",
		},
		{
			title: "Co-Founders",
			navi_url: "",
		},
		{
			title: "Team",
			navi_url: "",
		},
		{
			title: "Careers",
			navi_url: "",
		},
		{
			title: "Press Releases",
			navi_url: "",
		}
	]

  	return (
		<View style = {styles.container}>
			<View style={styles.topSection}>
				<TouchableOpacity onPress={()=> navigation.dispatch(DrawerActions.closeDrawer)}>
				    <Image source = {require('../../assets/images/close.png')} resizeMode="contain" style={{width: 10, height: 10}}/>
				</TouchableOpacity>
			</View>
			<View style={styles.itemWrapper}>
				<FlatList				
					data={menu_data}
					renderItem={({ item }) => (
						<SideMenuItem text={item.title} isTitle={item.isTitle} onPress={
							() => {
							  // navigation.navigate('Cart'),
							  navigation.dispatch(DrawerActions.closeDrawer)
							}}
						/>
					)}  
					keyExtractor={(item, index) => 'Home' + index.toString()}
				/>
			</View>
		</View>
  	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#313131',
		flex: 1, 
		paddingTop: 40
	},
	topSection: {
		display: 'flex',
		justifyContent: 'flex-end',
		flexDirection: 'row',
		marginTop: 16,
		marginHorizontal: 16,
		marginBottom: 16
	}, 
	avatarSection: {
		alignItems: 'center',
		flexDirection: 'row',
		marginTop: 16,
		marginBottom: 24,
		marginHorizontal: 16		
	},
	avatar: {
		width: 50, 
		height: 50,
		marginRight: 20
	},
	itemWrapper: {
		marginLeft: 32
	}
});
