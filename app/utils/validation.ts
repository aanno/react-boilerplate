const isEmpty = (value: string | null | undefined) => value === undefined || value === null || value === ''

const join = (rules: object[]) => (value: string, data: object) => rules.map(
  rule => (rule as any)(value, data)).filter((error: any) => !!error)[0 /* first error */];

export function email(value: string) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address'
  }
  return undefined
}

export function required(value: string) {
  if (isEmpty(value)) {
    return 'Required'
  }
  return undefined
}

export function minLength(min: number) {
  return (value: string) => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`
    }
    return undefined
  }
}

export function maxLength(max: number) {
  return (value: string) => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`
    }
    return undefined
  }
}

export function integer(value: string) {
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer'
  }
  return undefined
}

export function oneOf(enumeration: any[]) {
  return (value: string) => {
    if (!~enumeration.indexOf(value)) {
      return `Must be one of: ${enumeration.join(', ')}`
    }
    return undefined
  }
}

export function match(field: string) {
  return (value: string, data: object) => {
    if (data) {
      if (value !== (data as any)[field]) {
        return 'Do not match'
      }
    }
    return undefined
  }
}

export function createValidator(rules: object) {
  return (data: object = {}) => {
    const errors: object = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat((rules as any)[key])) // concat enables both functions and arrays of functions
      const error = rule((data as any)[key], data)
      if (error) {
        (errors as any)[key] = error
      }
    })
    return errors
  }
}
