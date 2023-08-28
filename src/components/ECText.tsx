/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, PropsWithChildren} from 'react';
import {Text, TextProps} from 'react-native';
import {useAppTheme} from '../theme';

export interface ECText extends TextProps {
  bold?: boolean;
  textColor?: string;
  children?: any;
  fontSize: number;
  textAlign?: 'right' | 'center' | 'left' | 'auto' | 'justify';
  passive?: boolean;
}

export const ECText: FunctionComponent<ECText> = (
  props: PropsWithChildren<ECText>,
) => {
  const {
    colors: {primaryTextColor},
  } = useAppTheme();
  const {
    style: customStyle,
    bold,
    children,
    fontSize,
    textColor,
    textAlign,
  } = props;

  const fontFamily = bold ? 'Poppins-Bold' : 'Poppins-Regular';

  return (
    <Text
      {...props}
      style={[
        customStyle,
        {
          fontFamily: fontFamily,
          fontSize,
          color: textColor ? textColor : primaryTextColor,
          textAlign,
        },
      ]}>
      {children}
    </Text>
  );
};
