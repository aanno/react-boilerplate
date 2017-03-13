import { fromJS } from 'immutable';

import languageProviderReducer from '../reducer';
import {
  CHANGE_LOCALE,
} from '../constants';
import {IChangeLocaleAction} from "../actions";

describe('languageProviderReducer', () => {
  it('returns the initial state', () => {
    expect(languageProviderReducer(undefined, {} as IChangeLocaleAction)).toEqual(fromJS({
      locale: 'en',
    }));
  });

  it('changes the locale', () => {
    expect(languageProviderReducer(undefined, { type: CHANGE_LOCALE, locale: 'de' }).toJS()).toEqual({
      locale: 'de',
    });
  });
});
