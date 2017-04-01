import * as immutable from "redux-form/immutable"
import {Config, DataShape, FormDecorator} from "redux-form"

// module "redux-form/immutable" {

  // export function reduxForm<FormData extends DataShape, P, S>(config: Config<FormData, P, S>): FormDecorator<FormData, P, S>

declare module 'redux-form/immutable' {
  export * from 'redux-form'

  export const values: any
}

// }
