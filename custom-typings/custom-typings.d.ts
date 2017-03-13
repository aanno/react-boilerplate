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
import Partial = _.Partial;
import ComponentLifecycle = React.ComponentLifecycle;
import {ReactWrapper} from "enzyme";
import ReactInstance = React.ReactInstance;
import ReactNode = React.ReactNode;

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

interface IStoreInterface {
  language: string,
  route: RouterState,
  global: IAppState,
}

/**
 * Redux Store interface for our (concrete) store.
 */
interface IStoreState extends IImmutableStore, Readonly<IStoreState> {
  // ???
  // get: (id: string) => any,
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
  readonly propTypes: any,
}

/**
 * ToggleOption arguments
 * Html option
 */
interface IToggleOption extends InjectedIntlProps {
  readonly value: string,
  readonly message: FormattedMessage.MessageDescriptor,
  // intl: InjectedIntl,
}

interface IReactNodeWithPropTypes<P> extends React.Component<P,{}> {

  readonly propTypes: ValidationMap<P>,

  // Needed to make 'interface ReactElement<P>' happy
  // (not used in application, though) (tp)
  type: string,
  key: null,

}

interface IReactRoutedComponent extends IReactMinimalComponent {
  // TODO (tp):
  readonly handleRoute?: any,
}

interface IReactMinimalComponent extends Element, IReactMinimalProps {
}

interface IReactMinimalProps {
  readonly children?: React.ReactNode,
  // TODO (tp):
  readonly context?: any,
}

interface IReactPropsIntl extends IReactMinimalProps {
  readonly locale: string,
  readonly messages: ITranslations,
  readonly dispatch: Dispatch<any>,
}

interface IMessagesInterface {
  [id: string]: string,
}

interface ITranslationsInterface {
  [locale: string]: IMessages,
}

type IMessages = Readonly<IMessagesInterface>;
type ITranslations = Readony<ITranslationsInterface>;

/**
 * Interface like ComponentClass<P> but without the constructor.
 * Needed for second-order components.
 *
 * @author Thomas Pasch
 */
interface ComponentClassLike<P> {
  // new (props?: P, context?: any): Component<P, ComponentState>;
  propTypes?: ValidationMap<P>;
  contextTypes?: ValidationMap<any>;
  childContextTypes?: ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
}

/**
 * Interface like Component<P, S> but without the constructor.
 * Needed for second-order components.
 *
 * @author Thomas Pasch
 */
class ComponentLike<P, S> implements ComponentLifecycle<P, S> {
  // constructor(props?: P, context?: any);
  setState<K extends keyof S>(f: (prevState: S, props: P) => Pick<S, K>, callback?: () => any): void;
  setState<K extends keyof S>(state: Pick<S, K>, callback?: () => any): void;
  forceUpdate(callBack?: () => any): void;
  render(): JSX.Element | null;

  // React.Props<T> is now deprecated, which means that the `children`
  // property is not available on `P` by default, even though you can
  // always pass children as variadic arguments to `createElement`.
  // In the future, if we can define its call signature conditionally
  // on the existence of `children` in `P`, then we should remove this.
  props: Readonly<{ children?: ReactNode }> & Readonly<P>;
  state: Readonly<S>;
  context: any;
  refs: {
    [key: string]: ReactInstance
  };
}

type EnzymeMountType<T extends React.Component<P,S>, P, S> = T & ReactWrapper<P, S>;

type IReactElementConstructor = (() => JSX.Element) | string | ComponentClass<any>;

interface IReactTestProps {
  handleRoute: (any) => void,
  type: string,
}

type ReactTestProps<P> = Partial<Readonly<IReactTestProps>> & Partial<Readonly<P>>;

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
