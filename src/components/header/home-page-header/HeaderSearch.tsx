import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {ECText} from '../../ECText';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppTheme} from '../../../theme';
import {useTranslation} from 'react-i18next';

export const HeaderSearch = () => {
  const {
    colors: {primaryTextColor},
  } = useAppTheme();
  const {t} = useTranslation('products');
  const {navigate} = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigate('Search');
      }}>
      <ECText fontSize={15}>{t('search')}...</ECText>
      <Ionicons name="search-outline" size={20} color={primaryTextColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
});
