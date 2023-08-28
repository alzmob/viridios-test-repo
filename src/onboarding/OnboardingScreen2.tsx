import React from 'react';
import OnboardingScreen from './OnboardingScreen'

const OnboardingScreen2 = () => {
  
  const beanImages = [
    {
      title: 'green',
      file: require('../../assets/images/greenbean.png'),
    },
    {
      title: 'white',
      file: require('../../assets/images/whitebean.png'),
    },
    {
      title: 'green',
      file: require('../../assets/images/greenbean.png'),
    }    
  ];

  const onboardingImage = {
    file: require('../../assets/images/onboarding2.png')
  }

  const introText = 'A place where people and businesses can come to buy coffee'

  const index = 2

  return <OnboardingScreen BeanImages={beanImages} IntroText={introText} Index={index} MainImageUri={onboardingImage} />

}

export default OnboardingScreen2