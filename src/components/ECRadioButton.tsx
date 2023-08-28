/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {useAppTheme} from '../theme';

interface CFRadioButtonProps {
  isSelected: boolean;
}

export const ECRadioButton: FunctionComponent<CFRadioButtonProps> = ({
  isSelected = false,
}) => {
  const {
    colors: {selectedRadioButton, divideColor},
  } = useAppTheme();

  return (
    <View
      style={[
        styles.radioButton,
        {
          borderColor: isSelected ? selectedRadioButton : divideColor,
          borderWidth: 1,
        },
      ]}>
      {isSelected && (
        <View
          style={[
            styles.radioButtonInner,
            {backgroundColor: selectedRadioButton},
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
