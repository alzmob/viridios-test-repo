import {StyleSheet, View, ImageBackground, Image, Text, TouchableOpacity, TextInput, Platform, Dimensions, Keyboard} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {ECButton} from '../components/button/ECButton';
import {useAppTheme} from '../theme';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {ECEmailInputField} from '../components/ECEmailInputField';
import {ECPasswordInputField} from '../components/ECPasswordInputField';
import {yupResolver} from '@hookform/resolvers/yup';
import {setSignInEmailSchema} from './setSchema';
import {RootState} from '../store';
import {resetIsLoading, signInThunk} from './signInSlice';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';

const deviceHeight = Dimensions.get('screen').height;

interface FormData {
	email: string;
	password: string;
}

export const SignInScreen = () => {

	const {
    	buttons: {primaryButtonContained, disabledButton}
	} = useAppTheme();	


	const { t } = useTranslation('account');

	const { navigate } = useNavigation();
	const passwordInputRef = useRef<TextInput>(null);
	const {
	    handleSubmit,
	    control,
	    formState: {isValid, errors},
	} = useForm<FormData>({
	    resolver: yupResolver(setSignInEmailSchema),
	    mode: 'onTouched',
	});

	const onSubmitHandler = (data: FormData) => {
	    // dispatch(signInThunk(data));
		navigate('Main');
	};
	
	// useEffect(() => {
	// 	if (isLoggedIn) {
	// 		navigate('Home');
	// 	}
	// }, [isLoggedIn]);

	return (		
		<View style={styles.container}>
		  	<View style = {styles.formContainer}>
		  		<Image source = {  require('../../assets/images/viridios_ai_logo.png')} resizeMode="contain" style = {styles.logo} />
		  		<Text style={styles.headertitle}>Welcome</Text>
				<View style={styles.wrapper}>
		  			
			        <View style={styles.inputWrapper}>
				        <Controller
				          control={control}
				          rules={{
				            required: true,
				          }}
				          render={({field: {onChange, onBlur, value}}) => (
				            <ECEmailInputField
							  label=''
				              placeholder={t('Email address')}
							  placeholderTextColor='#ffffff'
				              returnKeyLabel="next"
				              returnKeyType="next"
				              onChangeText={e => onChange(e)}
				              onBlur={onBlur}
				              value={value}
							  backgroundColor='#2b2b2b'
							  color='white'
							  borderColor='white'
							  selectionCursorColor='white'
							  fontSize={14}
							  borderRadius={10}
				              onSubmitEditing={() => passwordInputRef.current?.focus()}
				              error={errors.email?.message}
				            />
				          )}
				          name="email"
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
							  label=''
				              placeholder={t('Password')}
							  placeholderTextColor='#ffffff'
				              returnKeyLabel="done"
				              returnKeyType="done"
				              onChangeText={e => onChange(e)}
				              value={value}
				              ref={passwordInputRef}
				              error={errors.password?.message}
				              onBlur={onBlur}
							  backgroundColor='#2b2b2b'
							  color='white'
							  borderColor='white'
							  selectionCursorColor='white'
							  fontSize={14}
							  borderRadius={10}
				              onSubmitEditing={() => {
				                Keyboard.dismiss();
				              }}
				            />
				          )}
				          name="password"
				        />
				      </View>

				      <ECButton
				          mode="outlined"
						  disabled={!isValid}
						  variant={!isValid ? disabledButton : primaryButtonContained}
						  onPress={handleSubmit(onSubmitHandler)}
						//   loading={isLoading === 'pending'}
						  style={styles.signinbtn}
						>
				          {t('signIn')}
				      </ECButton>
				      <View style={styles.termsWrapper}>
					  	<TouchableOpacity onPress = { () => navigate('ForgotPassword') }>
				      		<Text style={{color: '#88ad1f', textAlign: 'right', textDecorationLine: 'underline', fontFamily: 'Poppins-Medium', fontSize: 10}}>Forgot Password?</Text>
				      	</TouchableOpacity>
				      </View>

				      {/* <View style={styles.registerWrapper}>
				      	<Text style={{color: '#4c4c4c', fontFamily: 'Poppins-Medium', fontSize: 10}}>{t('newToAdulis')} </Text>
				      	<TouchableOpacity onPress = { () => navigate('JoinUs') }>
				      		<Text style={{color: '#3f66b1', textDecorationLine: 'underline', fontFamily: 'Poppins-Medium', fontSize: 10}}>{t('createAnAccount')}</Text>
				      	</TouchableOpacity> 
				      </View>*/}

		  		</View>		  		
		  	</View>
		</View>
	);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: '#3b3b3b'
  },
  backgroundImage: {
  	width: '100%',
  	height: '100%',  	
	justifyContent: 'center',
    // alignItems: 'center'
  },
  formContainer: {
  	backgroundColor: '#2b2b2b',
  	width: '85%',
	padding: 10,
  	shadowColor: 'black',
  	shadowOffset: {
		width: 0,
		height: 5,
	},
	shadowOpacity: 0.54,
	shadowRadius: 6.27,
	elevation: 10,
	alignSelf: 'center',
	position: 'relative',
	borderRadius: 10
  },
  headertitle: {
	color: 'white',
	fontSize: 28,
	textAlign: 'center',
	fontWeight: 'bold',
	marginBottom: 20
  },
  logo: {  	
	top: -80,
  	width: 140,
  	height: 140,
  	alignSelf: 'center',
	marginBottom: -85
  },
  wrapper: {
  	marginLeft: 28,
  	marginRight: 28
  },
  inputWrapper: {
  	marginBottom: 10,
  },
  termsWrapper: {
  	flexDirection: 'row',
  	width: '100%',
  	marginTop: 16,
  	marginBottom: 24,
	justifyContent: 'center',
  	flexWrap: 'wrap',
  },
  signinbtn: {
	backgroundColor: '#88ad1f',
	color: 'white',
	fontSize: 16,
	marginTop: 28
  },
  socialButton: {		 
    width: '100%', 
    height: deviceHeight < 700 ? 45 : 50,     
	borderColor: '#d2d2d2',
	borderWidth: 1,
	borderRadius: 3,
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
  }
});