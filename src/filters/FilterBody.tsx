import React, { useEffect, useState }from 'react';
import {StyleSheet, View, Text, Dimensions, FlatList, Platform, Pressable} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FilterTypeItem} from './FilterTypeItem';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addMOQToFilter, addPriceToFilter, addReviewToFilter, addStatesToFilter, getCertificationThunk, getCOCountryThunk, getStatesThunk, getWarehouseThunk, setInitialStoreData, setIsFirst } from './filterSlice';
import config from '../../config';
import { ECText } from '../components/ECText';
import { FilterCheckBox } from './FilterCheckBox';
import {RangeSlider} from '@sharcoux/slider';
import { useDebouncedCallback } from 'use-debounce';
import { RadioGroup, RadioButton } from "react-native-radio-check";
import { StaticRatings } from '../components/ratings/StaticRatings';
import { ReviewFilter } from './ReviewFilter';

const FILTERS = [
	{
		type: 'Coffee Origin',
	},
	{
		type: 'Coffee Type'
	},

	{
		type: 'Grade'
	},
	{
		type: 'Processing'
	},
	{
		type: 'Certification'
	},
	{
		type: 'Bean Price Per Pound'
	},
	{
		type: 'Minimum Weight (MOQ)'
	},
	{
		type: 'Warehouses'
	},
	{
		type: 'Ship From'
	},
	{
		type: 'Customer Reviews'
	},
];

const CoffeeType = [
	{
		text: 'Arabica',
		isChecked: false
	},
	{
		text: 'Robusta',
		isChecked: false
	},
];

const priceFilters = [
	{
		text: 'Under $5'
	},
	{
		text: '$5 to $10'
	},
	{
		text: '$10 to $20'
	},
	{
		text: '$30 to $30'
	},
	{
		text: '$50 & Above'
	}
];

export const FilterBody = () => {
	const {top} = useSafeAreaInsets();
	const screenHeight = Dimensions.get('window').height-90-top*2;
	
	const [tabNum, setTabNum] = useState(0)

	const originData = useSelector((state: RootState) => state.filter.origin);
	const typeData = useSelector((state: RootState) => state.filter.type);
	const gradeData = useSelector((state: RootState) => state.filter.grade);
	const processingData = useSelector((state: RootState) => state.filter.processing);
	const certData = useSelector((state: RootState) => state.filter.cert);
	const warehouseData = useSelector((state: RootState) => state.filter.warehouse);
	const priceData = useSelector((state: RootState) => state.filter.price);
	const reviewData = useSelector((state: RootState) => state.filter.reviews);
	const moqData = useSelector((state: RootState) => state.filter.moq);
	const stateData = useSelector((state: RootState) => state.filter.states);
	const filterStatus = useSelector((state: RootStateOrAny) => state.filter);

	const dispatch = useDispatch();

	const getCOCountry = () => {		
		const url = config.GET_COUNTRY + '?is_coffee_origin=true';
		dispatch(getCOCountryThunk(url));		
	}
	const getCertification = () => {		
		const url = config.GET_CERTIFICATION;
		dispatch(getCertificationThunk(url));		
	}

	const getWarehouse = () => {		
		const url = config.GET_WAREHOUSE;
		dispatch(getWarehouseThunk(url));		
	}

	const getStates = () => {		
		const url = config.GET_STATES;
		dispatch(getStatesThunk(url));		
	}

	const priceDebounced = useDebouncedCallback(range => {
		dispatch(
		  addPriceToFilter({
			startPrice: +range[0].toFixed(0),
			endPrice: +range[1].toFixed(0),
		  }),
		);
		console.log('Price Range', range[0].toFixed(0), range[1].toFixed(0));
	}, 200);

	const moqDebounced = useDebouncedCallback(range => {
		dispatch(
		  addMOQToFilter({
			startValue: +range[0].toFixed(0),
			endValue: +range[1].toFixed(0),
		  }),
		);
		console.log('MOQ Range', range[0].toFixed(0), range[1].toFixed(0));
	}, 200);

	useEffect(() => {
		// getCOCountry();
		getCertification();
		getWarehouse();
		getStates();
		if (!filterStatus.isFirst) {
			dispatch(setInitialStoreData());
			dispatch(setIsFirst());
		}
		
	}, []);

	return (
		<>
			<View style={styles.divider}/>
			<View style={{
				flexDirection: 'row', 
				height: screenHeight
			}}>			
			<View style={styles.filterTypeSection}>
				<FlatList
			        data={FILTERS}
			        renderItem={({item, index})=> (
			          <FilterTypeItem 
			          	tab_id={index}
			          	selectedtab={tabNum}
			          	onPress={()=> {
			          		setTabNum(index);
			          	  }
			          	}
			          	text={item.type}
			           />
			        )}
			        keyExtractor={item => item.type.toString()}
			        showsVerticalScrollIndicator={false}
			    />
			</View>
			<View style={styles.filterOptionSection}>
				{
					tabNum === 0 && 
					<FilterCheckBox 
						data={originData}
						tabIndex={tabNum}
					/>					
				}
				{
					tabNum === 1 && 
					<FilterCheckBox 
						data={typeData}
						tabIndex={tabNum}
					/>
				}
				{
					tabNum === 2 && 
					<FilterCheckBox 
						data={gradeData}
						tabIndex={tabNum}
					/>
				}
				{
					tabNum === 3 && 
					<FilterCheckBox 
						data={processingData}
						tabIndex={tabNum}
					/>
				}
				{
					tabNum === 4 && 
					<FilterCheckBox 
						data={certData}
						tabIndex={tabNum}
					/>
				}
				{
					tabNum === 5 && 
					<RadioGroup
						style={styles.radioGroup}
						// checkedId={index}
						icon={{
							normal: require('../../assets/images/unchecked.png'),
							checked: require('../../assets/images/checked.png')
						}}
						textStyle={[{ marginLeft: 5 }, styles.radioGroupText]}
						iconStyle={{width: 20, height: 20}}
						onChecked={(id, value) => {
							console.info("Group===", id);
							console.info("Value===", value);
							let sPrice = 0;
							let ePrice = 0;
							switch (id) {
								case 0:
									sPrice = 0;
									ePrice = 5;
									break;
								case 1:
									sPrice = 5;
									ePrice = 10;
									break;
								case 2:
									sPrice = 10;
									ePrice = 20;
									break;
								case 3:
									sPrice = 30;
									ePrice = 50;
									break;
								case 4:
									sPrice = 50;
									ePrice = 100;
									break;
							
								default:
									break;
							}
							dispatch(
								addPriceToFilter({
								  startPrice: sPrice,
								  endPrice: ePrice,
								}),
							  );
						}}>
						{priceFilters.map((item) => {
							return(
								<RadioButton
									style={{marginBottom: 8}} 
									text={item.text}
									value={item.text}
								/>
							);
						})}
					</RadioGroup>      
				}
				{
					tabNum === 6 && 
					<View style={styles.wrapper}>
						<ECText fontSize={15}>MOQ Range</ECText>
						<View style={styles.sliderValues}>
							<ECText fontSize={15} >
								{moqData.startValue}(bag/box)
							</ECText>
							<ECText fontSize={15} >
								{moqData.endValue}(bag/box)
							</ECText>
						</View>
						<RangeSlider
							range={[moqData.startValue, moqData.endValue]}
							minimumValue={0}
							maximumValue={2000}
							crossingAllowed={false}
							outboundColor='#c7c7c7'
							inboundColor='#07733c'
							thumbTintColor='#07733c'
							trackHeight={7}
							thumbSize={18}
							onSlidingComplete={(range: [number, number]) => moqDebounced(range)}
							style={styles.slider}
						/>
						<View style={styles.sliderValues}>
							<ECText fontSize={15} >
								Min
							</ECText>
							<ECText fontSize={15} >
								Max
							</ECText>
						</View>
					</View>				
				}
				{
					tabNum === 7 && 
					<FilterCheckBox 
						data={warehouseData}
						tabIndex={tabNum}
					/>
				}
				{
					tabNum === 8 && 
					<RadioGroup
						style={styles.radioGroup}
						// checkedId={index}
						icon={{
							normal: require('../../assets/images/unchecked.png'),
							checked: require('../../assets/images/checked.png')
						}}
						textStyle={[{ marginLeft: 5 }, styles.radioGroupText]}
						iconStyle={{width: 20, height: 20}}
						onChecked={(id, value) => {
							console.info("Group===", id);
							console.info("Value===", value);
							dispatch(addStatesToFilter(value));
						}}>
						{stateData.map((item) => {
							return(
								<RadioButton
									style={{marginBottom: 8}} 
									text={item.text}
									value={item.text}
								/>
							);
						})}
					</RadioGroup>
				}
				{
					tabNum === 9 && 
					<FlatList
						data={reviewData}
						bounces={false}
                		showsVerticalScrollIndicator={false}
						renderItem = {({item, index}) => (
							<ReviewFilter 
								avgRating={item.text}
								selected={item.isChecked}
								onFilter={()=>{
									dispatch(addReviewToFilter(item));
								}}
							/>
						)}
						keyExtractor={(item) => item.text}
					/>
				}
			
			</View>
		</View>
		</>
		
	);
}

const styles = StyleSheet.create({
	divider: {
		width: '100%',
		height: 1,
		backgroundColor: '#c7c7c7'
	},
	filterTypeSection:  {
		backgroundColor: '#f1f5ea', 
		width: '40%', 
		height: '100%'
	},
	filterOptionSection: {
		width: '60%',
		height: '100%',
		paddingVertical: 4
	},
	wrapper: {
		width: '100%',
		paddingHorizontal: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	sliderValues: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: Platform.OS === 'android' ? '100%' : '95%',
		marginTop: 12,
	},
	slider: {
		width: Platform.OS === 'android' ? '100%' : '95%',
	},
	radioGroupText: {
		color: '#4c4c4c', 
		textAlign: 'left', 
		fontFamily: 'Poppins-Regular', 
		fontSize: 10,
	},
	radioGroup: { 
		flexDirection: 'column', 
		margin: 8 
	}
});