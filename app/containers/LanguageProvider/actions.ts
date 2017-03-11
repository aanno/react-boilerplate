/*
 *
 * LanguageProvider actions
 *
 */

import {
  CHANGE_LOCALE,
} from './constants';
import {IAction} from "../../../custom-typings/custom-typings";

export interface IChangeLocaleAction extends IAction {
  locale: string,
}

export function changeLocale(languageLocale: string): IChangeLocaleAction {
  return {
    type: CHANGE_LOCALE,
    locale: languageLocale,
  };
}
