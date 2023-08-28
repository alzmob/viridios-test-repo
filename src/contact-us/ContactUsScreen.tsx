import {StyleSheet, View, ImageBackground, Image, Text, ScrollView, TextInput, Platform, Dimensions, Keyboard} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {ECButton} from '../components/button/ECButton';
import {setSignUpEmailSchema} from './setSchema';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {ECEmailInputField} from '../components/ECEmailInputField';
import {useAppTheme} from '../theme';
import {useTranslation} from 'react-i18next';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { ECHeader } from '../components/header/ECHeader';
import { MyStatusBar } from '../components/ECStatusBar';
import { contactUsThunk } from './contactUsSlice';

interface FormData {
	email: string;
	firstName: string;
	lastName: string;
	companyName: string;
    phoneNumber: string;
    address: string;
    comments: string;
}

export const ContactUsScreen = () => {

    const {
    	buttons: {primaryButtonContained, disabledButton},
		colors: {placeholderTextColor, primaryTextColor}
	} = useAppTheme();	

    const {t} = useTranslation('account');

    const emailInputRef = useRef<TextInput>(null);
    const lastNameRef = useRef<TextInput>(null);
	const firstNameRef = useRef<TextInput>(null);
	const companyNameRef = useRef<TextInput>(null);
	const phoneNumberRef = useRef<TextInput>(null);
    const addressRef = useRef<TextInput>(null);
	const commentsRef = useRef<TextInput>(null);
	
	const dispatch = useDispatch();
	const isLoading = useSelector((state: RootState) => state.contactUs.loading);

    const {
	    handleSubmit,
	    control,
	    formState: {isValid, errors}
	} = useForm<FormData>({
	    resolver: yupResolver(setSignUpEmailSchema),
	    mode: 'onTouched'		
	});


    const onSubmitHandler = (form: FormData) => {

		const data = {
            email: form.email,
			first_name: form.firstName,
			last_name: form.lastName,
			company_name: form.companyName,
			phone_number: form.phoneNumber,	
            address: form.address,
            comments: form.comments
		}
		console.log('Contact Us Data', data);
        dispatch(contactUsThunk(data));
	};

	useEffect(() => {
		
	}, []);

    return (
        <View style={styles.container}>
            <MyStatusBar />
            <ECHeader 
                screenTitle='Contact Us'
                goBackIcon={true}
            />	  
		  	<ScrollView style = {styles.scrollView}>		  		
		  		<View style={styles.formContainer}>
		  						        
				    <View style={styles.inputWrapper}>
				        <Controller
				          control={control}
				          rules={{
				            required: true,
				          }}
				          render={({field: {onChange, onBlur, value}}) => (
				            <ECEmailInputField
							  label={''}
				              placeholder={t('email')}
				              returnKeyLabel="done"
				              returnKeyType="done"
				              onChangeText={e => onChange(e)}
				              value={value}
				              ref={emailInputRef}
				              error={errors.email?.message}
				              onBlur={onBlur}
							  backgroundColor='#f1f1f1'
				              onSubmitEditing={() => {
				                firstNameRef.current?.focus();
				              }}
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
				            <ECEmailInputField
							  label={''}
				              placeholder={t('firstName')}
				              returnKeyLabel="done"
				              returnKeyType="done"
				              onChangeText={e => onChange(e)}
				              value={value}
				              ref={firstNameRef}
				              error={errors.firstName?.message}
				              onBlur={onBlur}
							  backgroundColor='#f1f1f1'
				              onSubmitEditing={() => {
				                lastNameRef.current?.focus();
				              }}
				            />
				          )}
				          name="firstName"
				        />
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
				              placeholder={t('lastName')}
				              returnKeyLabel="done"
				              returnKeyType="done"
				              onChangeText={e => onChange(e)}
				              value={value}
				              ref={lastNameRef}
				              error={errors.lastName?.message}
				              onBlur={onBlur}
							  backgroundColor='#f1f1f1'
				              onSubmitEditing={() => {
				                companyNameRef.current?.focus();
				              }}
				            />
				          )}
				          name="lastName"
				        />
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
				              value={value}
				              ref={companyNameRef}
				              error={errors.companyName?.message}
				              onBlur={onBlur}
							  backgroundColor='#f1f1f1'
				              onSubmitEditing={() => {
				                phoneNumberRef.current?.focus();
				              }}
				            />
				          )}
				          name="companyName"
				        />
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
				              placeholder={t('phoneNumber')}
				              returnKeyLabel="done"
				              returnKeyType="done"
				              onChangeText={e => onChange(e)}
				              value={value}
				              ref={phoneNumberRef}
				              error={errors.phoneNumber?.message}
				              onBlur={onBlur}
							  backgroundColor='#f1f1f1'
				              onSubmitEditing={() => {
				                addressRef.current?.focus();
				              }}
				            />
				          )}
				          name="phoneNumber"
				        />
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
				              placeholder={t('address')}
				              returnKeyLabel="done"
				              returnKeyType="done"
				              onChangeText={e => onChange(e)}
				              value={value}
				              ref={addressRef}
				              error={errors.address?.message}
				              onBlur={onBlur}
							  backgroundColor='#f1f1f1'
				              onSubmitEditing={() => {
				                commentsRef.current?.focus();
				              }}
				            />
				          )}
				          name="address"
				        />
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
				              placeholder={t('comments')}
				              returnKeyLabel="done"
				              returnKeyType="done"
				              onChangeText={e => onChange(e)}
				              value={value}
				              ref={commentsRef}
				              error={errors.comments?.message}
				              onBlur={onBlur}
							  backgroundColor='#f1f1f1'
				              onSubmitEditing={() => {
				                commentsRef.current?.focus();
				              }}
				            />
				          )}
				          name="comments"
				        />
				    </View> 
                    <View style={{height: 20}}></View>
                    <ECButton
                        mode="outlined"
                        color='#fff'
                        disabled={!isValid}
                        variant={!isValid ? disabledButton : primaryButtonContained}
                        onPress={handleSubmit(onSubmitHandler)}
                        loading={isLoading === 'pending'}
                    >
                        {t('continue')}
                    </ECButton>
                    <View style={{height: 20}}></View>	 
		  		</View>	
				<View style={styles.contactInfo}>
					<Text style={[styles.infoText, {fontSize: 18, textAlign: 'center'}]}>Get in Touch</Text>
					<View style={{flexDirection: 'row', alignItems: 'center'}}>
						<View style={styles.infoIcon}>
							<FontAwesome name={'phone'} color={'#fff'} size={15} />
						</View>
						<Text style={styles.infoText}>+1(510)900-7584</Text>
					</View>
					
					<View style={{flexDirection: 'row', alignItems: 'center'}}>
						<View style={styles.infoIcon}>
							<FontAwesome name={'envelope'} color={'#fff'} size={15} />
						</View>
						<Text style={styles.infoText}>support@adulis.com</Text>
					</View>
					<View style={{flexDirection: 'row', }}>
						<View style={styles.infoIcon}>
							<Ionicons name={'location-sharp'} color={'#fff'} size={15} />
						</View>
						<Text style={styles.infoText}>11420 Santa Monica Blvd Unit 25098, Los Angeles, CA 90025</Text>
					</View>
				</View>
                  		
		  	</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',  	
  },  
  scrollView: {  	
	
  },  
  formContainer: {
    marginTop: 12,
  	marginHorizontal: 24
  },
  inputWrapper: {
  	marginBottom: 0,
  }, 
  contactInfo: {
    backgroundColor: '#07733c',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    margin: 24,
    padding: 12
  },
  infoIcon: {
    width: 30, 
    height: 30, 
    borderRadius: 15, 
    borderColor: '#fff', 
    borderWidth: 2, 
    justifyContent: 'center', 
    alignItems: 'center',
    margin: 4
  },
  infoText: {
    color: '#fff', 
    fontSize: 16, 
    fontFamily: 'Poppins-Medium',
    width: 200
  }
});