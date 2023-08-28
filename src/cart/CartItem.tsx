import React, { useState, FunctionComponent, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text, TextInput } from 'react-native';
import { ECText } from '../components/ECText';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { Product } from '../search/searchSlice';
import { addToCart, removeFromCart, removeItemFromCartThunk, updateCartItem } from './cartSlice';
import config from '../../config';
import { alertService } from '../alertService';

interface CartItemProps {
	show?: boolean;
	title: string;
	price: string;
	subtotalPrice: number;
	quantity: number;
	product: Product;
	img: string;
}

export const CartItem: FunctionComponent<CartItemProps> = ({
	title, price, subtotalPrice, show, quantity, product, img
}) => {

	const dispatch = useDispatch();
	const [qua, setQua] = useState<number>(quantity);
	const [subTotal, setSubtotal] = useState<number>(subtotalPrice);
	const token = useSelector((state: RootState) => state.otp.access_token);

	const removeItem = () => {
		if (token) {
			const params = {
				token: token,
				url: config.CART + 'products/' + product.id + '/'
			}
			dispatch(removeItemFromCartThunk(params));
		}		
	}
	
	useEffect(()=>{
		if (qua) {
			const payload = {
				id: product.id,
				cartQuantity: qua
			}
			dispatch(updateCartItem(payload));
		}
	}, [qua]);

	return (
		<View style={styles.container}>
			<View>
				<Image source={{uri: img}} resizeMode="cover" style={styles.image}/>
				{product.sample_price == '0' &&
						<View style={{backgroundColor: '#07733c', width: 100, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', position: 'absolute'}}>
							<Text style={{fontFamily: 'Poppins-Italic', fontSize: 14, color: 'white'}}>Free Sample</Text>
						</View>
				}
			</View>			
			
			<View style={styles.descWrapper}>
				<View>
					<Text style={styles.title}>{title}</Text>
					<View style={styles.priceWrapper}>
						<Text style={styles.price}>${price}</Text>
						<ECText fontSize={12} textColor='#000'>per {product.packaging_unit}</ECText>
					</View>
					{product.is_sample !== true &&						
						<View style={styles.qtyWrapper}>					
							<ECText textColor='#4c4c4c' fontSize={12}>Quantity</ECText>
							{/* <SelectDropdown
								data={product.quantities}
								onSelect={(selectedItem, index) => {
									console.log(selectedItem, index);
									setQua(parseFloat(selectedItem));
									setSubtotal(parseFloat(price)*parseFloat(selectedItem));
								}}
								defaultButtonText={`${quantity}`}
								buttonTextAfterSelection={(selectedItem, index) => {
									return selectedItem;
								}}
								rowTextForSelection={(item, index) => {
									return item;
								}}
								buttonStyle={styles.dropdown2BtnStyle}
								buttonTextStyle={styles.dropdown2BtnTxtStyle}
								renderDropdownIcon={isOpened => {
									return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#4c4c4c'} size={8} />;
								}}
								dropdownIconPosition={'right'}
								dropdownStyle={styles.dropdown2DropdownStyle}
								rowStyle={styles.dropdown2RowStyle}
								rowTextStyle={styles.dropdown2RowTxtStyle}
							/> */}
							<TextInput
								placeholder='quantity'
								onChangeText={text => {
									if(Number(text) < Number(product.minimum_order_qty)) {
										alertService.alert('warning', 'Quantity must bigger than minimum order quantity.');
										return;
									}
									if(Number(text) > Number(product.available_qty)) {
										alertService.alert('warning', 'Quantity must bigger than available quantity.');
										return;
									}
									setQua(Number(text))
									setSubtotal(parseFloat(price)*parseFloat(text));
								}}
								value={qua?.toString()}
								style={{borderColor: '#4c4c4c', borderWidth: 1, borderRadius: 2, marginLeft: 10, fontSize: 14, width: 90, padding: 3}}
							/>
						</View>
					}
					
				</View>
				<View>
					<Text style={styles.subtotalPrice}>${qua ? subTotal : subtotalPrice}</Text>
					{!show && 	<TouchableOpacity style={styles.rmButtonWrapper} onPress={()=> {
									dispatch(removeFromCart(product.id));
									removeItem();
								}}>
									<Image source={require('../../assets/images/remove.png')} resizeMode="contain" style={styles.removeImage}/>
									<ECText fontSize={12} textColor='#4c4c4c'>Remove</ECText>
								</TouchableOpacity>
					}
					
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row', 
		marginBottom: 1, 
		backgroundColor: 'white', 
		paddingHorizontal: 16, 
		paddingVertical: 10
	},
	image: {		
		width: 130, 
		height: 180
	},
	descWrapper: {
		flexDirection: 'column', 
		justifyContent: 'space-between',
		width: '60%', 
		marginLeft: 8
	},
	title: {
		fontSize: 15, 
		fontFamily: 'Poppins-Regular', 
		color: '#07733c'
	},
	priceWrapper: {
		flexDirection: 'row'
	},
	price: {
		fontSize: 14, 
		fontFamily: 'Poppins-SemiBold', 
		color: 'black', 
		marginRight: 4
	},
	subtotalPrice: {
		fontSize: 14, 
		fontFamily: 'Poppins-Bold', 
		color: 'black'
	},
	rmButtonWrapper: {
		flexDirection: 'row'
	},
	removeImage: {
		height: 16, 
		marginLeft: -8
	},
	qtyWrapper: {
		flexDirection: 'row', 
		marginTop: 4,
		alignItems: 'center'
	},
	dropdown2BtnStyle: {
		flex: 1,
		backgroundColor: 'white',
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#c7c7c7',
		maxWidth: 64,
		height: 30,
		marginRight: 12,
		paddingRight: 0
	  },
	  dropdown2BtnTxtStyle: {color: '#4c4c4c', textAlign: 'left', fontFamily: 'Poppins-Medium', fontSize: 14},
	  dropdown2DropdownStyle: {backgroundColor: '#fff', height: 160},
	  dropdown2RowStyle: {backgroundColor: '#fff', borderBottomColor: '#fff', height: 30},
	  dropdown2RowTxtStyle: {color: '#4c4c4c', textAlign: 'left', fontFamily: 'Poppins-Medium', fontSize: 14},
});

