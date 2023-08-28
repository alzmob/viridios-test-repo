import React, {FunctionComponent} from 'react';
import {StyleSheet, View} from 'react-native';

export const ECOnboardingFeature: FunctionComponent = props => {
  return <View style={styles.container}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
