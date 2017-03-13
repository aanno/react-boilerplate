/*
 *
 * LanguageProvider reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_LOCALE,
} from './constants';
import {
  DEFAULT_LOCALE,
} from '../App/constants';
import {IImmutableStore} from "../../../../custom-typings/custom-typings";
import {IChangeLocaleAction} from "./actions"; // eslint-disable-line

export interface ILanguageProviderState extends IImmutableStore {
  locale: string,
}

const initialState = fromJS({
  locale: DEFAULT_LOCALE,
});

function languageProviderReducer(state = initialState, action: IChangeLocaleAction) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return state
        .set('locale', action.locale);
    default:
      return state;
  }
}

export default languageProviderReducer;
