import React, {FunctionComponent} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {ButtonVariantStyle} from '../../theme/buttonTheme';
import Button, {Props as ButtonProps} from './Button';

type IconPosition = 'left' | 'right';
type LabelPosition = 'left' | 'center';

export type ECButtonProps = ButtonProps & {
  iconPosition?: IconPosition;
  labelPosition?: LabelPosition;
  variant?: ButtonVariantStyle;
  buttonHeight?: number;
};

const deviceHeight = Dimensions.get('screen').height;

export const ECButton: FunctionComponent<ECButtonProps> = props => {
  const {
    children,
    iconPosition = 'right',
    labelPosition = 'center',
    variant,
    buttonHeight = deviceHeight < 700 ? 45 : 50,
    labelStyle,
    contentStyle,
    style,
  } = props;

  const labelPositionValue = labelPosition === 'left' ? 'flex-start' : 'center';
  const labelPaddingLeftValue = labelPosition === 'left' ? 22 : 0;
  const iconPositionStyle = iconPosition === 'left' ? {left: 22} : {right: 22};
  const buttonColor = variant?.labelStyle?.color;

  return (
    <Button
      contentStyle={[
        {
          justifyContent: labelPositionValue,
          height: buttonHeight,
          paddingLeft: labelPaddingLeftValue,
        },
        contentStyle,
      ]}
      iconStyle={iconPositionStyle}
      style={[styles.container, variant?.containerStyle, style, {borderRadius: 4}]}
      labelStyle={[styles.labelStyle, variant?.labelStyle, labelStyle]}
      uppercase={false}
      color={buttonColor}
      {...props}>
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelStyle: {
    marginVertical: 0,
    marginHorizontal: 0,
    letterSpacing: 0,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
});
