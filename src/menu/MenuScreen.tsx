import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text, Dimensions, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ECText } from '../components/ECText';
import { removeToken } from '../otp/otpSlice';
import { RootState } from '../store';
import {Header} from '../components/header/Header';
import axios from 'axios';
import config from '../../config';
import {alertService} from '../alertService';
import { useAppTheme } from '../theme';
import { ECButton } from '../components/button/ECButton';
import Modal from "react-native-modal";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { err } from 'react-native-svg/lib/typescript/xml';

export const MenuScreen = () => {
	
	const {
    	buttons: {primaryButtonContained, disabledButton}
	} = useAppTheme();
	const {navigate} = useNavigation();
	const dispatch = useDispatch();
	const token = useSelector((state: RootState) => state.otp.access_token);
	const isLoggedIn = useSelector((state: RootState) => state.otp.isLoggedIn);
	const isSLoggedIn = useSelector((state: RootState) => state.otp.isSLoggedIn);
	const isFLoggedIn = useSelector((state: RootState) => state.otp.isFLoggedIn);
	const isALoggedIn = useSelector((state: RootState) => state.otp.isALoggedIn);
	const [loading, setLoading] = useState<boolean>(false);
	const [visible, setVisible] = useState(false);
	
	return (
		<View style={styles.container}>			
			<Header isCountryFilter={false} isSideMenu={false}/>
			<View style={styles.infoContainer}>
                <Image source={require('../../assets/images/avatar.png')} resizeMode="contain" style={{height: 60, width: 60}}/>			
				<TouchableOpacity style={styles.btnEdit} onPress={() => navigate('Cart')}>
					<ECText textColor='white' fontSize={14}>My Cart</ECText>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btnEdit} onPress={() => {
					navigate('Order');
				}}>
					<ECText textColor='white' fontSize={14}>My Orders</ECText>
				</TouchableOpacity>
                <TouchableOpacity style={styles.btnEdit} onPress={() => {
					Linking.openURL('https://www.adulis.com/terms_and_conditions')
				}}>
					<ECText textColor='white' fontSize={14}>Terms and Conditions</ECText>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btnEdit} onPress={() => {
					Linking.openURL('https://www.adulis.com/faq')
				}}>
					<ECText textColor='white' fontSize={14}>FAQ</ECText>
				</TouchableOpacity>
				
				<TouchableOpacity style={styles.btnEdit} onPress={() => {
					navigate('ContactUs');
				}}>
					<ECText textColor='white' fontSize={14}>Contact Us</ECText>
				</TouchableOpacity>
				<View style={{height: 8}}></View>
				<ECButton
					mode="outlined"
					// disabled={!isLoggedIn} 
					variant={primaryButtonContained}
					onPress={() => {
						if (isSLoggedIn) {
							async () => {
								try {
									console.log('Google Sign Out Success');
									await GoogleSignin.signOut();
								} catch (error) {
									console.error(error);
								}
							}
						}
						if (isFLoggedIn) {
							async () => {
								try {
									console.log('Facebook Sign Out Success');
									await LoginManager.logOut();
								} catch (error) {
									console.error(error);
								}
							}
						}
						if (isALoggedIn) {
							async () => {
								try {
									console.log('Apple Sign Out Success');
									await appleAuth.performRequest({
										requestedOperation: appleAuth.Operation.LOGOUT
									  })
								} catch (error) {
									console.error(error);
								}
							}
						}
						dispatch(removeToken());
						navigate('SignIn');
					}}
					loading={false}
				>
					<ECText textColor='white' fontSize={14}>{(isLoggedIn)? 'Sign Out' : 'Sign In'}</ECText>
				</ECButton>				
				<View style={{height: 8}}></View>
				<ECButton
					mode="outlined"
					disabled={!isLoggedIn} 
					variant={(isLoggedIn) ? primaryButtonContained : disabledButton}
					onPress={() => {
						setVisible(true);
					}}
					loading={loading}
				>
					<ECText textColor='white' fontSize={14}>Delete Account</ECText>
				</ECButton>
			</View>		
			<Modal
				isVisible={visible}
			>
				<View style={{backgroundColor: 'white', height: 150, width: '80%', alignSelf: 'center', padding: 16}}>
					<ECText textColor='black' fontSize={14}>Are you sure you want to delete your account permanently?</ECText>
					<View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 24}}>
						<TouchableOpacity style={[styles.button, { backgroundColor: '#07733c' }]} onPress={()=>{
							setVisible(false);
							setLoading(true);
							axios.delete(config.DELETE, {
								headers: {
									'Authorization': `Bearer ${token}`
								}
							})
							.then(res => {
								console.log('Delete Request Success', res.data);
								setLoading(false);
								if (isSLoggedIn) {
									async () => {
										try {
											console.log('Google Sign In Revoke Access');
											await GoogleSignin.revokeAccess();
										} catch (error) {
											console.error(error);
										}
									}
								}
								dispatch(removeToken());
								navigate('SignIn');
							})
							.catch(err => {
								console.log('Delete Error', err);
								console.log('Delete Error Response', err.response.data);
								setLoading(false);
								alertService.alert('warning', err.response.data.detail, 'account');
							})
						}}>
							<Text style={[styles.txtContent, {color: 'white'}]}>Ok</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.button, { backgroundColor: '#f1f5ea' }]} onPress={()=>{
								setVisible(false);								
							}}
						>
							<Text style={[styles.txtContent]}>Cancel</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>	
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	infoContainer: {
		borderWidth: 1,
		borderColor: '#c7c7c7',
		padding: 12,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 12
	},
	btnEdit: {
		backgroundColor: '#07733c',
		height: 50,
		width: '100%',
		borderRadius: 4,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 8
	},
	txtContent: {
		fontsize: 13, 
		fontFamily: 'Poppins-Regular', 
		color: '#4c4c4c'
	},
	button: {
        backgroundColor: '#f1f5ea',
        height: 50,
		width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginBottom: 8
    },
	
});