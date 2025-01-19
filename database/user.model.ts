/* eslint-disable @typescript-eslint/no-unnecessary-condition -- This is fine */
import { model, models, Schema, type InferRawDocType } from 'mongoose'

const userSchemaDefinition = {
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String },
  image: { type: String, required: true },
  location: { type: String },
  reputation: { type: Number, default: 0 }
}

const UserSchema = new Schema<UserDefinition>(userSchemaDefinition, {
  timestamps: true
})

type UserDefinition = InferRawDocType<typeof userSchemaDefinition>

const User = models?.user || model<UserDefinition>('User', UserSchema)

export { User, type UserDefinition }
