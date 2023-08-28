import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text, ImageBackground, FlatList, ScrollView } from 'react-native';
import {Header} from '../components/header/Header';
import {ProductItem} from './ProductItem';
import {RouteProp, useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import config from '../../config';
import { getProductsThunk, resetState } from './searchSlice';
import { SkeletonMapped } from './ProductsSkeleton';
import { SearchNavigationParams } from '../RootStack';
import { ECHeader } from '../components/header/ECHeader';
import { MyStatusBar } from '../components/ECStatusBar';
import SearchHeader from './SearchHeader';

export const SearchScreen = () => {
	
	const [isSearched, setIsSearched] = useState(false);  // for test only

	const {params} = useRoute<RouteProp<SearchNavigationParams, 'Search'>>();
	const {navigate} = useNavigation();
	const dispatch = useDispatch();
	const productsState = useSelector((state: RootStateOrAny) => state.search);
	const products = useSelector((state: RootState) => state.search.products);
	const filters = useSelector((state: RootState) => state.filter.filters);
	const isFocused = useIsFocused();

	console.log("products: ", products)

	const getAllProducts = () => {
		let url: string = '';
		if (filters) {
			url = config.GETALLPRODUCTS + '?' + filters;
		} else {
			url = config.GETALLPRODUCTS;
		}
		if(params.allFilter) {
			url = config.GETALLPRODUCTS;
		}
		console.log('Get All Products URL', url);
		dispatch(getProductsThunk(url));
	}

	const getProducts = (params: string) => {
		let url: string = '';
		url = config.GETALLPRODUCTS + '?' + params;	
		dispatch(getProductsThunk(url));
	}

	useEffect(() => {		
		if (params) {
			if (params.searchParams) {
				console.log('Click on country item');
				getProducts(params.searchParams);
			}
			
		}
	}, []);

	useEffect(() => {		
		if (params) {
			if (params.isAllProducts) {
				console.log('Click on the search button when search text is undefined');			
				getAllProducts();
			}
		}
	}, [isFocused]);

	// useEffect(() => {				
	// 	if (products.length === 0) {
	// 		if (params.searchParams === null) {
	// 			console.log('Click on the search tab item for the first time without searching');		
	// 			getAllProducts();
	// 		}				
	// 	}
	// }, [isFocused]);

	return (
		<>
			<MyStatusBar />
			<SearchHeader />
			{ isSearched && <View style={{justifyContent: 'center', alignItems: 'center', height: '100%', paddingBottom: 300}}>
								<View style={{width: 200, height: 240, alignSelf: 'center'}}>
									<Image source={require('../../assets/images/noresult.png')} resizeMode="contain" style={{width: 200, height: 200}}/>
									<Text style={{fontSize: 16, fontFamily: 'Poppins-SemiBold', color: 'black', textAlign: 'center', paddingHorizontal: 30}}>No results found for your search</Text>
								</View>
							</View>
			}
			<View style={styles.container}>
				<View style={styles.filterWrapper}>
					<Text style={styles.txtResults}>RESULTS</Text>
					<View style={{flexDirection: 'column'}}>
						<View style={{height: 2}}></View>
						<TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={()=> {
							navigate('Filter')
						}}>
							<Text style={styles.txtFilter}>Filters</Text>
							<Image source={require('../../assets/images/down.png')} resizeMode="contain" style={styles.dropdown}/>
						</TouchableOpacity>
					</View>			
				</View>	
				{productsState.loading === 'pending' ? <SkeletonMapped /> : null}
				{productsState.loading === 'succeeded' ? (
					<>
						{products.length === 0 ?
							<Text>No such items</Text>
							:
							<FlatList				
								data={products}
								renderItem={({ item }) => (
									<ProductItem 
										title={item.title}
										pricePerLb={item.price_per_lb}
										lbperpackage={item.lbs_per_package}
										moq={item.minimum_order_qty}
										packageunit={item.packaging_unit}
										img={item.images[0].image}
										offerFreeSample={item.sample_price}
										rating={item.reviews_count}
										aval_qty={item.available_qty}
										origin={item.coffee_origin.name}
										grade={item.coffee_grade.name}
										onPress={()=>{
											navigate('SingleProduct', {productSlug: item.slug, product: item});
										}}
									/>
								)}  
								keyExtractor={(item, index) => index.toString()}
								maxToRenderPerBatch={30}
								showsVerticalScrollIndicator={false}
								contentContainerStyle={{paddingBottom: 150}}
							/>
						}
					</>
					
				): null}		
				
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 16
	},
	filterWrapper: {
		flexDirection: 'row', 
		justifyContent: 'space-between', 
		marginVertical: 16
	},
	txtResults: {
		fontSize: 16, 
		fontFamily: 'Poppins-SemiBold', 
		color:'black'
	},
	txtFilter: {
		fontSize: 14, 
		fontFamily: 'Poppins-Regular', 
		color: '#4c4c4c', 
		marginHorizontal: 4
	},
	dropdown: {
		width: 8, 
		height: 6
	},
});
