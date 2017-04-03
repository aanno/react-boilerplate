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
import ImmutableForm from "../../components/FormExample/ImmutableForm"

interface IFormPage {

}

const showResults = (values: any) =>
  new Promise(resolve => {
    setTimeout(() => {  // simulate server latency
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      resolve()
    }, 500) })

export default class FormPage extends React.Component<IFormPage, {}> { // eslint-disable-line react/prefer-stateless-function
  render() {
    const SF: any = SurveyForm
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
        <ImmutableForm onSubmit={showResults}/>
        <SF onSubmit={showResults}/>
      </div>
    );
  }
}
