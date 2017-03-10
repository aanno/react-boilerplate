import {Store} from "react-redux";
/**
 * Redux Store plus Middleware
 */
interface IMyStore extends Store<IStoreState> {
  replaceReducer: any,
  asyncReducers: any,
  runSaga: any,
}

/**
 * Redux Store interface
 */
interface IStoreState {
}

interface ITrivialReactComponent<P> {

}

interface ITrivialReactComponentConstructor {
  propTypes: any,
}
