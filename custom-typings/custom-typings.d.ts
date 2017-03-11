import {Store} from "react-redux";
import ValidationMap = React.ValidationMap;
import InjectedIntl = ReactIntl.InjectedIntl;
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import {RouterState} from "react-router-redux";
import {IAppState} from "../app/containers/App/reducer";
import * as Redux from "redux";
import Action = Redux.Action;
import * as Immuable from "immutable";
import Map = Immuable.Map

/**
 * Redux Store plus Middleware
 */
interface IMyStore extends Store<IStoreState> {
  replaceReducer: <T>(r: MyReducer<T>) => MyReducer<T>,
  asyncReducers: MyReducersMapObject,
  runSaga: any,
}

// similiar to Redux.ReducersMapObject
interface MyReducersMapObject {
  [key: string]: MyReducer<any>;
}

/**
 * Redux Store interface for our (concrete) store.
 */
interface IStoreState extends IImmutableStore {
  // ???
  // get: (id: string) => any,

  language: string,
  route: RouterState,
  global: IAppState,
}

/**
 * redux-immutable (abstract) store
 */
interface IImmutableStore extends Map<string, any> {

}

interface IAction extends Action {
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

  // Needed to make 'interface ReactElement<P>' happy
  // (not used in application, though) (tp)
  type: string,
  key: null,

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
  messages: ITranslations,
  dispatch: Dispatch<any>,
}

interface IMessages {
  [id: string]: string,
}

interface ITranslations {
  [locale: string]: IMessages,
}

type IReactElementConstructor = (() => JSX.Element) | string | ComponentClass<any>;

namespace "redux-saga" {
  namespace effects {
    declare const takeLatest: any
  }
}

module "react-hot-loader" {
  declare const AppContainer: any;
}

// dummy type for webpack.Module
type Module = any;
