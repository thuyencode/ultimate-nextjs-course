export type Errors = Record<string, string[]>

export class RequestError extends Error {
  statusCode: number
  errors?: Errors

  constructor(statusCode: number, message: string, errors?: Errors) {
    super(message)
    this.statusCode = statusCode
    this.errors = errors
    this.name = this.constructor.name
  }
}

export class ValidationError extends RequestError {
  constructor(fieldErrors: Errors) {
    const message = ValidationError.formatFieldError(fieldErrors)
    super(400, message, fieldErrors)

    this.name = this.constructor.name
  }

  static formatFieldError(errors: Errors): string {
    const formattedMessages = Object.entries(errors).map(
      ([field, messages]) => {
        const fieldName = field.charAt(0).toUpperCase() + field.slice(1)

        if (messages[0] === 'Required') {
          return `${fieldName} is required`
        } else {
          return messages.join(' and ')
        }
      }
    )

    return formattedMessages.join(', ')
  }
}

export class NotFoundError extends RequestError {
  constructor(resource: string) {
    super(404, `${resource} not found`)
    this.name = this.constructor.name
  }
}
export class ForbiddenError extends RequestError {
  constructor(message = 'Forbidden') {
    super(403, message)
    this.name = this.constructor.name
  }
}
export class UnauthorizedError extends RequestError {
  constructor(message = 'Unauthorized') {
    super(403, message)
    this.name = this.constructor.name
  }
}
