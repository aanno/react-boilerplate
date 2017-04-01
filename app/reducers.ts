/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */
import {fromJS} from "immutable";
import {combineReducers} from "redux-immutable";
import {LOCATION_CHANGE, RouterState, RouterAction} from "react-router-redux";
import {reducer as formReducer} from 'redux-form/immutable'
import globalReducer from "./containers/App/reducer";
import homeReducer from "./containers/HomePage/reducer";
import languageProviderReducer from "./containers/LanguageProvider/reducer";
import {
  CrudState, IAction, ICrudAction, IStoreState, MyReducer,
  MyReducersMapObject,
} from "../custom-typings/custom-typings";
import { crudReducer } from "./modules/redux-crud-store/index";

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState: RouterState = fromJS({
  locationBeforeTransitions: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state: RouterState = routeInitialState, action: RouterAction) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      // TODO tp:
      return (state as any).merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

const initialState = fromJS({})

function extendedCrudReducer(state: CrudState = initialState, action: ICrudAction) {
  state = crudReducer(state, action) as CrudState
  if (action.meta && action.payload) {
    const params = action.payload.params
    const pop = action.type.split('/').pop()
    if (!pop) {
      throw new Error("ICrudAction contains no splittable type!")
    }
    return state.setIn([action.meta.model, 'params', pop.trim()], params)
  } else {
    return state
  }
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers: MyReducersMapObject): MyReducer<IStoreState> {
  return combineReducers({
    route: routeReducer,
    global: globalReducer,
    language: languageProviderReducer,
    form: formReducer,
    models: extendedCrudReducer,
    home: homeReducer,
    ...asyncReducers,
  }) as MyReducer<IStoreState>;
}
