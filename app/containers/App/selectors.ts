/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import {IStoreState, MakeSelectType} from "../../../custom-typings/custom-typings";
import {IAppState} from "./reducer";
import {RouterState} from "react-router-redux";

export type SelectGlobalType = (state: IStoreState) => IAppState;

const selectGlobal: SelectGlobalType = (state: IStoreState) => state.get('global');

const makeSelectCurrentUser: MakeSelectType<string> = () => createSelector(
  selectGlobal,
  (globalState: IAppState) => globalState.get('currentUser')
);

const makeSelectLoading: MakeSelectType<boolean> = () => createSelector(
  selectGlobal,
  (globalState: IAppState) => globalState.get('loading')
);

const makeSelectError: MakeSelectType<Error> = () => createSelector(
  selectGlobal,
  (globalState: IAppState) => globalState.get('error')
);

const makeSelectRepos: MakeSelectType<boolean> = () => createSelector(
  selectGlobal,
  (globalState: IAppState) => globalState.getIn(['userData', 'repositories'])
);

const makeSelectLocationState = () => {
  let prevRoutingState: RouterState;
  let prevRoutingStateJS;

  return (state: IStoreState) => {
    const routingState: RouterState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocationState,
};
