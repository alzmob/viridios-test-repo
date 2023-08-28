import React, {
  forwardRef,
  FunctionComponent,
  useCallback,
  useState,
} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ReturnKeyTypeOptions,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ECTextField} from './ECTextField';

interface PasswordInputFieldProps extends TextInputProps {
  label: string;
  placeholder: string;
  error?: string;
  info?: boolean;
  backgroundColor: string;
  color: string;
  borderRadius: number;
  borderColor: string;
  selectionCursorColor: string;
  fontSize: number;
  returnKeyLabel?: ReturnKeyTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
  onChangeText: (value: string) => void;
  onSubmitEditing: () => void;
  onBlur: () => void;
}

export const ECPasswordInputField = forwardRef<
  TextInput,
  PasswordInputFieldProps
>((props, ref) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordHidden(!isPasswordHidden);
  }, [isPasswordHidden]);

  const {
    label,
    placeholder,
    error,
    returnKeyLabel,
    returnKeyType,
    onChangeText,
    onSubmitEditing,
    onBlur,
    backgroundColor,
    color,
    borderColor,
    borderRadius,
    selectionCursorColor,
    fontSize,
    info = false,
  } = props;
  const {t} = useTranslation('account');
  return (
    <ECTextField
      primaryPlaceholder={placeholder}
      primaryLabel={label}
      onChangeText={onChangeText}
      secureTextEntry={isPasswordHidden}
      returnKeyLabel={returnKeyLabel}
      returnKeyType={returnKeyType}
      // ActionComponent={
      //   <PasswordAction
      //     isPasswordHidden={isPasswordHidden}
      //     onAction={togglePasswordVisibility}
      //   />
      // }
      onSubmitEditing={onSubmitEditing}
      onBlur={onBlur}
      info={info}
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
});

const PasswordAction: FunctionComponent<{
  isPasswordHidden: boolean;
  onAction: () => void;
}> = ({isPasswordHidden, onAction}) => {
  return (
    <TouchableOpacity onPress={onAction}>
      <Ionicons
        name={isPasswordHidden ? 'eye-outline' : 'eye-off-outline'}
        color="#A3A8AE"
        size={20}
      />
    </TouchableOpacity>
  );
};
