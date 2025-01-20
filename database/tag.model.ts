/* eslint-disable @typescript-eslint/no-unnecessary-condition -- This is fine */
import {
  model,
  models,
  Schema,
  type InferRawDocType,
  type SchemaDefinition
} from 'mongoose'

const tagSchemaDefinition = {
  name: { type: String, required: true, unique: true },
  questions: { type: Number, default: 0 }
} satisfies SchemaDefinition

type TagDefinition = InferRawDocType<typeof tagSchemaDefinition>

const TagSchema = new Schema<TagDefinition>(tagSchemaDefinition, {
  timestamps: true
})

const Tag = models?.tag || model<TagDefinition>('Tag', TagSchema)

export { Tag, type TagDefinition }
