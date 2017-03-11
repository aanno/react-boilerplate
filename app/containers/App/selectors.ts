/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import {IStoreState} from "../../../custom-typings/custom-typings";
import {IAppState} from "./reducer";
import {RouterState} from "react-router-redux";

const selectGlobal: IAppState = (state: IStoreState) => state.get('global');

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState: IAppState) => globalState.get('currentUser')
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState: IAppState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState: IAppState) => globalState.get('error')
);

const makeSelectRepos = () => createSelector(
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
