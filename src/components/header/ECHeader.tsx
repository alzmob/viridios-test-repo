/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useAppTheme} from '../../theme';
import {ECText} from '../ECText';
import {usePreventGoBack} from './usePreventGoBack';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const SCREEN_HEADER_HEIGHT = 50;

export interface ScreenHeaderProps {
  screenTitle: string;
  preventGoBack?: boolean;
  goBackIcon?: boolean;
}

export const ECHeader: FunctionComponent<ScreenHeaderProps> = props => {
  const {
    colors: {backgroundColor, primaryTextColor, statusBarBackgroundColor},
  } = useAppTheme();
  const {screenTitle, preventGoBack, goBackIcon = true} = props;

  const {goBack} = useNavigation();

  usePreventGoBack(preventGoBack);

  return (
    <View style={[styles.container, {backgroundColor: statusBarBackgroundColor}]}>
      <View style={styles.iconContainer}>
        {goBackIcon ? (
          <AntDesign
            name="arrowleft"
            color={primaryTextColor}
            onPress={() => goBack()}
            size={24}
          />
        ) : (
          <TouchableOpacity
            style={styles.cancel}
            onPress={()=> goBack()}
          >
            <ECText
              textColor={primaryTextColor}
              fontSize={12}
              textAlign='center'
            >
              CANCEL
            </ECText>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.screenTitle}>
        <ECText
          textColor={primaryTextColor}
          fontSize={16}
          textAlign="center">
          {screenTitle}
        </ECText>
      </View>
      <View style={{width: '20%'}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50
  },
  iconContainer: {
    width: '20%',
    justifyContent: 'center',
    paddingLeft: 16,
    height: 45,
  },
  screenTitle: {
    flex: 1,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancel: {
    alignSelf: 'flex-start'
  }
});
