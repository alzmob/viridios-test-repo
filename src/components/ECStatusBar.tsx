import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import React, {FunctionComponent} from 'react';
import {useAppTheme} from '../theme';

export const MyStatusBar: FunctionComponent<{}> = ({}) => {
  const {
    colors: {statusBarBackgroundColor},
  } = useAppTheme();
  return (
    <View
      style={[styles.container, {backgroundColor: statusBarBackgroundColor}]}>
      <SafeAreaView>
        <StatusBar
          translucent
          backgroundColor={statusBarBackgroundColor}
          barStyle="light-content"
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: StatusBar.currentHeight,
    backgroundColor: '#1a1a1a'
  },
});
