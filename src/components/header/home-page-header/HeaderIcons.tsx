import {StyleSheet, View} from 'react-native';
import React from 'react';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {IconButton} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {useAppTheme} from '../../../theme';

export const HeaderIconsMenu = () => {
  const navigation = useNavigation();
  const {
    colors: {primaryTextColor},
  } = useAppTheme();
  return (
    <View style={[styles.menuBtn, {borderRightColor: primaryTextColor}]}>
      <IconButton
        icon="menu"
        size={25}
        color={primaryTextColor}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer)}
      />
    </View>
  );
};

export const HeaderIconsFilter = () => {
  const {
    colors: {primaryTextColor},
  } = useAppTheme();
  const navigation = useNavigation();
  const filters = useSelector((state: RootState) => state.filter);

  const isFilterEmpty =
    filters.startPrice !== 0 ||
    filters.endPrice !== 2500 ||
    filters.brand.length > 0 ||
    filters.ram.length > 0 ||
    filters.internal.length > 0 ||
    filters.system.length > 0;

  return (
    <View style={[styles.filterButton, {borderLeftColor: primaryTextColor}]}>
      <IconButton
        icon={isFilterEmpty ? 'filter-check-outline' : 'filter-outline'}
        size={25}
        color={primaryTextColor}
        onPress={() => {
          navigation.navigate('Filters');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menuBtn: {
    borderRightWidth: 1,
    justifyContent: 'center',
  },
  filterButton: {
    borderLeftWidth: 1,
    justifyContent: 'center',
  },
});
