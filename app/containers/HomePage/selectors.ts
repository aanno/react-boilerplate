/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import {IHomePageState} from "./reducer";
import {IStoreState, MakeSelectType} from "../../../custom-typings/custom-typings";

export type SelectHomeType = (state: IStoreState) => IHomePageState;
const selectHome: SelectHomeType = (state: IStoreState) => state.get('home');

const makeSelectUsername: MakeSelectType<string> = () => createSelector(
  selectHome,
  (homeState: IHomePageState) => homeState.get('username')
);

export {
  selectHome,
  makeSelectUsername,
};
