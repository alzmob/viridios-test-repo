/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  View,
} from 'react-native';
import {ECText} from './ECText';

export interface NavigationItemProps extends TouchableOpacityProps {
  primaryIcon?: Element;
  secondaryIcon?: Element;
  labelColor?: string;
}

export const NavigationItem: FunctionComponent<NavigationItemProps> = props => {
  const {primaryIcon, secondaryIcon, labelColor = '#ffffff', children} = props;

  return (
    <TouchableOpacity style={styles.rootContainer} {...props}>
      <View style={styles.flexContainer}>
        {primaryIcon ? (
          <View style={styles.leftIcon}>{primaryIcon}</View>
        ) : null}
        <ECText
          textColor={labelColor}
          fontSize={15}
          style={[styles.label, {flexBasis: '88%'}]}>
          {children}
        </ECText>
      </View>
      {secondaryIcon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    justifyContent: 'center',
    width: 28,
    height: 28,
    marginRight: 12,
    alignItems: 'center',
  },
  label: {
    flexShrink: 1,
    lineHeight: 24,
  },
});
