import {StyleSheet, View, ImageBackground, Image, Text, TouchableOpacity, TextInput, Platform, Dimensions, Keyboard, Linking} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ECButton} from '../../components/button/ECButton';
import {useAppTheme} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {ECEmailInputField} from '../../components/ECEmailInputField';
import {yupResolver} from '@hookform/resolvers/yup';
import CheckBox from '@react-native-community/checkbox';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { OTPNavigationType } from '../SignUpScreen';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { joinusThunk, resetIsJoinUsLoading } from './joinusSlice';
import { googleSignInThunk, resetIsLoading } from '../../otp/otpSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { facebookSignInThunk } from '../../otp/otpSlice';
import { appleSignInThunk } from '../../otp/otpSlice';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { appleAuth } from '@invertase/react-native-apple-authentication';

const deviceHeight = Dimensions.get('screen').height;
interface FormData {
	email: string;
}

export const JoinUsScreen = () => {

	const {
    	buttons: {primaryButtonContained, disabledButton}
	} = useAppTheme();	

	const { t } = useTranslation('account');

	const { navigate, goBack } = useNavigation<OTPNavigationType>();
	const setSchema = yup.object().shape(
		{
			email: yup
				.string()
				.trim()
				.required('email Required')
				.matches(
				/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				'must Be Email',
    		),
			
		}
	);

	const {
	    handleSubmit,
	    control,
	    formState: {isValid, errors},
	} = useForm<FormData>({
	    resolver: yupResolver(setSchema),
	    mode: 'onTouched',
	});

	async function onFacebookButtonPress() {
		const currentAccessToken = await AccessToken.getCurrentAccessToken();

		if (currentAccessToken) {
			return currentAccessToken.accessToken;
		}
	
		const logInResponse = await LoginManager.logInWithPermissions([ 'public_profile', 'email' ]);
	
		if (!logInResponse.isCancelled) {
			const accessTokenObject = await AccessToken.getCurrentAccessToken();
	
			return accessTokenObject.accessToken;
		}
	
		throw new Error('Cancelled');
	}

	async function onAppleButtonPress() {
		// Start the sign-in request
		const appleAuthRequestResponse = await appleAuth.performRequest({
		  requestedOperation: appleAuth.Operation.LOGIN,
		  requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
		});
	  
		// Ensure Apple returned a user identityToken
		if (!appleAuthRequestResponse.identityToken) {
		  throw new Error('Apple Sign-In failed - no identify token returned');
		}
	  
		// Create a Firebase credential from the response
		const { identityToken, nonce } = appleAuthRequestResponse;

		return identityToken;
	  }
	  

	const [toggleCheckBox, setToggleCheckBox] = useState(false);
	const [isGoogleSignIn, setIsGoogleSignIn] = useState(false);
	const canJoin = toggleCheckBox && isValid;	

	const isLoading = useSelector((state: RootState) => state.joinUs.loading);
	const uidb64 = useSelector((state: RootState) => state.joinUs.uidb64);
	const action = useSelector((state: RootState) => state.otp.action);
	const token = useSelector((state: RootState) => state.joinUs.token);
	const dispatch = useDispatch();
	const onSubmitHandler = (data: FormData) => {
		console.log(data);
		dispatch(joinusThunk(data));		
	}

	useEffect(() => {
		if (isLoading === 'succeeded') {	
			dispatch(resetIsJoinUsLoading());		
			navigate('OTP', {verifyEmail: true, uidb64: uidb64, token: token});
		}
		return () => {}
	}, [isLoading]);

	useEffect(() => {
		if (action == 'signup' && isGoogleSignIn) {
			navigate('SignUp');
		}
	}, [action, isGoogleSignIn]);
	return (		
		<View style={styles.container}>
		  <ImageBackground source = { require('../../../assets/images/signinbg.png')} resizeMode="stretch" style = {styles.backgroundImage}>
		  	<View style={{ marginLeft: 20, marginBottom: 20, alignSelf: 'flex-start'}}>
				<AntDesign
					name="arrowleft"
					color='#ffffff'
					onPress={() => goBack()}
					size={24}
				/>
			</View>
		  	<View style = {styles.formContainer}>
		  		<Image source = {  require('../../../assets/images/signinlogo.png')} resizeMode="stretch" style = {styles.logo} />
		  		<View style={styles.wrapper}>

			      	<TouchableOpacity style={styles.socialButton} onPress = { () => {
						onFacebookButtonPress().then((res) => {
							dispatch(facebookSignInThunk(res.accessToken));
							if (action == 'signup') {
								navigate('SignUp');
							}
						});
					}}>
				      <ImageBackground source={require('../../../assets/images/fbbutton1.png')} resizeMode="stretch" style={styles.btnSocialImage}>
				      	<Text style={styles.btnfbText}>Continue with Facebook</Text>
				      </ImageBackground>				      
				    </TouchableOpacity>

					<TouchableOpacity style={styles.socialButton} onPress = { () => {
						
						GoogleSignin.configure({
							iosClientId: "566364425060-bgp7fa2e3n4d5leeevuktuuppufibrlm.apps.googleusercontent.com",
							webClientId: "566364425060-m0muqib2sdc2ja08qrrplrdruecv7gij.apps.googleusercontent.com", 
      						offlineAccess: true
						});
						GoogleSignin.hasPlayServices().then((hasPlayService) => {
							if (hasPlayService) {
								GoogleSignin.signIn().then((userInfo) => {
									console.log(JSON.stringify(userInfo));
									setIsGoogleSignIn(true);	
									GoogleSignin.getTokens().then((res) => {
										console.log('Get Token Response', JSON.stringify(res));	
										setIsGoogleSignIn(false);									
										dispatch(googleSignInThunk(res.accessToken));
										
										// if (action == 'signup') {
										// 	navigate('SignUp');
										// }
									}).catch((e) => {
										console.log('Error: ' + JSON.stringify(e))
									})
								}).catch((e) => {
									console.log("ERROR IS: " + JSON.stringify(e));
								})								
						   	}
						}).catch((e) => {
							console.log("ERROR IS: " + JSON.stringify(e));
						})
					}}>
				      <ImageBackground source={require('../../../assets/images/btngoogle1.png')} resizeMode="stretch" style={styles.btnSocialImage}>
				      	<Text style={styles.btngoogleText}>Continue with Google</Text>
				      </ImageBackground>
				    </TouchableOpacity>
		  			
				    <TouchableOpacity style={styles.socialButton} onPress = { () => { 
						onAppleButtonPress().then((res) => {
							dispatch(appleSignInThunk(res));
							if (action == 'signup') {
								navigate('SignUp');
							}
						});
					}}>
				      <ImageBackground source={require('../../../assets/images/signinapple2.png')} resizeMode="stretch" style={styles.btnSocialImage}>
				      	<Text style={styles.btngoogleText}>Continue with Apple</Text>
				      </ImageBackground>
				    </TouchableOpacity>

		  			<Text style = {{marginTop: 8, alignSelf: 'center', color: '#4c4c4c', fontSize: 10, fontFamily: 'Poppins-Medium'}}>{t('or')}</Text>

			        <View style={styles.inputWrapper}>
				        <Controller
				          control={control}
				          rules={{
				            required: true,
				          }}
				          render={({field: {onChange, onBlur, value}}) => (
				            <ECEmailInputField
								label=''
								placeholder={t('email')}
								returnKeyLabel="next"
								returnKeyType="next"
								onChangeText={e => onChange(e)}
								onBlur={onBlur}
								value={value}
								backgroundColor='#f1f1f1'
								onSubmitEditing={() => Keyboard.dismiss()}
								error={errors.email?.message}
				            />
				          )}
				          name="email"
				        />
				      </View>				      
				      <View style={styles.termsWrapper}>
						{
							Platform.OS === 'ios' 
							?
							<CheckBox
								style={{width: 15, height: 15, marginRight: 4}}
								disabled={false}
								value={toggleCheckBox}
								boxType="square"
								onCheckColor="#07733c"
								onTintColor="#07733c"
								onValueChange={() => toggleCheckBox ? setToggleCheckBox(false) : setToggleCheckBox(true)}
							/>
							:
							<CheckBox	
								style={{width: 15, height: 15, marginRight: 14, marginLeft: -6}}							
								disabled={false}
								value={toggleCheckBox}
								tintColors={{true: '#07733c', false: '#c7c7c7'}}
								onValueChange={() => setToggleCheckBox(!toggleCheckBox)}
							/>
						}
						<Text style={{fontSize: 10, color: '#4c4c4c', fontFamily: 'Poppins-Medium'}}>By signing in, I agree with </Text>
				      	<TouchableOpacity onPress = { () => Linking.openURL('https://www.adulis.com/terms_and_conditions') }>
				      		<Text style={{color: '#3f66b1', fontSize: 10, fontFamily: 'Poppins-Medium'}}>{t('terms')}</Text>
				      	</TouchableOpacity>
				      	<Text style={{fontSize: 10, color: '#4c4c4c', fontFamily: 'Poppins-Medium', marginLeft: 16}}> of Adulis</Text>						
				      	
				      </View>

				      <ECButton
				          mode="outlined"
						  disabled={!canJoin} 
						  variant={!canJoin ? disabledButton : primaryButtonContained}
						  onPress={handleSubmit(onSubmitHandler)}
						  loading={isLoading === 'pending'}
					  	>
				          {t('joinUs')}
				      </ECButton>

				      <View style={styles.registerWrapper}>
				      	<Text style={{color: '#4c4c4c', fontFamily: 'Poppins-Medium', fontSize: 10}}>{t('alreadyHaveAccount')} </Text>
				      	<TouchableOpacity onPress = { () => navigate('SignIn') }>
				      		<Text style={{color: '#3f66b1', textDecorationLine: 'underline', fontFamily: 'Poppins-Medium', fontSize: 10}}>{t('signIn')}</Text>
				      	</TouchableOpacity>
				      </View>					  
		  		</View>	
		  	</View>
			
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
  	width: '85%',
  	height: deviceHeight*0.75,
  	shadowColor: 'black',
  	shadowOffset: {
		width: 0,
		height: 5,
	},
	shadowOpacity: 0.54,
	shadowRadius: 6.27,
	elevation: 10,
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
  termsWrapper: {
  	flexDirection: 'row',
  	width: '100%',
  	marginTop: 16,
  	marginBottom: 24,
  	flexWrap: 'wrap'
  },
  socialButton: {		 
    width: '100%', 
    height: deviceHeight < 700 ? 45 : 50,     
	borderColor: '#d2d2d2',
	borderWidth: 1,
    marginVertical: 8,
  },
  btnSocialImage: {
  	width: '100%', 
  	height: '100%', 
  	justifyContent: 'center', 
  	alignItems: 'center'
  },
  btnfbText: {
    fontSize: 10, 
    color: 'white', 
    fontFamily: 'Poppins-Medium'
  },
  btngoogleText: {
	fontSize: 10, 
	color: '#4c4c4c', 
	fontFamily: 'Poppins-Medium'
  },
  registerWrapper: {
  	marginTop: 8,
  	flexDirection: 'row',
  	alignSelf: 'center'
  },
  formContainer1: {
	backgroundColor: 'white',
	width: '100%',
	height: deviceHeight*0.36,
  },
  inputWrapper1: {
	marginBottom: 40,
  },

});