import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable' // <--- immutable import
import validate from './validate'
import {FieldInputState, IFieldProps} from "../../../custom-typings/custom-typings"
import {DataShape, FormProps, WrappedFieldProps} from "redux-form"
import {stateLog} from "../../utils/immutableJsUtils"

interface IImmutableFormFields {
  username: FieldInputState<string>,
  email: FieldInputState<string>,
  age: FieldInputState<number>,
}

interface IImmutableFormContent {
  username: string,
  email: string,
  age: number,
}

/*
interface IImmutableForm {
  fields: IImmutableFormFields,
}
 */

export type ImmutableFormContent = Partial<IImmutableFormContent>

export interface IImmutableForm extends FormProps<DataShape, IImmutableFormContent, {}> {
  fields?: IImmutableFormFields,
  values?: IImmutableFormContent,
  active?: boolean,
  resetForm?: any,
  onSubmit?: any,
}

const renderField = ({ input, label, type, meta: { touched, error } }: IFieldProps) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const ImmutableForm = (props: IImmutableForm) => {
  stateLog.debug("immutable form props:", props)
  // stateLog.debug("immutable form state:", this.state)
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="username" type="text" component={renderField} label="Username"/>
      <Field name="email" type="email" component={renderField} label="Email"/>
      <Field name="age" type="number" component={renderField} label="Age"/>
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'immutableExample',  // a unique identifier for this form
  validate
})(ImmutableForm)
