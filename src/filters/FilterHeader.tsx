import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Divider} from '../components/Divider';
import {useNavigation} from '@react-navigation/native';

export const FilterHeader = () => {

	const navigation = useNavigation();
	return(
		<View style={{height: 51}}>
			<View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24, height: 50, alignItems: 'center'}}>
				<Text style={{fontSize: 16, fontFamily: 'Poppins-SemiBold', color: 'black'}}>Filters</Text>
				<TouchableOpacity onPress={() => {navigation.goBack()}}>
					<Image source={require('../../assets/images/close-black.png')} resizeMode="contain" style={{width: 12, height: 12}}/>
				</TouchableOpacity>
			</View>
			<Divider />
		</View>
	);
};

