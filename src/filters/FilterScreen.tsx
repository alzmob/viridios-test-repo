import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Divider} from '../components/Divider';
import {FilterHeader} from './FilterHeader';
import {FilterBottom} from './FilterBottom';
import {FilterBody} from './FilterBody';

export const FilterScreen = () => {

	return(
		<SafeAreaView style={{justifyContent: 'space-between', height: '100%'}}>
			<FilterHeader />
			<FilterBody />
			<FilterBottom />
		</SafeAreaView>
	);
};

