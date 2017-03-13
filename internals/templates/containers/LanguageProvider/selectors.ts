import { createSelector } from 'reselect';
import {ILanguageProviderState} from "./reducer";

/**
 * Direct selector to the languageToggle state domain
 */
const selectLanguage = (state: ILanguageProviderState) => state.get('language');

/**
 * Select the language locale
 */

const makeSelectLocale = () => createSelector(
  selectLanguage,
  (languageState: ILanguageProviderState) => languageState.get('locale')
);

export {
  selectLanguage,
  makeSelectLocale,
};
