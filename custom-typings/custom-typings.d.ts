import {Store} from "react-redux";
import ValidationMap = React.ValidationMap;
import InjectedIntl = ReactIntl.InjectedIntl;
import InjectedIntlProps = ReactIntl.InjectedIntlProps;

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
