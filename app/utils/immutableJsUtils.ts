import * as log from "loglevel"
import * as Immutable from "immutable"

class LogAdapter {

  wrapped: Log

  constructor(log: Log) {
    this.wrapped = log
  }

  debug(message?: any, ...optionalParams: any[]): void {
    this.wrapped.debug(message, arrayOfStateToString(optionalParams))
  }

  error(message?: any, ...optionalParams: any[]): void {
    this.wrapped.error(message, arrayOfStateToString(optionalParams))
  }

  info(message?: any, ...optionalParams: any[]): void {
    this.wrapped.info(message, arrayOfStateToString(optionalParams))
  }

  trace(message?: any, ...optionalParams: any[]): void {
    this.wrapped.trace(message, arrayOfStateToString(optionalParams))
  }

  warn(message?: any, ...optionalParams: any[]): void {
    this.wrapped.warn(message, arrayOfStateToString(optionalParams))
  }

/**
 * This is the function called by redux-logger! (tp)
 */
 log(message?: any, ...optionalParams: any[]): void {
    console.log(message, arrayOfStateToString(optionalParams))
  }

}

export function arrayOfStateToString(states: any[]) {
  if (!states || states.length <= 0) {
    return "no array or empty: []"
  }
  let result = "["
  states.forEach((state: any) => {
    result += stateToString(state)
    result += ",\n"
  })
  result += "\n]"
  return result
}

export function stateToString(state: any): string {
  if (!state) {
    return "undefined"
  } else if (state.toJS) {
    return "immutable: " + JSON.stringify(state.toJS(), null, 2)
  } else {
    return "NON immutable: " + JSON.stringify(state, null, 2)
  }
}

export const stateLog = new LogAdapter(log)
