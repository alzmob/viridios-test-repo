import React, {forwardRef} from 'react';
import {useTranslation} from 'react-i18next';
import {ReturnKeyTypeOptions, TextInput, TextInputProps} from 'react-native';
import {ECTextField} from './ECTextField';

interface EmailInputFieldProps extends TextInputProps {
  label: string;
  placeholder: string;
  returnKeyType?: ReturnKeyTypeOptions;
  returnKeyLabel?: ReturnKeyTypeOptions;
  error?: string;
  backgroundColor?: string;
  color: string;
  borderRadius: number;
  borderColor: string;
  selectionCursorColor: string;
  fontSize: number;
  onChangeText: (value: string) => void;
  onSubmitEditing: () => void;
  onBlur: () => void;
  value: string;
}

export const ECEmailInputField = forwardRef<TextInput, EmailInputFieldProps>(
  (props, ref) => {
    const {
      label,
      placeholder,
      error,
      backgroundColor,
      color,
      borderColor,
      borderRadius,
      selectionCursorColor,
      fontSize,
      returnKeyType,
      returnKeyLabel,
      onChangeText,
      onSubmitEditing,
      onBlur,
      value
    } = props;
    const {t} = useTranslation('account');
    return (
      <ECTextField
        primaryPlaceholder={placeholder}
        primaryLabel={label}
        returnKeyType={returnKeyType}
        returnKeyLabel={returnKeyLabel}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        onBlur={onBlur}
        value={value}
        ref={ref}
        backgroundColor={backgroundColor}
        textColor={color}
        borderColor={borderColor}
        borderRadius={borderRadius}
        selectionCursorColor={selectionCursorColor}
        fontSize={fontSize}
        error={error ? t(error) : ''}
      />
    );
  },
);
