/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
} from './constants';
import {IAppAction, IReposLoadedAction, ILoadingReposErrorAction} from "./actions";

export interface IUserData {
  repositories: boolean,
}

export interface IAppState {
  loading: boolean,
  error: boolean,
  currentUser: boolean,
  userData: IUserData,
}

// The initial state of the App
const initialState: IAppState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
});

function appReducer(state: IAppState = initialState, action: IAppAction) {
  switch (action.type) {
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      const a2: IReposLoadedAction = action;
      return state
        .setIn(['userData', 'repositories'], a2.repos)
        .set('loading', false)
        .set('currentUser', a2.username);
    case LOAD_REPOS_ERROR:
      const a3: ILoadingReposErrorAction = action;
      return state
        .set('error', a3.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
