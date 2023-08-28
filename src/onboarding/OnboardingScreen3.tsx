import React from 'react';
import OnboardingScreen from './OnboardingScreen'

const OnboardingScreen3 = () => {
  
  const beanImages = [
    {
      title: 'green',
      file: require('../../assets/images/greenbean.png'),
    },
    {
      title: 'green',
      file: require('../../assets/images/greenbean.png'),
    },
    {
      title: 'white',
      file: require('../../assets/images/whitebean.png'),
    }    
  ];

  const onboardingImage = {
    file: require('../../assets/images/onboarding3.png')
  }
  const introText = 'To produce and deliver coffee around the world!'

  const index = 3

	return <OnboardingScreen BeanImages={beanImages} IntroText={introText} Index={index} MainImageUri={onboardingImage}/>

}

export default OnboardingScreen3