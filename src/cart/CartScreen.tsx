import React, {useEffect, useState} from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text, FlatList, TextInput } from 'react-native';
import {CartItem} from './CartItem';
import {Header} from '../components/header/Header';
import { ECText } from '../components/ECText';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { createCartThunk, getCartThunk, getTotals, resetIsLoading, setIsFromCart } from './cartSlice';
import { Product } from '../search/searchSlice';
import { parse } from '@babel/core';


export const CartScreen = () => {

	const [couponCode, setCouponCode] = useState('');
	const {navigate} = useNavigation();

	const cartItems = useSelector((state: RootState) => state.cart.cartItems);
	const isLoading = useSelector((state: RootState) => state.cart.loading);
	const isCreatedCart = useSelector((state: RootState) => state.cart.isCreatedCart);
	let isFromCart = useSelector((state: RootState) => state.cart.isFromCart);
	const isLoggedIn = useSelector((state: RootState) => state.otp.isLoggedIn);
	const cartTotal = useSelector(
		(state: RootState) => state.cart.cartTotalAmmount,
	);
	const token = useSelector((state: RootState) => state.otp.access_token);
	const dispatch = useDispatch();
	const isFocused = useIsFocused();

	const calcSubtotalPrice = (item: Product) => {
		let subTotal: number = 0;
		if (item.cartQuantity === 0) {
			if (parseFloat(item.sample_price) !== 0.0) {
				subTotal = parseFloat(item.sample_price);
			} else {
				subTotal = 0.0;
			}
		} else {
			subTotal = parseFloat(item.price_per_lb)* item.lbs_per_package * item.cartQuantity;
		}
		return subTotal;
	}

	const getCart = () => {				
		if (token) {
			dispatch(getCartThunk(token));
		}
	}

	const createCart = () => {
		let items: any[] = [];
		cartItems.map(item => {
			const element = item.is_sample ? 
			{
				product: item.id,
				is_sample: true
			}
			:
			{
				product: item.id,
				quantity: item.cartQuantity
			}
			items.push(element);
		});
		
		if (token) {
			const payload = {
				products: items,
				token: token
			}
			console.log('Cart Create Items Payload =====>', payload);
			dispatch(createCartThunk(payload));
		}		
	}

	useEffect(()=> {
		if (isLoggedIn) {
			getCart();
		}
		return ()=>{};
	}, [isFocused]);

	useEffect(()=> {		
		if (isLoading === 'succeeded') {
			dispatch(resetIsLoading());
			// navigate('SetAddress');
			navigate('SelectShippingAddress');
		}
	}, [isLoading]);

	useEffect(() => {
		console.log('Call GetTotals');
		dispatch(getTotals());
	
		return () => {};
	}, [dispatch, cartItems]);
	
	return (		
		<View style={styles.container}>
			<Header isCountryFilter={false} isSideMenu={false}/>
			<Text style={styles.sectionTitle}>Shopping Cart</Text>
			{cartItems.length === 0 ? 
				<Text>No Items</Text>
				:
				<FlatList				
					data={cartItems}
					renderItem={({ item }) => (
						<CartItem 
							title={item.title}
							price={String(parseFloat(item.price_per_lb) * (item.lbs_per_package))}
							quantity={item.cartQuantity}
							product={item}
							img={item.images[0].image}
							subtotalPrice={calcSubtotalPrice(item)}
						/>
					)}  
					keyExtractor={(item, index) => index.toString()}				
					ListFooterComponent={
						<View style={styles.footer}>
							<TouchableOpacity style={styles.btnContinue} onPress={()=> navigate('Search')}>
								<FontAwesome name='chevron-left' size={8} />
								<Text style={styles.footerText}> Continue Shopping</Text>
							</TouchableOpacity>
							<View style={styles.couponWrapper}>
								<View style={styles.couponTextInputWrapper}>
									<TextInput
										placeholder='Coupon Code'
										onChangeText={setCouponCode}
										value={couponCode}
										returnKeyLabel='done'
										returnKeyType='done'									
									/>
								</View>
								<View style={styles.applyButton}>
									<TouchableOpacity onPress={()=> console.log('Apply Coupon Code')}>
										<ECText fontSize={12}>Apply</ECText>
									</TouchableOpacity>
								</View>							
							</View>
							<View style={styles.txtLineWrapper}>
								<ECText fontSize={12}>Subtotal</ECText>
								<Text style={styles.footerText}>${cartTotal}</Text>
							</View>
							<View style={styles.txtLineWrapper}>
								<ECText fontSize={12}>Service Fees</ECText>
								<ECText fontSize={12}>Calculated at checkout</ECText>
							</View>
							<View style={styles.txtLineWrapper}>
								<ECText fontSize={12}>Shipping and Handling</ECText>
								<ECText fontSize={12}>Calculated at checkout</ECText>
							</View>
							<TouchableOpacity style={styles.btnCheckout} onPress={()=> {
								if (!isLoggedIn) {
									dispatch(setIsFromCart());
								}
								(isLoggedIn) ? 
									(isCreatedCart ? 
									// navigate('SetAddress') 
									navigate('SelectShippingAddress')
									:
									createCart())
									: 
									navigate('SignIn');
							}}>
								<Text style={[styles.footerText, {color: 'white'}]}>Proceed to Checkout </Text>
								<FontAwesome name='chevron-right' size={8} style={{color: 'white'}} />
							</TouchableOpacity>
						</View>
					}
				/> 
			}
			
			
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ebebeb',
	},
	sectionTitle: {
		fontSize: 18, 
		fontFamily: 'Poppins-SemiBold', 
		color: '#000', 
		marginBottom: 1, 
		paddingVertical: 10, 
		backgroundColor: 'white', 
		paddingLeft: 16
	},
	footer: {
		backgroundColor: 'white',
		paddingHorizontal: 16
	},
	btnContinue: {
		alignSelf: 'flex-end',
		marginVertical: 10,
		flexDirection: 'row',
		alignItems: 'center'
	},
	couponWrapper: {
		flexDirection: 'row', 
		height: 50, 
		width: '100%'
	},
	couponTextInputWrapper: {
		backgroundColor: '#f1f5ea', 
		width: '70%', 
		justifyContent: 'center', 
		paddingLeft: 16, 
		borderTopLeftRadius: 4,
		borderBottomLeftRadius: 4
	},
	applyButton: {
		backgroundColor: '#e3f0d0', 
		width: '30%', 
		justifyContent: 'center', 
		alignItems: 'center', 
		borderTopRightRadius: 4,
		borderBottomRightRadius: 4
	},
	footerText: {
		fontFamily: 'Poppins-Semibold', 
		fontSize: 14
	},
	txtLineWrapper: {
		justifyContent: 'space-between', 
		flexDirection: 'row', 
		marginVertical: 8
	},
	btnCheckout: {
		height: 50,
		backgroundColor: '#07733c',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		borderRadius: 4,
		marginBottom: 30,
		marginTop: 10
	}
});