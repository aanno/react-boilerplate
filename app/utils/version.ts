import * as log from "loglevel"

export const versionOfBuild: () => void = () => {
  if (log && log.info) {
    if (typeof process !== "undefined" && typeof process.env !== "undefined") {
      if (typeof process.env.__DATE__ !== "undefined") {
        log.info("__DATE__=", process.env.__DATE__)
      }
      if (typeof process.env.__GIT__ !== "undefined") {
        log.info("__GIT__=", process.env.__GIT__)
      }
      if (typeof process.env.NODE_ENV !== "undefined") {
        log.info("process.env.NODE_ENV=", process.env.NODE_ENV)
      } else {
        process.env.NODE_ENV = JSON.stringify("production")
        log.info("default: setting process.env.NODE_ENV=", process.env.NODE_ENV)
      }
      /*
      if (typeof process.env.REACT_WEBPACK_ENV !== "undefined") {
        log.info("process.env.REACT_WEBPACK_ENV=", process.env.REACT_WEBPACK_ENV)
      } else {
        process.env.REACT_WEBPACK_ENV = JSON.stringify("dist")
        log.info("default: setting process.env.REACT_WEBPACK_ENV=", process.env.REACT_WEBPACK_ENV)
      }
       */
    } else {
      log.warn("no process.env found")
    }
  }
}
