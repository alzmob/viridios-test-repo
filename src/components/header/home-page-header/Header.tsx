import {StyleSheet, View} from 'react-native';
import React from 'react';
import {HeaderIconsFilter, HeaderIconsMenu} from './HeaderIcons';
import {HeaderSearch} from './HeaderSearch';
import {useAppTheme} from '../../../theme';

export const Header = () => {
  const {
    colors: {mainScreenHeaderBorderColor},
  } = useAppTheme();
  return (
    <View style={[styles.topBar, {borderColor: mainScreenHeaderBorderColor}]}>
      <HeaderIconsMenu />
      <HeaderSearch />
      <HeaderIconsFilter />
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    borderWidth: 1,
    borderRadius: 16,
    height: 47,
    margin: 20,
  },
});
