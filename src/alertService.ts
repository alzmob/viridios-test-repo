import {showMessage, MessageType} from 'react-native-flash-message';
import {translate} from './i18n/i18';

const alert = (
  alertType: MessageType,
  messageKey: string,
  namespace: string = 'account',
  interpolationValue?: string | undefined,
  duration: number = 3000,
) => {
  const messageWithTranslation = translate(
    messageKey ? namespace : 'account',
    messageKey ?? 'serviceError',
    interpolationValue,
  );

  return showMessage({
    message: messageWithTranslation,
    type: alertType,
    duration,
  });
};

export const alertService = {
  alert,
};
