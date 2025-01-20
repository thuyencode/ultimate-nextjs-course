/* eslint-disable @typescript-eslint/no-unnecessary-condition -- This is fine */
import {
  model,
  models,
  Schema,
  type InferRawDocType,
  type SchemaDefinition
} from 'mongoose'

const tagQuestionSchemaDefinition = {
  tagId: { type: Schema.Types.ObjectId, ref: 'Tag', required: true },
  question: { type: Schema.Types.ObjectId, ref: 'Question', required: true }
} satisfies SchemaDefinition

type TagQuestionDefinition = InferRawDocType<typeof tagQuestionSchemaDefinition>

const TagQuestionSchema = new Schema<TagQuestionDefinition>(
  tagQuestionSchemaDefinition,
  {
    timestamps: true
  }
)

const TagQuestion =
  models?.tagQuestion ||
  model<TagQuestionDefinition>('TagQuestion', TagQuestionSchema)

export { TagQuestion, type TagQuestionDefinition }
