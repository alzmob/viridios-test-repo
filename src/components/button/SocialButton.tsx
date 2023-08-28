import React, { FunctionComponent } from 'react';
import { StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { Divider } from '../Divider';

interface SocialButtonProps {
  Icon: any;
  Label: string;
  ButtonColor: string;
  OnPress: any;
  DividerColor: string;
};

export const SocialButton: FunctionComponent<SocialButtonProps> = props => {
  const {
    Icon, Label, ButtonColor, OnPress, DividerColor
  } = props;
  
  return (
    <TouchableOpacity style={[styles.container, {backgroundColor: {ButtonColor}}]} onPress = { OnPress }>
      <Image source={Icon} style={styles.image} />
      <Divider color={DividerColor} style={styles.devider}/>
      <Text style={styles.text}>{Label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
	container: {		 
    flexDirection: 'row', 
    width: '100%', 
    height: 57, 
    alignItems: 'center'
	},
  image: {
    marginLeft: 20, 
    marginRight: 10, 
    height: 28, 
    width: 12
  },
  devider: {
    marginVertical: 10
  },
  text: {
    fontSize: 16
  }
});
