/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import * as React from 'react';
import {connect, Dispatch} from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { makeSelectLocale } from './selectors';
import {ITranslations} from "../../../../custom-typings/custom-typings";

interface ILanguageProvider /* extends IReactPropsIntl */ {
  messages: ITranslations,
  locale: string,
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

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageProvider);
