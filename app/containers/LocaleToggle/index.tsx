/*
 *
 * LanguageToggle
 *
 */
import * as React from "react";
import {connect, MapStateToProps, Dispatch} from "react-redux";
import {createSelector} from "reselect";
import Toggle from "../../components/Toggle";
import Wrapper from "./Wrapper";
import messages from "./messages";
import {appLocales} from "../../i18n";
import {changeLocale, IChangeLocaleAction} from "../LanguageProvider/actions";
import {makeSelectLocale} from "../LanguageProvider/selectors";
import {IReactPropsIntl} from "../../../custom-typings/custom-typings";

interface ILocaleToggle extends IReactPropsIntl {
  onLocaleToggle: (e: React.FormEvent<Element>) => IChangeLocaleAction,
}

export class LocaleToggle extends React.PureComponent<ILocaleToggle, {}> { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    onLocaleToggle: React.PropTypes.func,
    locale: React.PropTypes.string,
  };

  render() {
    return (
      <Wrapper>
        <Toggle value={this.props.locale} values={appLocales} messages={messages} onToggle={this.props.onLocaleToggle} />
      </Wrapper>
    );
  }
}

const mapStateToProps: MapStateToProps<any, any> = createSelector(
  makeSelectLocale(),
  (locale) => ({ locale })
);

export function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    onLocaleToggle: (evt: React.FormEvent<Element>) => dispatch(changeLocale((evt.target as any).value)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocaleToggle);
