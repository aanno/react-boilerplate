/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import {IStoreState, MakeSelectType} from "../../../custom-typings/custom-typings";
import {IAppState} from "./reducer";

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
  // TODO (tp): Perhaps RouterState?
  let prevRoutingState: any;
  let prevRoutingStateJS: any;

  return (state: IStoreState) => {
    const routingState: any = state.get('route'); // or state.route

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
