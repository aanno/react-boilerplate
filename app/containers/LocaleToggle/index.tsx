/*
 *
 * LanguageToggle
 *
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Toggle from '../../components/Toggle';
import Wrapper from './Wrapper';
import messages from './messages';
import { appLocales } from '../../i18n';
import { changeLocale } from '../LanguageProvider/actions';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import {IReactPropsIntl} from "../../../custom-typings/custom-typings";

interface ILocaleToggle extends IReactPropsIntl {
  onLocaleToggle: (Event) => void,
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

const mapStateToProps = createSelector(
  makeSelectLocale(),
  (locale) => ({ locale })
);

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: (evt) => dispatch(changeLocale(evt.target.value)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocaleToggle);