import { createSelector } from 'reselect';
import {IStoreState} from "../../../custom-typings/custom-typings";
import {ILanguageProviderState} from "./reducer";

// type LanguageState = (id: 'locale') => string;

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
