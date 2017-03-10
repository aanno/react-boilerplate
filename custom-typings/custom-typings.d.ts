import {Store} from "react-redux";
import ValidationMap = React.ValidationMap;

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

/**
 * ToggleOption arguments
 * Html option
 */
interface IToggleOption {
  value: string,
  message: string,
  intl: string,
}

interface IReactNodeWithPropTypes<P> extends React.ReactNode {

  propTypes: ValidationMap<P>,

}

interface IReactRoutedComponent extends IReactMinimalComponent {
  // TODO (tp):
  handleRoute?: any,
}

interface IReactMinimalComponent extends Element {
  children?: React.ReactNode,
}

interface IReactPropsIntl {
  locale: string,
  messages: IMessages,
  dispatch: Dispatch<any>,
  // TODO (tp):
  context?: any,
}

interface IMessages {
  [id: string]: string,
}
