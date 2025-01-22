/* eslint-disable @typescript-eslint/no-unnecessary-condition -- This is fine */
import {
  model,
  models,
  Schema,
  type InferRawDocType,
  type SchemaDefinition
} from 'mongoose'

const collectionSchemaDefinition = {
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  question: { type: Schema.Types.ObjectId, ref: 'Question', required: true }
} satisfies SchemaDefinition

type CollectionDefinition = InferRawDocType<typeof collectionSchemaDefinition>

const CollectionSchema = new Schema<CollectionDefinition>(
  collectionSchemaDefinition,
  {
    timestamps: true
  }
)

const Collection =
  models?.collection ||
  model<CollectionDefinition>('Collection', CollectionSchema)

export { Collection, type CollectionDefinition }
