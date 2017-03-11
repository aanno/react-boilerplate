import {Store} from "react-redux";
import ValidationMap = React.ValidationMap;
import InjectedIntl = ReactIntl.InjectedIntl;
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import {RouterState} from "react-router-redux";
import {IAppState} from "../app/containers/App/reducer";

/**
 * Redux Store plus Middleware
 */
interface IMyStore extends Store<IStoreState> {
  replaceReducer: <T>(r: MyReducer<T>) => MyReducer<T>,
  asyncReducers: {[name: string]: MyReducer<any>},
  runSaga: any,
}

/**
 * Redux Store interface
 */
interface IStoreState {
  // ???
  get: (id: string) => any,

  language: string,
  route: RouterState,
  global: IAppState,
}

interface IAction {
  type: string,
}

// redux-immutable:
// export declare function combineReducers<S>(reducers: Redux.ReducersMapObject): Redux.Reducer<S>;

// export type Reducer<S> = <A extends Action>(state: S, action: A) => S;
type MyReducer<S> = <A extends IAction>(state: S, action: A) => S;

type MakeSelectType<T> = () => Selector<IStoreState, T>;

/**
 * Saga interface
 */
type Saga<T> = () => T

interface ITrivialReactComponent<P> {

}

interface ITrivialReactComponentConstructor {
  propTypes: any,
}

/**
 * ToggleOption arguments
 * Html option
 */
interface IToggleOption extends InjectedIntlProps {
  value: string,
  message: FormattedMessage.MessageDescriptor,
  // intl: InjectedIntl,
}

interface IReactNodeWithPropTypes<P> extends React.Component<P,{}> {

  propTypes: ValidationMap<P>,

}

interface IReactRoutedComponent extends IReactMinimalComponent {
  // TODO (tp):
  handleRoute?: any,
}

interface IReactMinimalComponent extends Element, IReactMinimalProps {
}

interface IReactMinimalProps {
  children?: React.ReactNode,
  // TODO (tp):
  context?: any,
}

interface IReactPropsIntl extends IReactMinimalProps{
  locale: string,
  messages: IMessages,
  dispatch: Dispatch<any>,
}

interface IMessages {
  [id: string]: string,
}

type IReactElementConstructor = (() => JSX.Element) | string | ComponentClass<any>;

namespace "redux-saga" {
  namespace effects {
    declare const takeLatest: any
  }
}
