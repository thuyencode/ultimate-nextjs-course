/* eslint-disable @typescript-eslint/no-unnecessary-condition -- This is fine */
import {
  model,
  models,
  Schema,
  type InferRawDocType,
  type SchemaDefinition
} from 'mongoose'

const accountSchemaDefinition = {
  userid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  image: { type: String },
  password: { type: String },
  provider: { type: String, required: true },
  providerAccountId: { type: String, required: true }
} satisfies SchemaDefinition

type AccountDefinition = InferRawDocType<typeof accountSchemaDefinition>

const AccountSchema = new Schema<AccountDefinition>(accountSchemaDefinition, {
  timestamps: true
})

const Account =
  models?.account || model<AccountDefinition>('Account', AccountSchema)

export { Account, type AccountDefinition }
