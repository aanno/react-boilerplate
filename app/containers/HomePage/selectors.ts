/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import {IHomePageState} from "./reducer";

const selectHome = (state: IHomePageState) => state.get('home');

const makeSelectUsername = () => createSelector(
  selectHome,
  (homeState: IHomePageState) => homeState.get('username')
);

export {
  selectHome,
  makeSelectUsername,
};
