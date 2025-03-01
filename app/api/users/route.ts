import { User, type UserDefinition } from '@/database/user.model'
import handleError from '@/lib/handlers/error'
import { ValidationError } from '@/lib/http-errors'
import dbConnect from '@/lib/mongoose'
import { UserSchema } from '@/lib/validations'
import type { APIErrorResponse, APIResponse } from '@/types/global'
import { NextResponse } from 'next/server'

export async function GET(): Promise<APIResponse<UserDefinition[]>> {
  try {
    await dbConnect()

    const users = await User.find<UserDefinition>()

    return NextResponse.json({ success: true, data: users }, { status: 200 })
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}

export async function POST(
  request: Request
): Promise<APIResponse<UserDefinition>> {
  try {
    await dbConnect()

    const body = (await request.json()) as Promise<unknown>
    const validatedData = UserSchema.safeParse(body)

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors)
    }

    const submittedUser = validatedData.data
    const existingUser = await User.findOne<UserDefinition>({
      email: submittedUser.email
    })

    if (existingUser) {
      throw new Error('User already exists')
    }

    const existingUsername = await User.findOne<UserDefinition>({
      username: submittedUser.username
    })

    if (existingUsername) {
      throw new Error('Username already exists')
    }

    const newUser: UserDefinition =
      await User.create<UserDefinition>(submittedUser)

    return NextResponse.json({ success: true, data: newUser }, { status: 201 })
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}
