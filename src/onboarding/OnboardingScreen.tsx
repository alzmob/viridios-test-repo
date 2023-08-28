import React, {FunctionComponent} from 'react';
import {StyleSheet, View, Text, ImageBackground, Image, Dimensions, TouchableOpacity, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAppTheme} from '../theme';
import {MyStatusBar} from '../components/ECStatusBar';
import {useDispatch} from 'react-redux';
import {setIsOnboardingSeen} from './onboardingSlice';

interface OnboardingScreenProps {
	BeanImages: any,
	IntroText: string,
	Index: Number,
	MainImageUri: any
}

const OnboardingScreen: FunctionComponent<OnboardingScreenProps> = ({
	BeanImages, IntroText, Index, MainImageUri
}) => {
	const {navigate} = useNavigation();
 	const {
  	colors: {onBoardingBackgroundColor},
	} = useAppTheme();

  const dispatch = useDispatch()
	const switchNavigation = (index: Number) => {
		switch(index) {
      case 1:
        navigate('OnboardingScreen2');
        break;	      
      case 2:
        navigate('OnboardingScreen3');
        break;	 
      case 3:
        dispatch(setIsOnboardingSeen());
        break;	      
      default:
        break;    
      }
	}

	const styling = (whiteBean:boolean) =>
	StyleSheet.create({
		beanStyle:{
			height: whiteBean ? 45 : 34,
			width: whiteBean ? 40: 30
		}
	});

	return (
	    <View style={[styles.root, {backgroundColor: onBoardingBackgroundColor}]}>
	      <MyStatusBar/>
	      <ImageBackground source = { require('../../assets/images/onboardingbg.png') } resizeMode="stretch" style = { styles.backgroundImage }>
	      	<View style = { styles.imageWrapper }>
		        <Image source = { MainImageUri.file } resizeMode="contain" style={styles.onBoardingImage} />
		        <View style = { styles.beanImageWrapper }>
		        	{BeanImages && BeanImages.map((beanImage, index) => {
		        		const isWhite = beanImage.title == 'white'
		        		const beanStyles = styling(isWhite)
			        	return (	
			        		<Image key={index} source={beanImage.file} resizeMode="stretch" style={[styles.bean, beanStyles.beanStyle]}/>
			        	)
			        })}
		        </View>	        
		        <Text style = {styles.text}>{IntroText}</Text>
		      </View>
	      </ImageBackground>	      
	      <View style = {styles.onboardingBottom}>
			<View style={{width:'50%'}}>
				<TouchableOpacity style={styles.btnSkip} onPress = { () => {dispatch(setIsOnboardingSeen())}}>   
				    <Text style={styles.btnText}>SKIP</Text>	        
				</TouchableOpacity>
			</View>				
			<View style={{width:'50%'}}>
				<TouchableOpacity style={styles.btnNext} onPress = {() =>  switchNavigation(Index)}>
				    <Text style={styles.btnText}>NEXT</Text>
				</TouchableOpacity>
			</View>
	      </View>
	    </View>
  	);
}

const styles = StyleSheet.create({
  root: { 
    flex: 1,
    width: '100%'
  },
  backgroundImage: {
  	flex: 1,
  	width: '100%',
  	height: 'auto',
  },
  imageWrapper: {
    alignItems: 'center'    
  },
  onBoardingImage: {
    height: Dimensions.get('window').height * 0.54,
  },
  beanImageWrapper: {
  	flexDirection: 'row',
  	alignItems: 'center',
  	marginTop: 50,
  	marginBottom: 20,
  	width: 160
  },
  bean: {
  	marginLeft: 10,
  	marginRight: 10
  },
  text: {
  	width: 232,
  	color: 'white',
  	fontSize: 20,
  	textAlign: 'center',
    fontFamily: 'Poppins-SemiBold'
  },
  onboardingBottom: {  
  	height: '10%',
  	width: '100%',
  	flexDirection: 'row',
  	// justifiyContent: 'space-between',
  	alignItems: 'center'
  },
  btnNext: {
  	width:'30%', 
  	alignSelf:'flex-end',
  	marginRight: 16
  },
  btnSkip: {
  	width:'30%', 
  	alignSelf:'flex-start',
  	marginLeft: 16
  },
  btnText: {
  	fontSize: 18,
  	color: '#07733c',
    fontFamily: 'Poppins-SemiBold'
  }
});

export default OnboardingScreen