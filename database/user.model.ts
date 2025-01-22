/* eslint-disable @typescript-eslint/no-unnecessary-condition -- This is fine */
import { model, models, Schema, type Document } from 'mongoose'

export interface UserDefinition {
  name: string
  username: string
  email: string
  bio?: string
  image: string
  location?: string
  reputation?: number
}

export type UserDoc = UserDefinition & Document

const UserSchema = new Schema<UserDefinition>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String },
    image: { type: String, required: true },
    location: { type: String },
    reputation: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
)

export const User = models?.user || model<UserDefinition>('User', UserSchema)
