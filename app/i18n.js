/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import * as log from 'loglevel';
import { addLocaleData } from 'react-intl';
import * as enLocaleData from 'react-intl/locale-data/en';
import * as deLocaleData from 'react-intl/locale-data/de';

import { DEFAULT_LOCALE } from '../app/containers/App/constants';

import * as enTranslationMessages from './translations/en.json';
import * as deTranslationMessages from './translations/de.json';

addLocaleData(enLocaleData);
addLocaleData(deLocaleData);

export const appLocales = [
  'en',
  'de',
];

export const formatTranslationMessages = (locale, messages) => {
  log.info("formatTranslationMessages", locale, messages)
  console.log("formatTranslationMessages", locale, messages)
  const defaultFormattedMessages = locale !== DEFAULT_LOCALE
    ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
    : {};
  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage = !messages[key] && locale !== DEFAULT_LOCALE
      ? defaultFormattedMessages[key]
      : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  }, {});
};

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  de: formatTranslationMessages('de', deTranslationMessages),
};
