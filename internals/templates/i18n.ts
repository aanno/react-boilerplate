/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';

import { DEFAULT_LOCALE } from './containers/App/constants';
import {IMessages} from "../../custom-typings/custom-typings"; // eslint-disable-line
// import enTranslationMessages from './translations/en.json';

const enTranslationMessages: IMessages = require('./translations/en.json');

export const appLocales = [
  'en',
];

addLocaleData(enLocaleData);

export type FormatTranslationMessagesType = (locale: string, messages: IMessages) => IMessages;

export const formatTranslationMessages: FormatTranslationMessagesType = (locale: string, messages: IMessages) => {
  const defaultFormattedMessages = locale !== DEFAULT_LOCALE
    ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
    : {};
  return Object.keys(messages).reduce((formattedMessages, key) => {
    let message = messages[key];
    if (!message && locale !== DEFAULT_LOCALE) {
      message = defaultFormattedMessages[key];
    }
    return Object.assign(formattedMessages, { [key]: message });
  }, {});
};

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
};
