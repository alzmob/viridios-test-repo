import React from 'react';
import OnboardingScreen from './OnboardingScreen'

const OnboardingScreen1 = () => {
  
  const beanImages = [
    {
      title: 'white',
      file: require('../../assets/images/whitebean.png'),
    },
    {
      title: 'green',
      file: require('../../assets/images/greenbean.png'),
    },
    {
      title: 'green',
      file: require('../../assets/images/greenbean.png'),
    }    
  ];

  const onboardingImage = {
    file: require('../../assets/images/onboarding1.png')
  }

  const introText = 'The Earth\'s Coffee Hub'

  const index = 1

	return <OnboardingScreen BeanImages={beanImages} IntroText={introText} Index={index} MainImageUri={onboardingImage}/>

}

export default OnboardingScreen1