import { z } from 'zod'

const EmailSchema = z
  .string()
  .min(1, { message: 'Email is required' })
  .email({ message: 'Please provide a valid email address.' })

const BasicPasswordSchema = z
  .string()
  .min(6, { message: 'Password must be at least 6 characters long. ' })
  .max(30, { message: 'Password cannot exceed 30 characters.' })

export const LogInSchema = z.object({
  email: EmailSchema,
  password: BasicPasswordSchema
})

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long.' })
    .max(30, { message: 'Username cannot exceed 30 characters.' })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Username can only contain letters, numbers, and underscores.'
    }),

  name: z
    .string()
    .min(1, { message: 'Name is required.' })
    .max(50, { message: 'Name cannot exceed 50 characters.' })
    .regex(/^[a-zA-Z\s]+$/, {
      message: 'Name can only contain letters and spaces.'
    }),

  email: EmailSchema,

  password: BasicPasswordSchema.regex(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter.'
  })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter.'
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Password must contain at least one special character.'
    })
})

export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title is required.' })
    .max(100, { message: 'Title cannot exceed 100 characters.' }),

  content: z.string().min(1, { message: 'Body is required.' }),

  tags: z
    .array(
      z
        .string()
        .min(1, { message: 'Tag is required.' })
        .max(30, { message: 'Tag cannot exceed 30 characters.' })
    )
    .min(1, { message: 'At least one tag is required.' })
    .max(3, { message: 'Cannot add more than 3 tags.' })
})

export type AskQuestion = z.infer<typeof AskQuestionSchema>
