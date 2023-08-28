import i18n from 'i18next';
import {getI18n, initReactI18next} from 'react-i18next';
import i18next from 'i18next';

//Account
import AccountTranslationsEN from '../translations/accountTranslations.en.json';
import AccountTranslationsDE from '../translations/accountTranslations.de.json';
import AccountTranslationsES from '../translations/accountTranslations.es.json';
import AccountTranslationsIT from '../translations/accountTranslations.it.json';

//Products
import ProductsTranslationsEN from '../translations/productsTranslations.en.json';
import ProductsTranslationsDE from '../translations/productsTranslations.de.json';
import ProductsTranslationsES from '../translations/productsTranslations.es.json';
import ProductsTranslationsIT from '../translations/productsTranslations.it.json';

const resources = {
  en: {
    account: AccountTranslationsEN,
    products: ProductsTranslationsEN,
  },
  de: {
    account: AccountTranslationsDE,
    products: ProductsTranslationsDE,
  },
  es: {
    account: AccountTranslationsES,
    products: ProductsTranslationsES,
  },
  it: {
    account: AccountTranslationsIT,
    products: ProductsTranslationsIT,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',

  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v3',
});
export const translate = (
  ns: string,
  key: string,
  interpolationValue?: string,
) => {
  const i18nInstance = getI18n();
  const lang = i18nInstance.language;
  const t = i18next.getFixedT(lang, ns);

  return t(key, {interpolationValue});
};

export default i18n;
