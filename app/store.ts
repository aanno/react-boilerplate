/**
 * Create the store with asynchronously loaded reducers
 */

import {applyMiddleware, compose, createStore} from "redux"
import {fromJS} from "immutable"
import {routerMiddleware} from "react-router-redux"
import createSagaMiddleware from "redux-saga"
import {createLogger} from "redux-logger"
import * as log from "loglevel"
import createReducer from "./reducers"
import {Store} from "react-redux"
import {IMyStore, IStoreState, Module, MyReducer} from "../custom-typings/custom-typings"
import {History} from "history"
import { ApiClient, crudSaga } from './modules/redux-crud-store'
import {API_BASE_PATH} from "./config/config"


const client = new ApiClient({ basePath: API_BASE_PATH })
const sagaMiddleware = createSagaMiddleware()

function transformer(o: any): object {
  let result
  if (o.toJS) {
    result = o.toJS()
  } else {
    result = o
  }
  return result
}

/*
class LogAdapter {

  wrapped: Log

  constructor(log: Log) {
    this.wrapped = log
  }

  debug(message?: any, ...optionalParams: any[]): void {
    this.wrapped.debug(message, optionalParams)
  }

  error(message?: any, ...optionalParams: any[]): void {
    this.wrapped.error(message, optionalParams)
  }

  info(message?: any, ...optionalParams: any[]): void {
    this.wrapped.info(message, optionalParams)
  }

  trace(message?: any, ...optionalParams: any[]): void {
    this.wrapped.trace(message, optionalParams)
  }

  warn(message?: any, ...optionalParams: any[]): void {
    this.wrapped.warn(message, optionalParams)
  }

  /**
   * This is the function called by redux-logger! (tp)
   /
  log(message?: any, ...optionalParams: any[]): void {
    console.log(message, optionalParams)
  }

}
 */

export default function configureStore(initialState: any = {models: {}}, history: History) {

  const develop = process.env.NODE_ENV !== "production"
  log.info("Development mode:", develop)

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ]

  if (develop) {
    log.setLevel('debug');
    log.debug("Log level set to debug")

    // tp: redux-logger support
    // https://github.com/evgenyrodionov/redux-logger
    const logger = createLogger({
      collapsed: true,
      level: "debug",
      // logger: new LogAdapter(log),
      logger: console,
      logErrors: true,
      stateTransformer: transformer,
      actionTransformer: transformer,
      errorTransformer: transformer,
    })
    middlewares.unshift(logger)
    log.debug("Added redux-logger")
  }

  const enhancers = [
    applyMiddleware(...middlewares),
  ]

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== "production" &&
    typeof window === "object" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
  /* eslint-enable */

  const realStore: Store<IStoreState> = createStore<IStoreState>(
    createReducer({}),
    fromJS(initialState),
    composeEnhancers(...enhancers),
  )

  const store: IMyStore = realStore as IMyStore

  // Extensions
  store.runSaga = sagaMiddleware.run
  store.runSaga(crudSaga(client))
  store.asyncReducers = {} // Async reducer registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      System.import("./reducers").then((reducerModule: Module) => {
        const createReducers = reducerModule.default
        const nextReducers: MyReducer<any> = createReducers(store.asyncReducers)

        store.replaceReducer(nextReducers)
      })
    })
  }

  return store
}
