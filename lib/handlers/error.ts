import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { RequestError, ValidationError, type Errors } from '../http-errors'

export type ResponseType = 'api' | 'server'

interface ResponseContent {
  success: boolean
  error: {
    message: string
    details: Errors | undefined
  }
}

export type FormattedResponse =
  | NextResponse<ResponseContent>
  | (ResponseContent & { status: number })

export const formatResponse = (
  responseType: ResponseType,
  status: number,
  message: string,
  errors?: Errors
): FormattedResponse => {
  const responseContent = {
    success: false,
    error: { message, details: errors }
  }

  return responseType === 'api'
    ? NextResponse.json(responseContent, { status })
    : { status, ...responseContent }
}

const handleError = (
  error: unknown,
  responseType: ResponseType = 'server'
): FormattedResponse => {
  if (error instanceof RequestError) {
    return formatResponse(
      responseType,
      error.statusCode,
      error.message,
      error.errors
    )
  }

  if (error instanceof ZodError) {
    const validationError = new ValidationError(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- This is fine
      error.flatten().fieldErrors as Errors
    )

    return formatResponse(
      responseType,
      validationError.statusCode,
      validationError.message,
      validationError.errors
    )
  }

  if (error instanceof Error) {
    return formatResponse(responseType, 500, error.message)
  }

  return formatResponse(responseType, 500, 'An unexpected error occurred')
}

export default handleError
