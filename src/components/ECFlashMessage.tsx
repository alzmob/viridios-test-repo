/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent} from 'react';
import {StyleSheet, TouchableOpacity, View, Platform} from 'react-native';
import {
  hideMessage,
  MessageComponentProps,
  MessageType,
} from 'react-native-flash-message';
import {ECText} from './ECText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppTheme} from '../theme/theme';

type FlashMessageColorModel = {[key in MessageType]: string};

export const ECFlashMessage: FunctionComponent<
  MessageComponentProps
> = props => {
  const {
    message: {message, type},
  } = props;

  const {
    colors: {
      flashMessageDangerBackgroundColors,
      flashMessageInfoBackgroundColors,
      flashMessageSuccessBackgroundColors,
      flashMessageTextColor,
      flashMessageWarningBackgroundColors,
      flashMessageWarningTextColor,
      white,
    },
  } = useAppTheme();

  const {top} = useSafeAreaInsets();

  const flashMessageIcons: Record<MessageType, Element> = {
    none: () => null,
    default: () => null,
    info: (
      <Ionicons
        name="information-circle-outline"
        size={32}
        color={flashMessageTextColor}
      />
    ),
    danger: <Octicons name="stop" size={32} color={flashMessageTextColor} />,
    success: (
      <Ionicons
        name="ios-checkmark-circle-outline"
        size={32}
        color={flashMessageTextColor}
      />
    ),
    warning: (
      <Ionicons
        name="warning-outline"
        size={32}
        color={white}
      />
    ),
  };

  const flashMessageBackgroundColors: FlashMessageColorModel = {
    none: white,
    default: white,
    info: flashMessageInfoBackgroundColors,
    success: flashMessageSuccessBackgroundColors,
    danger: flashMessageDangerBackgroundColors,
    warning: flashMessageSuccessBackgroundColors,
  };

  const flashMessageTextColors: FlashMessageColorModel = {
    none: white,
    default: white,
    info: flashMessageTextColor,
    success: flashMessageTextColor,
    danger: flashMessageTextColor,
    warning: white,
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            type && flashMessageBackgroundColors[type as MessageType],
          paddingTop: Platform.OS === 'android' ? 45 : top,
        },
      ]}>
      {flashMessageIcons[type as MessageType]}
      <ECText
        fontSize={13}
        textColor={flashMessageTextColors[type as MessageType]}
        style={styles.message}>
        {message}
      </ECText>
      <TouchableOpacity onPress={() => hideMessage()} style={styles.dismiss}>
        <ECText
          bold
          fontSize={15}
          textColor={flashMessageTextColors[type as MessageType]}>
          OK
        </ECText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  message: {flex: 1, marginLeft: 10, marginRight: 27, lineHeight: 20},
  dismiss: {
    width: 75,
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
  },
});
