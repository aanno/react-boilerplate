import {createSelector} from "reselect";
import {ILanguageProviderState} from "./reducer";
import {MakeSelectType} from "../../../custom-typings/custom-typings";

// type LanguageState = (id: 'locale') => string;

/**
 * Direct selector to the languageToggle state domain
 */
const selectLanguage = (state: ILanguageProviderState) => state.get('language');

/**
 * Select the language locale
 */

const makeSelectLocale: MakeSelectType<string> = () => createSelector(
  selectLanguage,
  (languageState: ILanguageProviderState) => languageState.get('locale')
);

export {
  selectLanguage,
  makeSelectLocale,
};
