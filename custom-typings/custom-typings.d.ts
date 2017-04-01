import {Dispatch, Store} from "react-redux";
import ValidationMap = React.ValidationMap;
import InjectedIntl = ReactIntl.InjectedIntl;
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import {RouterState} from "react-router-redux";
import {IAppState} from "../app/containers/App/reducer";
import * as Redux from "redux";
import Action = Redux.Action;
import * as Immutable from "immutable";
import Map = Immutable.Map
import List = Immutable.List
import Partial = _.Partial;
import ComponentLifecycle = React.ComponentLifecycle;
import {ReactWrapper} from "enzyme";
import ReactInstance = React.ReactInstance;
import ReactNode = React.ReactNode;
import ComponentClass = React.ComponentClass;
import {Config, FormDecorator, WrappedFieldInputProps, WrappedFieldMetaProps} from "redux-form"
import {ILeftMenu} from "../app/components/tsb/LeftMenu/index"
import {ITopMenu} from "../app/components/tsb/TopMenu/index"

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

interface FieldInputState<T> extends WrappedFieldMetaProps<T> {
  name: string,
  value: T,
}

interface FieldInputProps extends Partial<WrappedFieldInputProps> {
  name: string,
  // value: FieldValue,
}

interface IReduxFormState {
  // TODO tp: For every form, enter the used input-store mapping (i.e. name from <input>)!
  kdaten: any,
}

interface IStoreInterface {
  language: string,
  route: RouterState,
  global: IAppState,
  // TODO tp:
  models: CrudState,
  form: IReduxFormState,
}

/**
 * Redux Store interface for our (concrete) store.
 */
interface IStoreState extends IImmutableStore, Readonly<IStoreInterface> {
  // ???
  // get: (id: string) => any,
  (state: IStoreState, action: IAction): IStoreState,
}

/**
 * redux-immutable (abstract) store
 */
interface IImmutableStore extends Map<string, any> {

}

interface IAction extends Action {
  type: string,
}

interface IWithId {
  id: string,
}

// TODO tp:
interface ICrudItem extends List<any> {
  fetchTime: number | undefined,
}

// TODO tp:
interface ICrudState extends List<ICrudItem> {

}

// TODO tp:
type CrudState = ICrudState

interface ICrudActionPayload {
  id: number,
  action: ICrudAction,
  // TODO tp:
  params: any,
  data: IWithId[],
  model: any,
}

type CrudActionPayload = ICrudActionPayload & IWithId[]

interface ICrudAction extends IAction {
  payload: CrudActionPayload,
  // TODO tp:
  meta: any,
  error: any,
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
interface IToggleOption extends Partial<InjectedIntlProps> {
  readonly value: string,
  readonly message?: FormattedMessage.MessageDescriptor,
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
  readonly dispatch?: Dispatch<any>,

  // TODO (tp):
  readonly context?: any,
}

interface IReactPropsIntl extends IReactMinimalProps {
  readonly locale: string,
  readonly messages: ITranslations,
}

interface IMessagesInterface {
  [id: string]: string,
}

interface ITranslationsInterface {
  [locale: string]: IMessages,
}

type IMessages = Readonly<IMessagesInterface>;
type ITranslations = Readony<ITranslationsInterface>;

type StyledComponentType<T> = React.ComponentClass<Partial<T>>

export type ListItemType<T> = T | (React.ComponentClass<T> & new(props: T | undefined, context?: any));

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

interface IRepo {
    owner: {
      login: string,
    },
    html_url: string,
    name: string,
    open_issues_count: number,
    full_name: string,
}

type RepoType = ListItemType<IRepo>;

interface IComponentToRenderProps {
  item: any;
}

interface ISelectOption {
  value: string,
  text: string,
}

type ToLocationFunction = (location: Location) => LocationDescriptor
