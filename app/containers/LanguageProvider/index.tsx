/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { makeSelectLocale } from './selectors';

interface ILanguageProvider {

}

export class LanguageProvider extends React.PureComponent<ILanguageProvider, {}> { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    locale: React.PropTypes.string,
    messages: React.PropTypes.object,
    children: React.PropTypes.element.isRequired,
  };

  render() {
    return (
      <IntlProvider locale={this.props.locale} key={this.props.locale} messages={this.props.messages[this.props.locale]}>
        {React.Children.only(this.props.children)}
      </IntlProvider>
    );
  }
}

const mapStateToProps = createSelector(
  makeSelectLocale(),
  (locale) => ({ locale })
);

export default connect(mapStateToProps)(LanguageProvider);
