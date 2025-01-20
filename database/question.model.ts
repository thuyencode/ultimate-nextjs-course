/* eslint-disable @typescript-eslint/no-unnecessary-condition -- This is fine */
import {
  model,
  models,
  Schema,
  type InferRawDocType,
  type SchemaDefinition
} from 'mongoose'

const questionSchemaDefinition = {
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  views: { type: Number, default: 0 },
  answers: { type: Number, default: 0 },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
} satisfies SchemaDefinition

type QuestionDefinition = InferRawDocType<typeof questionSchemaDefinition>

const QuestionSchema = new Schema<QuestionDefinition>(
  questionSchemaDefinition,
  {
    timestamps: true
  }
)

const Question =
  models?.question || model<QuestionDefinition>('Question', QuestionSchema)

export { Question, type QuestionDefinition }
