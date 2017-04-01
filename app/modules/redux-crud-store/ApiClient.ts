// This class is a reference implementation. If you desire additional
// functionality, you can work with the config options here, or copy this code
// into your project and customize the ApiClient to your needs.

// You can pass in config using `action.payload.fetchConfig`, or using passedConfig
// when you first initialize your ApiClient. Some keys will be used internally, and
// all other config keys will be passed on to the fetch `init` parameter. See
// https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch for details.
//
// See below for how the three config objects are merged: fetchConfig takes precedence
// over passedConfig, which takes precedence over baseConfig. The headers key of
// the three objects is merged, to allow more fine-grained header setup.
//
// `methods` will be ignored if passed to fetchConfig. Pass an array to passedConfig
// to allow more HTTP methods to be used via the fetch API.
//
// `basePath` is the basePath of your API. It must be passed to passedConfig, and can
// be overwritten in fetchConfig.
//
// `format` is the format to be requested from the Response. It can be any of arrayBuffer,
// blob, formData, json (the default), or text.
//
// `bodyEncoder` is the function that encodes the data parameter before passing to fetch
//
// All other keys are passed directly to the fetch `init` parameter.

interface IApiConfig {
  bodyEncoder: (o: object | undefined) => string,
  credentials: "include" | "omit" | "same-origin" | undefined,
  format: string,
  headers: {
    Accept: string,
    'Content-Type': string,
  },
  methods: string[],

  basePath?: string | undefined,
}

interface IApiResponse {
  response: {[key: string]: any},
  format: string,
}

class ApiClient {
  constructor(passedConfig: Partial<IApiConfig>) {
    const baseConfig: IApiConfig = {
      bodyEncoder: JSON.stringify,
      credentials: 'include',
      format: 'json',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      methods: ['get', 'post', 'put', 'patch', 'delete']
    }

    if (!passedConfig.basePath) {
      // e.g. 'https://example.com/api/v3'
      throw new Error('You must pass a base path to the ApiClient')
    }

    const methods = passedConfig.methods || baseConfig.methods
    methods.forEach((method: string) => {
      (this as any)[method] = (path: string, { params = undefined , data = undefined, fetchConfig = undefined } = {}) => {
        const config = {
          ...baseConfig,
          ...passedConfig,
          ...fetchConfig,
          headers: {
            ...baseConfig.headers,
            ...(passedConfig ? passedConfig.headers : {}),
            ...(fetchConfig ? (fetchConfig as any).headers : {})
          }
        }
        const {
          methods: _methods, basePath, headers, format, bodyEncoder,
          ...otherConfig,
        }: IApiConfig = config
        const requestPath = basePath + path + this.queryString(params)
        const body = data ? bodyEncoder(data) : undefined

        return fetch(requestPath, {
          ...otherConfig,
          method,
          headers,
          body,
        }).then((response: any) => ({ response, format }))
          .then(this.handleErrors)
          .then((response: any) => response[format]())
      }
    })
  }

  // thanks http://stackoverflow.com/a/12040639/5332286
  queryString(params: object | undefined) {
    const s = Object.keys(params).map((key: string) => (
      [key, (params as any)[key]].map(encodeURIComponent).join('=')
    )).join('&')
    return s ? `?${s}` : ''
  }

  handleErrors({ response, format }: IApiResponse) {
    if (!response.ok) {
      return response[format]()
        // if response parsing failed send back the entire response object
        .catch(() => { throw response })
        // else send back the parsed error
        .then((parsedErr: Error) => { throw parsedErr })
    }
    return response
  }
}

export default ApiClient
