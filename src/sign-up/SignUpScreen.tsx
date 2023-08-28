import {StyleSheet, View, ImageBackground, Image, Text, ScrollView, TextInput, Platform, Dimensions, Keyboard, KeyboardAvoidingView} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {ECButton} from '../components/button/ECButton';
import {useNavigation} from '@react-navigation/native';
import {setSignUpEmailSchema} from './setSchema';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {ECEmailInputField} from '../components/ECEmailInputField';
import {ECPasswordInputField} from '../components/ECPasswordInputField';
import {useAppTheme} from '../theme';
import {useTranslation} from 'react-i18next';
import PhoneInput from 'react-native-phone-number-input';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { States } from '../helper/States';
import { StackNavigationProp } from '@react-navigation/stack';
import { OTPNavigationParams } from '../RootStack';
import { RadioGroup, RadioButton } from "react-native-radio-check";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { getCountryThunk, getStatesThunk, registerThunk, resetRegisterState } from './registerSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import config from '../../config';
import { alertService } from '../alertService';


export type OTPNavigationType = StackNavigationProp<
	OTPNavigationParams,
	'OTP'
>;

interface FormData {
	password: string;
	confirmPassword: string;
	city: string;
	firstName: string;
	lastName: string;
	companyName: string;
}

export const SignUpScreen = () => {

    const {
    	buttons: {primaryButtonContained, disabledButton},
		colors: {placeholderTextColor, primaryTextColor}
	} = useAppTheme();	

    const {t} = useTranslation('account');

    const { navigate, goBack } = useNavigation<OTPNavigationType>();
    const passwordInputRef = useRef<TextInput>(null);
    const lastnameRef = useRef<TextInput>(null);
	const firstnameRef = useRef<TextInput>(null);
	const cityInputRef = useRef<TextInput>(null);
	const phoneInput = useRef<PhoneInput>(null);
	const confirmPasswordInputRef = useRef<TextInput>(null);

	const [phoneNum, setPhoneNum] = useState<string>();
  	const [formattedPhoneNum, setFormattedPhoneNum] = useState<string>();
	const [index, setIndex] = useState<number>(0);
	const [stateCode, setStateCode] = useState<string>();
	const [countryCode, setCountryCode] = useState<string>();

	const [userEmail, setUserEmail] = useState<string>("");
	const [uidb64, setUidb64] = useState<string>("");
	const [token, setToken] = useState<string>("");

	const dispatch = useDispatch();
	const countries = useSelector((state: RootState) => state.register.countries);
	const isLoading = useSelector((state: RootState) => state.register.loading);

	const countryNames = useSelector((state: RootState) => state.register.countryNames);
	const states = useSelector((state: RootState) => state.register.states);
	const stateNames = useSelector((state: RootState) => state.register.stateNames);
	const sUidb64 = useSelector((state: RootState) => state.register.uidb64);
	const sToken = useSelector((state: RootState) => state.register.token);

    const {
	    handleSubmit,
	    control,
	    formState: {isValid, errors}
	} = useForm<FormData>({
	    resolver: yupResolver(setSignUpEmailSchema),
	    mode: 'onTouched'		
	});

	const canContinue = phoneNum && stateCode && countryCode && isValid;

	const getUserInfo = async () => {
		try {
			const getInfo = await AsyncStorage.getItem('userInfo');
			if (getInfo !== null) {
				console.log('User Info', getInfo);
				const userInfo = JSON.parse(getInfo);
				setUserEmail(userInfo.user.email);
				setToken(userInfo.token);
				setUidb64(userInfo.uidb64);
			}			
		} catch (error) {
			console.log('Some error occured!', error);
		}
	};

	const getCountry = () => {
		const url = config.GET_COUNTRY + '?is_active=true';
		dispatch(getCountryThunk(url));
	}

	const getStates = () => {
		let countrySlug = 'united-states';
		const url = config.GET_COUNTRY + countrySlug + '/states/';
		dispatch(getStatesThunk(url));
	}

    const onSubmitHandler = (form: FormData) => {
		if(phoneNum?.length > 15) {
            alertService.alert('warning', 'Phone Number has no more than 15 characters.');
            return;
		}

		const data = {
			password: form.password,
			password2: form.confirmPassword,
			phone_number: formattedPhoneNum,
			registered_as: index === 0 ? 'customer' : 'seller',
			first_name: form.firstName,
			last_name: form.lastName,
			company_name: form.companyName,
			country: countryCode,
			state: stateCode,
			city: form.city,
			company_details: null,
			profile_pic: null,
			url: config.REGISTER + uidb64 + '/' + token + '/'
		}
		console.log('SignUp Data', data);
	    dispatch(registerThunk(data));
	};


	useEffect(() => {
		getUserInfo();
		console.log('Valid', isValid);
		if (isLoading === 'succeeded') {
			navigate('OTP', {verifyEmail: false, phoneNum: formattedPhoneNum, uidb64: sUidb64, token: sToken});
		}
		return () => {
			dispatch(resetRegisterState);
		};
	}, [isLoading]);

	useEffect(() => {
		getCountry();		
		getStates();
	}, []);

    return (
        <View style={styles.container}>
		  <ImageBackground source = { require('../../assets/images/signinbg.png')} resizeMode="stretch" style = {styles.backgroundImage}>
		  	<View style={{ marginLeft: 20, alignSelf: 'flex-start', marginTop: '20%', marginBottom: 8}}>
				<AntDesign
					name="arrowleft"
					color='#ffffff'
					onPress={() => goBack()}
					size={24}
				/>
			</View>
			{/* <KeyboardAvoidingView> */}
				<ScrollView style = {styles.formContainer}>
					<Image source = {  require('../../assets/images/signinlogo.png')} resizeMode="stretch" style = {styles.logo} />
					<View style={styles.wrapper}>
						<Text style = {{marginTop: 0, marginBottom: -10, color: '#000', fontSize: 16, fontFamily: 'Poppins-Medium'}}>{t('createAccount')}</Text>
						<View style={styles.inputWrapper}>
							<TextInput							
								placeholderTextColor={placeholderTextColor}
								editable={false}
								style={{
									backgroundColor: '#f1f1f1', 
									height: 50, 
									fontSize: 10,
									fontFamily: 'Poppins-Regular',
									paddingLeft: 16,
									borderWidth: 0.5,
									borderColor: '#c7c7c7',
									borderRadius: 7,
									color: primaryTextColor,
									marginTop: 20
								}}
								defaultValue={userEmail ? userEmail : 'example@app.com'}
							/>
						</View>
						<View style={styles.inputWrapper}>
							<Controller
							control={control}
							rules={{
								required: true,
							}}
							render={({field: {onChange, onBlur, value}}) => (
								<ECPasswordInputField
								label={''}
								placeholder={t('password')}
								returnKeyLabel="done"
								returnKeyType="done"
								onChangeText={e => onChange(e)}
								value={value}
								ref={passwordInputRef}
								error={errors.password?.message}
								onBlur={onBlur}
								backgroundColor='#f1f1f1'
								onSubmitEditing={() => {
									confirmPasswordInputRef.current?.focus();
								}}
								/>
							)}
							name="password"
							/>
						</View>
						<View style={styles.inputWrapper}>
							<Controller
							control={control}
							rules={{
								required: true,
							}}
							render={({field: {onChange, onBlur, value}}) => (
								<ECPasswordInputField
								label={''}
								placeholder={t('confirmPassword')}
								returnKeyLabel="done"
								returnKeyType="done"
								onChangeText={e => onChange(e)}
								value={value}
								backgroundColor='#f1f1f1'
								ref={confirmPasswordInputRef}
								error={errors.confirmPassword?.message}
								onBlur={onBlur}
								onSubmitEditing={() => {
									cityInputRef.current?.focus();
								}}
								/>
							)}
							name="confirmPassword"
							/>
						</View>					
						<View style={styles.nameWrapper}>
							<View style={styles.dropdownWrapper}>							
								<SelectDropdown
									// data={countryNames}
									data={['United States']}
									onSelect={(selectedItem, index) => {
										console.log(selectedItem, index);
										countries.map((item) => {
											if (item.name === selectedItem) {
												setCountryCode(item.id);
											}
										});
									}}
									defaultButtonText={'Country'}
									defaultValue={'United States'}
									buttonTextAfterSelection={(selectedItem, index) => {
										return selectedItem;
									}}
									rowTextForSelection={(item, index) => {
										return item;
									}}
									buttonStyle={styles.dropdown2BtnStyle}
									buttonTextStyle={styles.dropdown2BtnTxtStyle}
									renderDropdownIcon={isOpened => {
										return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#4c4c4c'} size={10} />;
									}}
									dropdownIconPosition={'right'}
									dropdownStyle={styles.countrydropdown2DropdownStyle}
									rowStyle={styles.dropdown2RowStyle}
									rowTextStyle={styles.dropdown2RowTxtStyle}
								/>
							</View>						
							<View style={styles.dropdownWrapper}>							
								<SelectDropdown
									data={stateNames}
									onSelect={(selectedItem, index) => {
									console.log(selectedItem, index);
									states.map((item) => {
										if (item.name === selectedItem) {
											setStateCode(item.id);
										}
									});
									}}
									defaultButtonText={'State'}
									buttonTextAfterSelection={(selectedItem, index) => {
									return selectedItem;
									}}
									rowTextForSelection={(item, index) => {
									return item;
									}}
									buttonStyle={styles.dropdown2BtnStyle}
									buttonTextStyle={styles.dropdown2BtnTxtStyle}
									renderDropdownIcon={isOpened => {
									return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#4c4c4c'} size={10} />;
									}}
									dropdownIconPosition={'right'}
									dropdownStyle={styles.dropdown2DropdownStyle}
									rowStyle={styles.dropdown2RowStyle}
									rowTextStyle={styles.dropdown2RowTxtStyle}
								/>
							</View>
						</View>
						<View style={styles.inputWrapper}>
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({field: {onChange, onBlur, value}}) => (
									<ECEmailInputField
										label={''}
										placeholder={t('city')}
										returnKeyLabel="done"
										returnKeyType="done"
										ref={cityInputRef}
										onChangeText={e => onChange(e)}
										onBlur={onBlur}
										value={value}
										backgroundColor='#f1f1f1'
										onSubmitEditing={() => {
											Keyboard.dismiss();
										}}
										error={errors.city?.message}
									/>
								)}
								name="city"
							/>
						</View>
						<PhoneInput
							ref={phoneInput}
							defaultCode="US"
							layout="first"
							autoFocus={false}
							onChangeText={(text) => {
								setPhoneNum(text);
							}}
							onChangeFormattedText={(text) => {
								setFormattedPhoneNum(text);
							}}
							codeTextStyle={{color: '#4c4c4c', fontSize: 10, fontFamily: 'Poppins-Regular'}}
							containerStyle={{
								backgroundColor:'transparent',
								paddingHorizontal: 0,
								paddingVertical: 0,
								height: 50,
								width: '100%',
								borderWidth: 1,
								borderColor: '#c7c7c7',
								borderRadius: 4,   
								marginTop: 14,  
							}} 
							placeholder='Phone Number*'
							textInputStyle={{color:'#000', fontSize:10, height:50, width:250, fontFamily: 'Poppins-Regular'}}
							textInputProps={{keyboardType: 'phone-pad'}}
							textContainerStyle={{backgroundColor:'#f1f1f1'}}
						/>
						<View style={styles.nameWrapper}>
							<View style={styles.input1Wrapper}>
								<Controller
									control={control}
									rules={{
									required: true,
									}}
									render={({field: {onChange, onBlur, value}}) => (
									<ECEmailInputField
										label={''}
										placeholder={t('firstName')}
										returnKeyLabel="done"
										returnKeyType="done"
										onChangeText={e => onChange(e)}
										onBlur={onBlur}
										value={value}
										backgroundColor='#f1f1f1'
										onSubmitEditing={() => Keyboard.dismiss()}
										error={errors.firstName?.message}
									/>
									)}
									name="firstName"
								/>
							</View>
							<View style={styles.input1Wrapper}>
								<Controller
									control={control}
									rules={{
									required: true,
									}}
									render={({field: {onChange, onBlur, value}}) => (
									<ECEmailInputField
										label={''}
										ref={lastnameRef}
										placeholder={t('lastName')}
										returnKeyLabel="done"
										returnKeyType="done"
										onChangeText={e => onChange(e)}
										onBlur={onBlur}
										value={value}
										backgroundColor='#f1f1f1'
										onSubmitEditing={() => Keyboard.dismiss()}
										error={errors.lastName?.message}
									/>
									)}
									name="lastName"
								/>
							</View>
						</View>
						<View style={styles.inputWrapper}>
							<Controller
							control={control}
							rules={{
								required: true,
							}}
							render={({field: {onChange, onBlur, value}}) => (
								<ECEmailInputField
								label={''}
								placeholder={t('companyName')}
								returnKeyLabel="done"
								returnKeyType="done"
								onChangeText={e => onChange(e)}
								onBlur={onBlur}
								backgroundColor='#f1f1f1'
								value={value}
								onSubmitEditing={() => { 
									Keyboard.dismiss();
								}}
								error={errors.companyName?.message}
								/>
							)}
							name="companyName"
							/>
						</View>                    
						<Text style={styles.mustBeLegalText}>{t('mustBeLegal')}</Text>

						<RadioGroup
							style={{ flexDirection: 'row', marginBottom: 8 }}
							checkedId={index}
							icon={{
								normal: require('../../assets/images/unchecked.png'),
								checked: require('../../assets/images/checked.png')
							}}
							textStyle={[{ marginLeft: 5 }, styles.dropdown2BtnTxtStyle]}
							iconStyle={{width: 16, height: 16}}
							onChecked={(id, value) => {
								console.info("Group===", id);
								console.info("Value===", value);
								setIndex(id);
							}}>
							<RadioButton							
								text="Customer"
								value={'customer'} />
							<RadioButton
								style={{ marginLeft: 20 }}
								text="Seller"
								value={'seller'} />
						</RadioGroup>

						<ECButton
							mode="outlined"
							color='#fff'
							disabled={!canContinue}
							variant={!canContinue ? disabledButton : primaryButtonContained}
							onPress={handleSubmit(onSubmitHandler)}
							loading={isLoading === 'pending'}
						>
							{t('continue')}
						</ECButton>
						<View style={{height: 20}}></View>
					</View>		  		
				</ScrollView>
			{/* </KeyboardAvoidingView> */}
		  </ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
  	width: '100%',
  	height: '100%',  	
	justifyContent: 'center',
    alignItems: 'center'
  },
  formContainer: {
  	backgroundColor: 'white',
  	// width: '85%',
  	// height: Dimensions.get('window').height*0.49,
  	shadowColor: 'black',
  	shadowOffset: {
		width: 0,
		height: 5,
	},
	shadowOpacity: 0.54,
	shadowRadius: 6.27,
	elevation: 10,
	marginHorizontal: 24,
	marginBottom: '20%'
  },
  logo: {  	
  	marginTop: 24,
  	marginBottom: 24,
  	width: 140,
  	height: 32,
  	alignSelf: 'center'
  },
  wrapper: {
  	marginLeft: 28,
  	marginRight: 28
  },
  inputWrapper: {
  	marginBottom: 0,
  },
  input1Wrapper: {
	width: '46%',
  },
  dropdownWrapper: {
	paddingTop: 14,
	width: '46%',
  }, 
  nameWrapper: {  	
  	flexDirection: 'row',
  	justifyContent: 'space-between',
  },
  mustBeLegalText: {
	marginVertical: 10,
	color: '#4c4c4c', 
	alignSelf: 'flex-end', 
	fontFamily: 'Poppins-Medium', 
	fontSize: 10
  },
  dropdown2BtnStyle: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#c7c7c7',
	width: '100%',
  },
  dropdown2BtnTxtStyle: {color: '#4c4c4c', textAlign: 'left', fontFamily: 'Poppins-Regular', fontSize: 10},
  dropdown2DropdownStyle: {backgroundColor: '#fff', height: 160},
  dropdown2RowStyle: {backgroundColor: '#fff', borderBottomColor: '#fff', height: 30},
  dropdown2RowTxtStyle: {color: '#4c4c4c', textAlign: 'left', fontFamily: 'Poppins-Regular', fontSize: 10},
  countrydropdown2DropdownStyle: {backgroundColor: '#fff'},
});