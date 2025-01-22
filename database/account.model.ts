/* eslint-disable @typescript-eslint/no-unnecessary-condition -- This is fine */
import { model, models, Schema, type Document, type Types } from 'mongoose'

export interface AccountDefinition {
  userid: Types.ObjectId
  name: string
  image?: string
  password?: string
  provider: string
  providerAccountId: string
}

export type AccountDoc = AccountDefinition & Document

const AccountSchema = new Schema<AccountDefinition>(
  {
    userid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    image: { type: String },
    password: { type: String },
    provider: { type: String, required: true },
    providerAccountId: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

export const Account =
  models?.account || model<AccountDefinition>('Account', AccountSchema)
