/*
 * HomeReducer
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
  AUTH_USER, CHANGE_USERNAME,
} from './constants';
import {IChangeUsernameAction} from "./actions";
import {IImmutableStore} from "../../../custom-typings/custom-typings";
import { apiCall } from "../../modules/redux-crud-store";
import { API_CALL } from "../../modules/redux-crud-store/actionTypes";

export interface IHomePageState extends IImmutableStore {
  username: string,
}

// The initial state of the App
const initialState: IHomePageState = fromJS({
  username: '',
});

function homeReducer(state: IHomePageState = initialState, action: any) {
  switch (action.type) {
    case CHANGE_USERNAME:

      // Delete prefixed '@' from the github username
      return state
        .set('username', action.name.replace(/@/gi, ''));
    // case AUTH_USER:
    case API_CALL:
      return state
    default:
      return state;
  }
}

export default homeReducer;
