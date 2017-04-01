/*
 * FeaturePage
 *
 * List all the features
 */
import * as React from 'react';
import * as Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import H1 from '../../components/H1';
import messages from './messages';
import SurveyForm from "../../components/SurveyForm"
import ImmutableForm from "../../components/FormExample/ImmutableForm.js"

interface IFormPage {

}

export default class FormPage extends React.Component<IFormPage, {}> { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div>
        <Helmet
          title="Form Page"
          meta={[
            { name: 'description', content: 'Form page of React.js Boilerplate application' },
          ]}
        />
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <ImmutableForm/>
      </div>
    );
  }
}
