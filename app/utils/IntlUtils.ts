import {map, forEach} from "lodash"
import {InjectedIntl} from "react-intl";

type IntlForArrayType<T> = (intl: InjectedIntl, ar: T[], propsToConvert: string[]) => T[]

export const intlForArray: IntlForArrayType<any> = (intl: InjectedIntl, ar: any[], propsToConvert: string[]) =>  {
  const result = map({...ar}, (el: any) => {
    forEach(propsToConvert, (prop: string) => {
      const id: string = el[prop]
      el[prop] = intl.formatMessage({id: id})
    })
    return el
  })
  return result
}

type IntlForRecArrayType<T> = (intl: InjectedIntl, ar: T[], recProp: string, propsToConvert: string[]) => T[]

export const intlForRecArray: IntlForRecArrayType<any> =
  (intl: InjectedIntl, ar: any[], recProp: string, propsToConvert: string[]) =>  {
  const result = map({...ar}, (el: any) => {
    forEach(propsToConvert, (prop: string) => {
      const id: string = el[prop]
      el[prop] = intl.formatMessage({id: id})
    })
    const recAr: any[] = el[recProp]
    el[recProp] = intlForRecArray(intl, recAr, recProp, propsToConvert)
    return el
  })
  return result
}
