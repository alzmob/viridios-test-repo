import {StyleSheet, View, ImageBackground, Image, Text, TouchableOpacity, TextInput, Platform, Dimensions, Keyboard} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {ECButton} from '../components/button/ECButton';
import {useAppTheme} from '../theme';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {setSignInEmailSchema} from './setSchema';
import {RootState} from '../store';
import {resetIsLoading, forgotPasswordThunk} from './signInSlice';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';

const deviceHeight = Dimensions.get('screen').height;

export const ForgotPasswordScreen = () => {

	const {
        colors: {          
            errorInputText,
            primaryTextColor,
            placeholderTextColor          
        },
    	buttons: {primaryButtonContained, disabledButton}
	} = useAppTheme();


	const { t } = useTranslation('account');

	const { navigate } = useNavigation();
    const [emailaddress, setEmailaddress] = useState('');

	const dispatch = useDispatch();
	const {goBack} = useNavigation();

    const resetPassword = () => {
        const data = {
            email: emailaddress,
            redirect_uri: "https://wwww.adulis.com/reset_password",
        }
        dispatch(forgotPasswordThunk(data));
        navigate("signIn");
    }

	return (		
		<View style={styles.container}>
		  {/* <ImageBackground source = { require('../../assets/images/header_bg_et.png')} resizeMode="stretch" style = {styles.backgroundImage}> */}
			<View style={{ marginLeft: 20, marginBottom: 20, marginTop: 60}}>
				<AntDesign
					name="arrowleft"
					color='#ffffff'
					onPress={() => goBack()}
					size={24}
				/>
			</View>
		  	<View style = {styles.formContainer}>
		  		<Image source = {  require('../../assets/images/signinlogo.png')} resizeMode="stretch" style = {styles.logo} />
		  		<View style={styles.wrapper}>

		  			<Text style = {{marginTop: 8, alignSelf: 'flex-start', color: '#4c4c4c', fontSize: 18, fontFamily: 'Poppins-Medium'}}>Forgot Password?</Text>

			        <View style={styles.inputWrapper}>
                        <TextInput
                            placeholder='Email'
                            placeholderTextColor={placeholderTextColor}
                            style={{
                                backgroundColor: '#f1f1f1',
                                height: 50,
                                fontSize: 10,
                                fontFamily: 'Poppins-Regular',
                                padding: 16,
                                borderWidth: 0.5,
                                borderColor: '#c7c7c7',
                                borderRadius: 7,
                                color: primaryTextColor,
                                marginTop: 20
                            }}
                            onChangeText={text => {
                                setEmailaddress(text);
                            }}
                            value={emailaddress}
                        />
				      </View>
                        <TouchableOpacity style={styles.btnreset} onPress={()=> {
                            resetPassword()
                        }}>
                            <Text style={[styles.btnNewText, {color: 'white'}]}>Submit</Text>
                        </TouchableOpacity>
		  		</View>		  		
		  	</View>
		  {/* </ImageBackground> */}
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
    justifyContent: 'flex-start'
	// justifyContent: 'center',
    // alignItems: 'center'
  },
  formContainer: {
  	backgroundColor: 'white',
  	width: '85%',
  	// height: deviceHeight*0.75,
  	shadowColor: 'black',
  	shadowOffset: {
		width: 0,
		height: 5,
	},
	shadowOpacity: 0.54,
	shadowRadius: 6.27,
	elevation: 10,
	alignSelf: 'center'
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
	justifyContent: 'flex-end',
  	flexWrap: 'wrap'
  },
  btnreset: {
    width: '100%',
      height: 50,
      backgroundColor: '#07733c',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: 4,
      marginBottom: 20,
      marginTop: 10
  },
  btnNewText: {
      fontFamily: 'Poppins-Semibold', 
      fontSize: 14
  },
  registerWrapper: {
  	marginTop: 8,
  	flexDirection: 'row',
  	alignSelf: 'center'
  }
});