import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert} from 'react-native';

export const usePreventGoBack = (canGoBack: boolean | undefined) => {
  const {t} = useTranslation('account');
  const navigation = useNavigation();

  useEffect(() => {}, []);

  useFocusEffect(
    useCallback(() => {
      let unsubscribe: Function | undefined;
      if (!unsubscribe) {
        unsubscribe = navigation.addListener('beforeRemove', e => {
          if (!canGoBack) {
            return;
          }
          e.preventDefault();
          Alert.alert(t('discardTitle'), t('discardText'), [
            {
              text: t('stay'),
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: t('discard'),
              style: 'destructive',
              onPress: () => navigation.dispatch(e.data.action),
            },
          ]);
        });
      }
      return () => {
        unsubscribe?.();
      };
    }, [canGoBack, navigation, t]),
  );
};
