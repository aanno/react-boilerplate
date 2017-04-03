import React, {PropTypes} from "react"
import {DataShape, Field, FormProps, reduxForm} from "redux-form/immutable"
import {Dispatch} from "react-redux"
import * as log from "loglevel"
import surveyValidation from "./surveyValidation"
import {FieldInputState} from "../../../custom-typings/custom-typings"
import {stateLog} from "../../utils/immutableJsUtils"

interface ISurveyFormFields {
  name: FieldInputState<string>,
  email: FieldInputState<string>,
  occupation: FieldInputState<string>,
  currentlyEmployed: FieldInputState<boolean>,
  sex: FieldInputState<any>,
}

interface ISurveyFormContent {
  name: string,
  email: string,
  occupation: string,
  currentlyEmployed: boolean,
  sex: boolean,
}

/*
 interface ISurveyForm {
 fields?: ISurveyFormFields,
 values?: ISurveyFormContent,
 active?: boolean,
 resetForm?: any,
 onSubmit?: any,
 }
 */

export type SurveyFormContent = Partial<ISurveyFormContent>

export interface ISurveyForm extends FormProps<DataShape, ISurveyFormContent, {}> {
  fields?: ISurveyFormFields,
  values?: ISurveyFormContent,
  active?: boolean,
  resetForm?: any,
  onSubmit?: any,
}

// reduxForm.d.ts:
// asyncValidate?(values: FormData, dispatch: Dispatch<S>, props: P, blurredField: string): Promise<any>;
function asyncValidate(data: SurveyFormContent, dispatch: Dispatch<any>, {isValidEmail}: any) {
  if (!data.email) {
    return Promise.resolve({});
  }
  return isValidEmail(data);
}

/*
 @connect(() => ({}),
 dispatch => bindActionCreators(surveyActions, dispatch)
 )
 */
/*
 @reduxForm({
 form: 'survey',
 fields: ['name', 'email', 'occupation', 'currentlyEmployed', 'sex'],
 validate: surveyValidation,
 asyncValidate,
 asyncBlurFields: ['email'],
 initialValues: {
 name: "Frank",
 email: "Frank@frank.fr",
 occupation: "Frank",
 currentlyEmployed: true,
 sex: "male",
 },
 } as any)
 */
class SurveyForm extends React.Component<ISurveyForm, {}> {

  static propTypes = {
    active: PropTypes.string,
    asyncValidating: PropTypes.bool.isRequired,
    // fields: PropTypes.object.isRequired,
    dirty: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    // resetForm: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
  }

  constructor(props: ISurveyForm) {
    super(props)
  }

  render() {
    stateLog.debug("SurveyForm.render: props=", this.props)
    stateLog.debug("SurveyForm.render: state=", this.state)
    const {
      asyncValidating,
      dirty,
      fields: fields,
      active,
      handleSubmit,
      invalid,
      resetForm,
      pristine,
      valid,
    }: ISurveyForm = this.props
    log.debug("survey fields", fields)
    // {name, email, occupation, currentlyEmployed, sex},
    const name = fields ? fields.name : {name: "name", value: ""} as any
    const email = fields ? fields.email : {name: "email", value: ""} as any
    const occupation = fields ? fields.occupation : {name: "occupation", value: ""} as any
    const currentlyEmployed = fields ? fields.currentlyEmployed : {name: "currentlyEmployed", value: false} as any
    const sex = fields ? fields.sex : {name: "sex", value: "male"} as any
    const styles = require('!css-loader!sass-loader!./SurveyForm.scss');
    const renderInput = (field: FieldInputState<any>, label: string, showAsyncValidating?: boolean) => {
      log.debug("survey field:", field)
      return (
        <div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>
          <label htmlFor={field.name} className="col-sm-2">{label}</label>
          <div className={'col-sm-8 ' + styles.inputGroup}>
            {showAsyncValidating && asyncValidating && <i className={'fa fa-cog fa-spin ' + styles.cog}/>}
            <Field component="input" type="text" className="form-control" id={field.name} {...field}/>
            {field.error && field.touched && <div className="text-danger">{field.error}</div>}
            <div className={styles.flags}>
              {field.dirty && <span className={styles.dirty} title="Dirty">D</span>}
              {field.active && <span className={styles.active} title="Active">A</span>}
              {field.visited && <span className={styles.visited} title="Visited">V</span>}
              {field.touched && <span className={styles.touched} title="Touched">T</span>}
            </div>
          </div>
        </div>)
    }
    log.debug("survey form props:", (this.props))
    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          {renderInput(name, 'Full Name')}
          {renderInput(email, 'Email', true)}
          {renderInput(occupation, 'Occupation')}
          <div className="form-group">
            <label htmlFor="currentlyEmployed" className="col-sm-2">Currently Employed?</label>
            <div className="col-sm-8">
              <Field component="input" type="checkbox" id="currentlyEmployed" {...currentlyEmployed as any}/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2">Sex</label>
            <div className="col-sm-8">
              <Field component="input" type="radio" id="sex-male" {...sex} value="male" checked={sex.value === 'male'}/>
              <label htmlFor="sex-male" className={styles.radioLabel}>Male</label>
              <Field component="input" type="radio" id="sex-female" {...sex} value="female"
                     checked={sex.value === 'female'}/>
              <label htmlFor="sex-female" className={styles.radioLabel}>Female</label>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-success" onClick={handleSubmit}>
                <i className="fa fa-paper-plane"/> Submit
              </button>
              <button className="btn btn-warning" onClick={resetForm} style={{marginLeft: 15}}>
                <i className="fa fa-undo"/> Reset
              </button>
            </div>
          </div>
        </form>

        <h4>Props from redux-form</h4>

        <table className="table table-striped">
          <tbody>
          <tr>
            <th>Active Field</th>
            <td>{active}</td>
          </tr>
          <tr>
            <th>Dirty</th>
            <td className={dirty ? 'success' : 'danger'}>{dirty ? 'true' : 'false'}</td>
          </tr>
          <tr>
            <th>Pristine</th>
            <td className={pristine ? 'success' : 'danger'}>{pristine ? 'true' : 'false'}</td>
          </tr>
          <tr>
            <th>Valid</th>
            <td className={valid ? 'success' : 'danger'}>{valid ? 'true' : 'false'}</td>
          </tr>
          <tr>
            <th>Invalid</th>
            <td className={invalid ? 'success' : 'danger'}>{invalid ? 'true' : 'false'}</td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default reduxForm({
  form: 'survey',
  // fields: ['name', 'email', 'occupation', 'currentlyEmployed', 'sex'],
  validate: surveyValidation,
  asyncValidate,
  asyncBlurFields: ['email'],
  initialValues: {
    name: "Frank",
    email: "Frank@frank.fr",
    occupation: "Frank",
    currentlyEmployed: true,
    sex: "male",
  },
})(SurveyForm)
/*
 export default connect(
 () => ({}),
 (dispatch: Dispatch<any>) => bindActionCreators(surveyActions as any, dispatch)
 )(SurveyForm)
 */
