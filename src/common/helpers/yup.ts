import { YupError, ValidationError as YupValidationError, AnySchema, ValidateOptions } from 'yup'

export class ValidationError<T = Dictionary> implements Error {
  public name: string
  public message: string
  public errors: YupError<T>

  constructor (errors: YupError<T>) {
    this.name = this.constructor.name
    this.message = 'Yup Validation Error'
    this.errors = errors
  }
}

export const normalizeYupError = <T>(error: YupValidationError): ValidationError<T> => {
  if (error.inner) {
    const errorObject: YupError<T | Dictionary> = error.inner.reduce((obj: Dictionary, cur) => {
      if (cur.path) {
        obj = {...obj,  [cur.path]: cur.message }
        // _set(obj, cur.path, cur.message)
      } else {
        obj[0] = cur.message
      }
      return obj
    }, {})
    return new ValidationError<T>(errorObject)
  }
  throw new Error(`Error.inner expected array but received: ${JSON.stringify(error.inner, null , 2)}`)
}

export const validator = async <T>(schema: AnySchema, values: T, validateOption: ValidateOptions= { abortEarly: false }) => {
  return schema
    .validate(values, validateOption)
    .catch((err: YupValidationError) => {
      throw normalizeYupError<T>(err)
    })
}