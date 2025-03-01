import type { ImageProps } from 'next/image'
import type { NextResponse } from 'next/server'
import type { z } from 'zod'

export type TypeToZod<T> = {
  [K in keyof T]-?: T[K] extends
    | Date
    | string
    | number
    | boolean
    | null
    | undefined
    ? undefined extends T[K]
      ? z.ZodOptional<z.ZodType<Exclude<T[K], undefined>>>
      : z.ZodType<T[K]>
    : z.ZodObject<z.TypeToZod<T[K]>>
}

export interface Tag {
  _id: string
  name: string
}

export interface Author {
  _id: string
  name: string
  image: ImageProps['src']
}

export interface Question {
  _id: string
  title: string
  description: string
  tags: Tag[]
  author: Author
  createdAt: Date
  upvotes: number
  answers: number
  views: number
}

export interface ActionResponse<T = null> {
  status?: number
  success: boolean
  data?: T
  error?: {
    message: string
    details?: Record<string, string[]>
  }
}

export interface SuccessResponse<T = null> extends ActionResponse<T> {
  success: true
}

export interface ErrorResponse extends ActionResponse<undefined> {
  success: false
}

export type APIErrorResponse = NextResponse<ErrorResponse>

export type APIResponse<T = null> = NextResponse<
  SuccessResponse<T> | ErrorResponse
>
