import {createLogger} from "redux-logger"

module "redux-logger" {

export as namespace ReduxLogger

  import * as Redux from "redux"

  declare function createLogger(options?: ReduxLoggerOptions): Redux.Middleware;

  export createLogger
}
