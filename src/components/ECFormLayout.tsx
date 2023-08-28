import {Platform, StyleSheet} from 'react-native';
import React, {FunctionComponent} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface ECFormLayoutProps {
  extraHeight?: number;
}

export const ECFormLayout: FunctionComponent<ECFormLayoutProps> = ({
  children,
  extraHeight,
}) => {
  const height = extraHeight ? extraHeight : 85;

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      showsVerticalScrollIndicator={false}
      bounces={false}
      extraHeight={Platform.OS === 'ios' ? height : 0}
      extraScrollHeight={32}
      keyboardOpeningTime={0}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.containerContent}>
      {children}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  containerContent: {
    flexGrow: 1,
  },
});
