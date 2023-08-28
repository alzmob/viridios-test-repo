import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import config from '../../config';
import { getProductsThunk } from '../search/searchSlice';
import { RootState } from '../store';
import { resetAllFilterData, setFilters } from './filterSlice';

export const FilterBottom = () => {

	const {goBack} = useNavigation();
	const dispatch = useDispatch();
	const originData = useSelector((state: RootState) => state.filter.origin);
	const typeData = useSelector((state: RootState) => state.filter.type);
	const gradeData = useSelector((state: RootState) => state.filter.grade);
	const processingData = useSelector((state: RootState) => state.filter.processing);
	const certData = useSelector((state: RootState) => state.filter.cert);
	const warehouseData = useSelector((state: RootState) => state.filter.warehouse);
	const priceData = useSelector((state: RootState) => state.filter.price);
	const moqData = useSelector((state: RootState) => state.filter.moq);
	const stateData = useSelector((state: RootState) => state.filter.states);
	const reviewData = useSelector((state: RootState) => state.filter.reviews);

	const applyFilters = () => {
		let params: string = '';
		let originFiltered = originData.filter(item => item.isChecked === true);		
		if (originFiltered.length !== 0) {
			originFiltered.map(item => {
				params += 'countries=' + item.slug + '&';
			});
		}
		let typeFiltered = typeData.filter(item => item.isChecked === true);		
		if (typeFiltered.length !== 0) {
			typeFiltered.map(item => {
				params += 'coffee_types=' + item.slug + '&';
			});
		}
		let gradeFiltered = gradeData.filter(item => item.isChecked === true);		
		if (gradeFiltered.length !== 0) {
			gradeFiltered.map(item => {
				params += 'coffee_grades=' + item.slug + '&';
			});
		}
		let processingFiltered = processingData.filter(item => item.isChecked === true);		
		if (processingFiltered.length !== 0) {
			processingFiltered.map(item => {
				params += 'coffee_processings=' + item.slug + '&';
			});
		}
		let certFiltered = certData.filter(item => item.isChecked === true);		
		if (certFiltered.length !== 0) {
			certFiltered.map(item => {
				params += 'certifications=' + item.slug + '&';
			});
		}
		let warehouseFiltered = warehouseData.filter(item => item.isChecked === true);		
		if (warehouseFiltered.length !== 0) {
			warehouseFiltered.map(item => {
				params += 'warehouses=' + item.slug + '&';
			});
		}
		let statesFiltered = stateData.filter(item => item.isChecked === true);		
		if (statesFiltered.length !== 0) {
			statesFiltered.map(item => {
				params += 'ship_from=' + item.slug + '&';
			});
		}

		let reviewsFiltered = reviewData.filter(item => item.isChecked === true);		
		if (reviewsFiltered.length !== 0) {
			reviewsFiltered.map(item => {
				params += 'average_rating=' + item.slug + '&';
			});
		}

		params += 'from_price_per_lb=' + priceData.startValue + '&' + 'to_price_per_lb=' + priceData.endValue + '&' + 'from_minimum_order_qty=' + moqData.startValue + '&' + 'to_minimum_order_qty=' + moqData.endValue;

		dispatch(setFilters(params));
		
		const url = config.GETALLPRODUCTS + '?' + params;
		dispatch(getProductsThunk(url));
		
	}

	return(
		<View style={{height: 51}}>
			<View style={styles.divider}/>
			<View style={{flexDirection: 'row', justifyContent: 'space-between', height: 50, alignItems: 'center'}}>
				<TouchableOpacity style={styles.resetFilter} onPress={() => dispatch(resetAllFilterData())}>
					<Image source={require('../../assets/images/reset.png')} resizeMode="contain" style={{width: 10, height: 10}}/>
					<Text style={{fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#4c4c4c', marginLeft: 4}}>Reset Filters</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.applyFilter} onPress={() => applyFilters()}>
					<Text style={{fontSize: 14, fontFamily: 'Poppins-SemiBold', color: 'white'}}>Apply Filters</Text>
				</TouchableOpacity>
			</View>			
		</View>
	);
};

const styles = StyleSheet.create({
	divider: {
		width: '100%',
		height: 1,
		backgroundColor: '#c7c7c7'
	},
	applyFilter: {
		marginRight: 16,
		backgroundColor: '#07733c', 
		height: 38, 
		paddingHorizontal: 36, 
		borderRadius: 4, 
		alignItems: 'center',
		justifyContent: 'center'
	},
	resetFilter: {
		flexDirection: 'row', 
		alignItems: 'center', 
		borderRadius: 4, 
		borderColor: '#4c4c4c', 
		borderWidth: 1,
		height: 38, 
		paddingHorizontal: 36, 
		marginLeft: 16,
	}
});